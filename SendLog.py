#!/usr/bin/python

from __future__ import print_function
import json
from xml.dom import minidom
from xml.dom.minidom import parse
import gevent
import fileinput
import time
import shutil
import os
import signal
from threading import Timer
from PIL import Image
from datetime import date
from datetime import time
from datetime import datetime
import threading
import urllib2
from gevent import monkey
import fileinput
import bs4
from gevent.pywsgi import WSGIServer
from flask import Flask, flash, request, redirect, url_for, Response, render_template, send_from_directory ,send_file
# Added send_file to ease download
from werkzeug import secure_filename
from os.path import exists
import re
monkey.patch_all(aggressive=False)

import subprocess32 as subprocess

app = Flask(__name__, static_folder='webapp/')

# This is the path to the upload directory and values directory
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['VALUES_FOLDER'] = 'values/'

# Make the upload directory and values directory if not available
subprocess.call(['mkdir', '-p', app.config['UPLOAD_FOLDER']])
subprocess.call(['mkdir', '-p', app.config['VALUES_FOLDER']])

# These are the extension that we are accepting to be uploaded
app.config['ALLOWED_EXTENSIONS'] = set(['zcos', 'xcos', 'txt'])

# Delay time to look for new line (in s)
LOOK_DELAY = 0.1
# States of the line
INITIALIZATION = 0
ENDING = 1
DATA = 2
NOLINE = -1
BLOCK_IDENTIFICATION = -2

# Scilab dir, can't run absolute paths
SCI = "../scilab_for_xcos_on_cloud/"

# List to store figure IDs
figure_list = []
# List to store filenames of files
xcos_file_list = []
# List to identify whether to save to workspace ,or load from workspce or neither
workspace_list = []
# Dictionary to find variable to load or save from workspace
workspace_dict = {}
#workspace_counter = 0
log_dir = ''
log_name = ''
filename = ''
file_image = ''
flag_sci = False
ts_image = 0
counter = 1
# For Affich_m
workspace_variable_list = []
# For keeping count of affich_m blocks fro replacing with TOWS_c in diagram and also for assigning variable name for TOWS_c workspace variable
affich_count = 0

#path = os.getcwd() + '/scifunc_files/'
#filename = secure_filename(file.filename)

class line_and_state:
    # Class to store the line and its state
    line = None
    state = NOLINE
    def __init__(self, line, state):
        self.line = line
        self.state = state
    def set(self, line_state):
        self.line = line_state[0]
        self.state = line_state[1]
        return False
    def get_line(self):
        return self.line
    def get_state(self):
        return self.state
        
def parse_line(line):
    # Function to parse the line
    # Returns tuple of figure ID and state
    # state = INITIALIZATION if new figure is created
    #         ENDING if current fig end
    #         DATA otherwise
    line_words = line.split(' ')
    #The below condition determines the block ID 
    if line_words[2] == "Block":
        block_id=int(line_words[4])
        return (block_id, BLOCK_IDENTIFICATION)
    if line_words[2] == "Initialization":
        # New figure created
        # Get fig id
        figure_id = int(line_words[-1])
        return (figure_id, INITIALIZATION)
    elif line_words[2] == "Ending":
        # Current figure end
        # Get fig id
        figure_id = int(line_words[-1])
        return (figure_id, ENDING)
    else:
        # Current figure coordinates
        figure_id = int(line_words[3])
        return (figure_id, DATA)

def get_line_and_state_modified(file):
    # Function to get a new line from file
    # This also parses the line and appends new figures to figure List
    global figure_list
    line = file.readline()
    if not line:
        return (None, NOLINE)
    parse_result = parse_line(line)
    figure_id = parse_result[0]
    state = parse_result[1]
    if state == INITIALIZATION:
        # New figure created
        # Add figure ID to list
        figure_list.append(figure_id)
        return (None, INITIALIZATION)
    # Check for block identification 
    elif state == BLOCK_IDENTIFICATION:
        return (line,BLOCK_IDENTIFICATION) 
    elif state == ENDING:
        # End of figure
        # Remove figure ID from list
        figure_list.remove(figure_id)
        return (None, ENDING)
    return (line, DATA)
     
def get_line_and_state(file, count):
    # Return the line from the log filebased on the line count 
    # Function to get a new line from file
    # This also parses the line and appends new figures to figure List
    global figure_list
    line = file.readlines()

    # If required line is not present 
    if not line[count]: 
        return (None, NOLINE)

    parse_result = parse_line(line[count])
    figure_id = parse_result[0]
    state = parse_result[1]
    if state == INITIALIZATION:
        # New figure created
        # Add figure ID to list
        figure_list.append(figure_id)
        return (None, INITIALIZATION)
    # Check for block identification    
    elif state == BLOCK_IDENTIFICATION: 
        return (str(figure_id),BLOCK_IDENTIFICATION)
    elif state == ENDING:
        # End of figure
        # Remove figure ID from list
        figure_list.remove(figure_id)
        return (None, ENDING)
    return (line[count], DATA)


app.config['UPLOAD_FOLDER'] = 'scifunc_files/'

@app.route('/uploadsci', methods=['POST'])
def uploadsci():
        file = request.files['file']
        if file and request.method == 'POST':
            global flag_sci
            global filename 
            ts = datetime.now()
            filename = Details.uid + str(ts) + secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            flag_sci = True
            path = os.getcwd() + '/scifunc_files/'
            read = open(os.path.join(path, filename), "r")  
            command = ["./"+SCI+"bin/scilab-adv-cli", "-nogui", "-noatomsautoload", "-nb", "-nw", "-e","loadXcosLibs();exec('"+path + filename+"'),mode(2);quit()"]
            output_com = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, preexec_fn=os.setpgrp, bufsize=1, universal_newlines=True)
            out = output_com.communicate()[0]
            system_commands = re.compile(r'unix\(.*\)|unix_g\(.*\)|unix_w\(.*\)|unix_x\(.*\)|unix_s\(.*\)|host|newfun|execstr|ascii|mputl|dir\(\)')
            match = re.findall(system_commands, open(os.path.join(path, filename), 'r').read()) 
            if('!--error' in out):
                error_index = out.index('!')
                msg = out[error_index:-9]
                return msg
            elif(match):
                msg = "System calls are not allowed in .sci file!\n Please upload another .sci file!!"
                return msg
            else:
                msg = "File is uploaded successfully!!"
                return msg

@app.route('/requestfilename', methods=['POST'])
def sendfile():
    global file_image
    global flag_sci
    if(flag_sci == True):
        file_image = filename
        file_image = file_image[:-4]
    else:
        file_image = ""
    flag_sci = False
    return file_image

def kill_scilab_with(proc, sgnl):
    '''
    function to kill a process group with a signal. wait for maximum 2 seconds
    for process to exit. return True on exit, False otherwise
    '''
    os.killpg(proc.pid, sgnl)
    for i in range(0, 20):
        gevent.sleep(LOOK_DELAY)
        if proc.poll() is not None:
            return True
    return False

def event_stream(xcos_file_id):
    global figure_list
    global kill_scilab
    global filename
    global ts_image
    global file_image
    global counter
    # If no id is sent, return
    if(len(xcos_file_id)==0):
        return
    xcos_file_id = int(xcos_file_id)
    xcos_file_dir = os.getcwd() + '/uploads/'
    xcos_affich_function_file_dir = os.getcwd() + '/'
    path = os.getcwd() + '/scifunc_files/'
    #filename = 'Scifunc2.sci'
    #print(xcos_affich_function_file_dir)
    xcos_file_name = xcos_file_list[xcos_file_id]
    # Get previously running scilab process IDs
    proc = subprocess.Popen("pgrep scilab", stdout=subprocess.PIPE, shell=True)
    # out will contain output of command, the list of process IDs of scilab
    (out, err) = proc.communicate()
    _l = len(out)
    # Initialise pid
    pid = 0
    # id to identify each session for saving workspace 
    session=Details.uid
    ts = datetime.now()
    ts_fmt = ts.strftime('%Y-%m-%d %H:%M:%S.%f')
    ts_image = ts_fmt[:-3]
    # name of worspace file the session
    workspace="workspace"+session+".dat"
    #ts_image = datetime.now()
    #filename = Details.uid + ts + filename
    #print(workspace)
    #print(len(xcos_file_id))
    workspace_counter=workspace_list[xcos_file_id]
    #For affich_m block
    variablename=""; # Stores all workspace variable name in format (var1,var2,var3)
    if (workspace_counter==4): # To check affich_m block presence
	for i in range(len(workspace_variable_list)):    # to get count of affich replace with tows_c block and to use to iterate their name
	   variable_name=workspace_variable_list[i]      # workspace_variable_list contains name of workspace variable
           if(i==(len(workspace_variable_list)-1)):      # if last element in list then it should not be concatenate with ,
	      variablename=variablename+variable_name+""   
           else:
              variablename=variablename+variable_name+","
    #print("...."+variablename)
    ############################################################################################################
    # commands for ruuning of scilab based on existence of TOWS_c and FROMWSB
    # 3 means both exists,2 FROMWSB exists,1 TOWS_c exists,0 none exists meaning normal set of commands 
    #print(path)
    #print(filename)
    if (workspace_counter ==3 and exists(workspace)):
        append=workspace_dict[xcos_file_id]
        command = ["./"+SCI+"bin/scilab-adv-cli", "-nogui", "-noatomsautoload", "-nb", "-nw", "-e","load('"+workspace+"');loadXcosLibs();importXcosDiagram('" + xcos_file_dir + xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'webapp/res_imgs/img_test.jpg'),mode(2);deletefile('"+workspace+"');save('"+workspace+"') ;quit()"]
    elif (workspace_counter ==1 or workspace_counter==3):
        append=workspace_dict[xcos_file_id]
        command = ["./"+SCI+"bin/scilab-adv-cli", "-nogui", "-noatomsautoload", "-nb", "-nw", "-e","loadXcosLibs();importXcosDiagram('" + xcos_file_dir + xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'webapp/res_imgs/img_test.jpg'),mode(2);deletefile('"+workspace+"');save('"+workspace+"') ;quit()"]
    elif (workspace_counter ==4):     # added for affich_m
        workspace_variable_list[:] = []
        command = ["./"+SCI+"bin/scilab-adv-cli", "-nogui", "-noatomsautoload", "-nb", "-nw", "-e","loadXcosLibs();importXcosDiagram('" + xcos_file_dir + xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'webapp/res_imgs/img_test.jpg'),mode(2);exec('" + xcos_affich_function_file_dir + "affichm.sci"+"');affichm("+variablename+");deletefile('"+workspace+"');save('"+workspace+"') ;quit()"]
        #print(xcos_affich_function_file_dir)
    elif (workspace_counter ==2 and exists(workspace)):
        command = ["./"+SCI+"bin/scilab-adv-cli", "-nogui", "-noatomsautoload", "-nb", "-nw", "-e", "load('"+workspace+"');loadXcosLibs();importXcosDiagram('" + xcos_file_dir + xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'webapp/res_imgs/img_test.jpg'),mode(2);deletefile('"+workspace+"') ;quit()"]
    elif (workspace_counter == 7):
        command = ["./"+SCI+"bin/scilab-adv-cli", "-nogui", "-noatomsautoload", "-nb", "-nw", "-e","loadXcosLibs();exec('" + path + filename +"');importXcosDiagram('" + xcos_file_dir + xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'webapp/res_imgs/img_test"+file_image+".jpg'),mode(2);quit()"]
        counter = counter + 1
        t = Timer(15.0, delete_image)
        t.start()
        t1 = Timer(10.0, delete_scifile)
        t1.start()
    else:
        command = ["./"+SCI+"bin/scilab-adv-cli", "-nogui", "-noatomsautoload", "-nb", "-nw", "-e", "loadXcosLibs();importXcosDiagram('" + xcos_file_dir + xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'webapp/res_imgs/img_test.jpg'),mode(2);quit()"] 

    # Put the process in its own process group using os.setpgrp. For a new
    # group, the process group id is always equal to the process id. All the
    # children of that process will have the same process group id. Later, we
    # stop those processes together with os.killpg(scilab_proc.pid).
    scilab_proc = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, preexec_fn=os.setpgrp)

    # Wait till xcos is launched
    while len(out) == _l:
        # If length of out equals _l,
        #    it means scilab hasn't launched yet
        # Wait
        gevent.sleep(LOOK_DELAY)
        # Get process IDs of scilab instances
        proc = subprocess.Popen("pgrep scilab", stdout=subprocess.PIPE, shell=True)
        # out will contain output of command, the list of process IDs of scilab
        (out, err) = proc.communicate()

    # out will contain output of command, the list of process IDs of scilab
    # Get the latest process ID of scilab
    pid = out.split()[-1]

    # Define function to kill scilab(if still running) and remove files
    def kill_scilab():
        if not kill_scilab_with(scilab_proc, signal.SIGTERM):
            kill_scilab_with(scilab_proc, signal.SIGKILL)

        # Remove log file
        subprocess.call(["rm", "-f", log_dir+log_name])
        # Remove xcos file
        subprocess.call(["rm", "-f", xcos_file_dir+xcos_file_name])
        line_count = 0
               
    # Log file directory
    # As the scilab process is spawned by this script,
    # the log directory is same as that of this script
    log_dir = "" 
    # Log file name
    log_name = "scilab-log-"+pid+".txt"

    # Initialise output and error variables for subprocess
    scilab_out = ""
    scilab_err = ""

    line_count = 0
    line = line_and_state(None, NOLINE)
    # Checks if such a file exists
    while not (os.path.isfile(log_name)):
        gevent.sleep(LOOK_DELAY)
    # This variable is for running the sleep command
 
    # Start sending log
    put_delay = False
    line_id = -1
    delay_length = -1
    if(Details.tk_is_present):
        try:
            # For processes taking less than 10 seconds
            scilab_out, scilab_err = scilab_proc.communicate(timeout=4)
            print(scilab_out)
            # Check for errors in Scilab 
            if "Empty diagram" in scilab_out:
                yield "event: ERROR\ndata: Empty diagram\n\n"
                kill_scilab()
                return
           

        # For processes taking more than 10 seconds
        except subprocess.TimeoutExpired:
            # Check for errors in Scilab 
            if "Empty diagram" in scilab_out:
                yield "event: ERROR\ndata: Empty diagram\n\n"
                kill_scilab()
                return
     
            # Open the log file
        log_file = open(log_dir + log_name, "r")

        # Start sending log
        line = line_and_state(None, NOLINE)
        while (True):

            # The chart must be updated for all the various lines it has in 0.1 seconds.
            # Hence dividing the sleep time 0.1 by the number of lines the chart contains

            if put_delay:
                gevent.sleep(0.1 / delay_length)

            if not (os.path.isfile(log_name)):
                break
            log_file = open(log_dir + log_name, "r+")

            if not ( line.set(get_line_and_state(log_file,line_count)) or line.get_state() != ENDING or len(figure_list) > 0 ):
                break


            if line.get_state()== BLOCK_IDENTIFICATION:
                # Split the line obtained from log file and the 8th element is line ID
                logLine = line.get_line()

                line_contents = logLine.split(' ')
                # Checking if the current line ID is same as first line ID and is the first occurence of matching
                if(line_id == line_contents[7] and not put_delay):
                    delay_length = line_count - 1
                    # The count of total number of lines in the chart
                    put_delay = True
                # The first line ID 
                if(line_count == 1):
                    line_id = line_contents[7]
                yield "event: block\ndata: "+logLine+"\n\n"

            elif line.get_state() != DATA:
                gevent.sleep(LOOK_DELAY)    

            else:
                # Split the line obtained from log file and the 8th element is line ID
                logLine = line.get_line()

                line_contents = logLine.split(' ')
                # Checking if the current line ID is same as first line ID and is the first occurence of matching
                if(line_id == line_contents[7] and not put_delay):
                    # Take the count of total number of lines in the chart
                    delay_length = line_count - 1 
                    put_delay = True

                # The first line ID 
                if(line_count == 1):
                    line_id = line_contents[7]
                yield "event: log\ndata: "+logLine+ "\n\n"


            # Reset line, so server won't send same line twice
            line = line_and_state(None, NOLINE)
            line_count = line_count + 1
            log_file.close()

        # Finished Sending Log
        kill_scilab()

        # Notify Client
        yield "event: DONE\ndata: None\n\n"

    else:
        # Open the log file
        if not (os.path.isfile(log_name)):
            return
        log_file = open(log_dir + log_name, "r")
    
        # Start sending log
        line = line_and_state(None, NOLINE)
        while (line.set(get_line_and_state_modified(log_file)) or len(figure_list) > 0):
            # Get the line and loop until the state is ENDING and figure_list empty
            # Determine if we get block id and give it to chart.js
            if line.get_state()== BLOCK_IDENTIFICATION:
                yield "event: block\ndata: "+line.get_line()+"\n\n"
            elif line.get_state() != DATA:
                gevent.sleep(LOOK_DELAY)      
            else:
                yield "event: log\ndata: "+line.get_line()+"\n\n"
            # Reset line, so server won't send same line twice
            line = line_and_state(None, NOLINE)

        # Finished Sending Log
        kill_scilab()

        # Notify Client
        yield "event: DONE\ndata: None\n\n"
        
# class used to get the user_id and the boolean value is to make run a thread    
class Details:
    import uuid
    tk_is_present = False
    my_id = uuid.uuid1()
    uid = str(my_id)
    # user_id
    tkbool = True
    # boolean value to run the thread acc. to it
    print("user_id:"+uid)
    names = {}

def delete_image():
    global file_image
    file_uid = file_image[0:36]
    if(file_uid == Details.uid):
        image_path = os.getcwd() + '/webapp/res_imgs/img_test' + file_image + '.jpg'
        os.remove(image_path)

def delete_scifile():
    global filename
    scifile_uid = filename[0:36]
    if(scifile_uid == Details.uid):
        sci_path = os.getcwd() + '/scifunc_files/' + filename
        os.remove(sci_path)

# function which will check and make initialization of every required files.
def findFile():     
    r = open("values/"+Details.uid+"_val.txt","r") 
    line = r.readline() 
    # at first the val.txt contains "Start" indicating the starting of the process
    r.close()
    
    if line == "Start": 
        Details.tkbool = True
        w = open("values/"+Details.uid+"_tktime.txt","w") 
        # tktime.txt is the file where we will update the time basing on the parameter ("Period" of CLOCK_c) for each tkscale
        w.write("0\n0\n0\n0\n0\n0\n0\n0\n0\n0")
        # initialize all tktime values to 0
        w.close()
      
        for i in range(10):
            open("values/"+Details.uid+"_tk"+str(i+1)+".txt","w").close();
            # create empty tk text files
        return 0
    elif line=="Stop": 
        # at last the val.txt contains "Stop" indicating the ending process
        return 1
    return 2

# function which changes flaoting to req scientific format    
def changeFormat(n):
    n = float(n)
    check = 1
    exp = 0
    if n<0:
        n = n*-1
        check=-1
    while not(0<=n and n<1):
        n = n/10
        exp=exp+1
    n=n*check
    n = "%.3f" % n
    exp = "%02d" % (exp,)
    
    formated = n+"E+"+exp
    
    return formated
    
# function which appends the 'updated' ('new') value to the file  
def AppendtoTKfile(fname,tlist,i):
    tl = tlist.split('  ')
    # converting string to list which stores the Period parameter at 0 index, data to be appended at index 1
    
    if(tl[1]==''):
        # if data is empty, do not append it
        return
    with open("values/"+Details.uid+"_tktime.txt", 'r') as file:
        # read the tktime folder to get tkfile time at respective index (tk1.txt at 0 index)
        tktime = file.readlines()
    # update the time
    time = float(tktime[i])+float(tl[0])
    tktime[i]=str(time)+'\n'

    with open("values/"+Details.uid+"_tktime.txt", 'w') as file:
        # write the updated the time to tktime.txt
        file.writelines( tktime )

    data = tl[1]
    time = changeFormat(time)
    
    line = time+"  "+data+"\n"
    
    # append data to the tk.txt
    w= open(fname,'a') 
    w.write(line)
    w.close()
    

# function which take values from val.txt send the data to  append them in their respective 'tk' files.  
def getDetails():
    r=open("values/"+Details.uid+"_val.txt","r")
    line=r.readline()
    tklist=line.split(',')
    
    for i in range(len(tklist)):     
        tl = tklist[i].split('  ')
        
        if  len(tklist)==1 or len(tl)==1:
            break
        else:
            fname="values/"+Details.uid+"_tk"+str(i+1)+".txt"

            AppendtoTKfile(fname,tklist[i],i)

    r.close()

# function which makes the initialisation of thread 
def getDetailsThread():
    if Details.tkbool:
        getDetails()
        import threading 
        from threading import Timer
        # calls the same function adter 0.1 second
        threading.Timer(0.1,getDetailsThread).start()

def stopDetailsThread():
    Details.tkbool = False # stops the thread
    import os, glob

    for filename in glob.glob("values/"+Details.uid+"*"):
            # deletes all files created under the 'uid' name
        os.remove(filename)
# Route that will process the file upload
@app.route('/upload', methods=['POST'])
def upload():
    # Get the file
    file = request.files['file']
    # flags to check if both TOWS_c and FROMWSB are present
    flag1=0
    flag2=0
    list1=[]
    list2=[]
    # Check if the file is not null
    if file:
        # Make the filename safe, remove unsupported chars
        client_id = len(xcos_file_list)
        # Save the file in xml extension and using it for further modification by using xml parser
        temp_file_xml_name = str(client_id)+".xml"
        file.save(os.path.join(temp_file_xml_name))
        new_xml = minidom.parse(temp_file_xml_name)

        # to identify if we have to load or save to workspace or neither #0 if neither TOWS_c or FROWSB found
        workspace_counter=0
        blocks = new_xml.getElementsByTagName("BasicBlock")
        Details.tk_is_present = False
	pattern = re.compile(r"<SplitBlock")
	for i, line in enumerate(open(temp_file_xml_name)):
    		for match in re.finditer(pattern, line):
        		list1.append(i+1)
	pattern1 = re.compile(r"<ControlPort")
	for i, line in enumerate(open(temp_file_xml_name)):
    		for match in re.finditer(pattern1, line):
        		list2.append(i+1)
	pattern2 = re.compile(r"<ImplicitInputPort")
	count1=0
	
	for i, line in enumerate(open(temp_file_xml_name)):
    		for match in re.finditer(pattern2, line):
        		count1+=1
	if count1>=1:
		splitline=[]
		count=0;
		for i in range(len(list1)):
    			for j in range(len(list2)):
        			if list2[j]==list1[i]+3:
            				count+=1
            				splitline.append(list1[i])
		blocksplit = new_xml.getElementsByTagName("SplitBlock")
		block_ids=[]#this stores the id of split blocks
		for block in blocksplit:
            		if block.getAttribute("style") == "SPLIT_f":
                		block_ids.append(int(block.getAttribute("id")))
		compsplit=[]
		for i in range(len(splitline)):
    			for j in range(len(list1)):
        			if splitline[i]==list1[j]:
            				compsplit.append(j)
	
		finalsplit=[]
		for i in range(len(compsplit)):
    			finalsplit.append(block_ids[compsplit[i]])
	
		blockcontrol = new_xml.getElementsByTagName("ControlPort")
		for block in blockcontrol:
    			for i in range(len(finalsplit)):
            			if block.getAttribute("parent") == str(finalsplit[i]):#match the lines with the parent of our spliblocks which we need to change
                   			block.setAttribute('id', '-1')               
		blockcommand = new_xml.getElementsByTagName("CommandPort")
		for block in blockcommand:
    			for i in range(len(finalsplit)):
            			if block.getAttribute("parent") == str(finalsplit[i]):
                   
                   			block.setAttribute('id', '-1')
		finalchangeid=[]#here we take the ids of command controllink which we will search and change
		for i in range(len(finalsplit)):
			finalchangeid.append(finalsplit[i]+4)
			finalchangeid.append(finalsplit[i]+5) 
			
		with open(temp_file_xml_name,'w') as f:#here we save the contents
            		f.write(new_xml.toxml())
		
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				
				if "<CommandControlLink id=" in word:
					temp_word=""
					for i in range(len(finalchangeid)):
						if "<CommandControlLink id=\""+str(finalchangeid[i])+"\"" in word:
							temp_word=word.replace("<CommandControlLink id=\""+str(finalchangeid[i])+"\"","<ImplicitLink id=\""+str(finalchangeid[i])+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)
		with open(temp_file_xml_name,"r") as in_file:
			buf = in_file.readlines()
		#length=len(finalsplit)
		#return finalsplit
		#print finalsplit1
		with open(temp_file_xml_name,"w") as out_file:
			for line in buf:
				for i in range (len(finalsplit)):
					if '<ControlPort connectable=\"0\" dataType=\"UNKNOW_TYPE\" id=\"-1\" ordering=\"1\" parent="'+str(finalsplit[i])+"\"" in line:
						line="	    <ImplicitInputPort connectable=\"0\" dataType=\"UNKNOW_TYPE\" id=\""+str(finalsplit[i]+1)+"\""+" ordering=\"1\" parent=\""+str(finalsplit[i])+"\""+" style=\"ImplicitInputPort\">\n		<mxGeometry as=\"geometry\" height=\"10\" relative=\"1\" width=\"10\" y=\"0.5000\">\n		</mxGeometry>\n	    </ImplicitInputPort>\n	    <ImplicitOutputPort connectable=\"0\" dataType=\"UNKNOW_TYPE\" id=\""+str(finalsplit[i]+2)+"\""+" ordering=\"1\" parent=\""+str(finalsplit[i])+"\""+" style=\"ImplicitOutputPort\">\n		<mxGeometry as=\"geometry\" height=\"10\" relative=\"1\" width=\"10\" y=\"0.5000\">\n		</mxGeometry>\n	    </ImplicitOutputPort>\n	    <ImplicitOutputPort connectable=\"0\" dataType=\"UNKNOW_TYPE\" id=\""+str(finalsplit[i]+3)+"\""+" ordering=\"1\" parent=\""+str(finalsplit[i])+"\""+" style=\"ImplicitOutputPort\">\n		<mxGeometry as=\"geometry\" height=\"10\" relative=\"1\" width=\"10\" y=\"0.5000\">\n		</mxGeometry>\n	    </ImplicitOutputPort>\n"+line
						
				out_file.write(line)
		list3=[]
		implitdetect=[]
		#return temp_file_xml_name
		for i in range(len(finalsplit)):
			implitdetect.append(finalsplit[i]+5)
			implitdetect.append(finalsplit[i]+6)
		for i in range(len(implitdetect)):
			pattern3 = re.compile("<ImplicitLink id=\""+str(implitdetect[i])+"\"")
			for i, line in enumerate(open(temp_file_xml_name)):
				for match in re.finditer(pattern3, line):
					list3.append(i-1)
		with open(temp_file_xml_name,'r+') as f:
			data = f.read().splitlines()
			replace = list3
			for i in replace:
				data[i] = '	    </ImplicitLink>'
			f.seek(0)
			f.write('\n'.join(data))
			f.truncate()		
		base_filename = os.path.splitext(temp_file_xml_name)[0]
        	os.rename(temp_file_xml_name, base_filename + ".xcos")
        	source_folder = os.getcwd()
        	destination_folder = source_folder + "/uploads/"
        	folder_file_content = filter(os.path.isfile, os.listdir( os.curdir ) )
        	for file in folder_file_content:
            		if file.endswith(".xcos"):
                		shutil.copy(file, destination_folder)
                		os.remove(file)# After moving to the required folder deleting the xcos file.
        	temp_file_xml_name = base_filename + ".xcos"
        	xcos_file_list.append(temp_file_xml_name)
        	workspace_list.append(workspace_counter)
        	return str(client_id)
	
	
	# List to contain all affich blocks
	blockaffich = new_xml.getElementsByTagName("AfficheBlock")  
    	block_ida = []
    	for block in blockaffich:
            if block.getAttribute("interfaceFunctionName") == "AFFICH_m":
               block_ida.append(block.getAttribute("id"))
               block.setAttribute('id', '-1') 
               workspace_counter=4
               flag1=1

        # List to contain all the block IDs of tkscales so that we can create read blocks with these IDs
        block_id = []
        for block in blocks:
            if block.getAttribute("interfaceFunctionName") == "TKSCALE":
                block_id.append(block.getAttribute("id"))
                block.setAttribute('id', '-1') 
                Details.tk_is_present = True
                # Changed the ID of tkscales to -1 so that virtually the tkscale blocks get disconnected from diagram at the backend
            # Taking workspace_counter 1 for TOWS_c and 2 for FROMWSB
            if block.getAttribute("interfaceFunctionName")== "scifunc_block_m":
                workspace_counter = 7
            if block.getAttribute("interfaceFunctionName")== "TOWS_c":
                workspace_counter=1
                flag1=1
                main_attributes=block.getElementsByTagName("ScilabString")
                data= main_attributes[0].getElementsByTagName("data")
                workspace_variable=data[1].getAttribute("value")
                workspace_dict[client_id]=workspace_variable
            if block.getAttribute("interfaceFunctionName")== "FROMWSB":
                workspace_counter=2   
                flag2=1
        if (flag1 and flag2):
            # Both TOWS_c and FROMWSB are present
            workspace_counter=3
        # Hardcoded the real time scaling to 1.0 (i.e., no scaling of time occurs) only if tkscale is present
        if(Details.tk_is_present):
            diagram = new_xml.getElementsByTagName("XcosDiagram")
            for dia in diagram:
                dia.setAttribute('realTimeScaling', '1.0')
                

        # Save the changes made by parser
        tk_count = 0 
        with open(temp_file_xml_name,'w') as f:
            f.write(new_xml.toxml())


        # In front of block tkscale printing the block corresponding to read function and assigning corresponding values
        for line in fileinput.input(temp_file_xml_name, inplace=1):

            if 'interfaceFunctionName=\"TKSCALE\"' in line:
                print("<BasicBlock blockType=\"d\" id=\"", end ='')
                # change the block ID
                print(block_id[tk_count], end = '')
                print("\" interfaceFunctionName=\"RFILE_f\" parent=\"1\" simulationFunctionName=\"readf\" simulationFunctionType=\"DEFAULT\" style=\"RFILE_f\">")
                print("<ScilabString as=\"exprs\" height=\"5\" width=\"1\">")
                print("<data column=\"0\" line=\"0\" value=\"1\"/>")
                # Value equal to 1 implies take readings from first column in the file
                print("<data column=\"0\" line=\"1\" value=\"2\"/>")
                print("<data column=\"0\" line=\"2\" value=\"", end = '')



                path_current_directory = os.getcwd()
                print(path_current_directory, end='')
                print("/values/", end ='')
                print(Details.uid, end ='')
                print("_tk", end = '')
                # Path to the file from which read block obtains the values
                print(tk_count + 1, end = '')
                print(".txt", end = '')
                print("\"/>")                
                print("<data column=\"0\" line=\"3\" value=\"(2(e10.3,1x))\"/>")
                # (2(e10.3,1x)) The format in which numbers are written
                # Two columns with base 10 and 3 digits after decimal and 1x represents 1 unit space between two columns.
                print("<data column=\"0\" line=\"4\" value=\"2\"/>")
                print("</ScilabString>")
                print("<ScilabDouble as=\"realParameters\" height=\"0\" width=\"0\"/>")
                print("<ScilabDouble as=\"integerParameters\" height=\"105\" width=\"1\">")
                tk_count = tk_count + 1
                # The remaining part of the block is read from the Read_Content.txt file and written to the xml file
                read_file = open("Read_Content.txt", "r")
                for line_content in read_file:
                    print(line_content,end= '')
            print(line,end = '')

	aff_count = 0
	
	for line in fileinput.input(temp_file_xml_name, inplace=1):# if the keyword argument inplace=1 is passed to fileinput.input() or to the FileInput constructor, the file is moved to a backup file and standard output is directed to the input file
            
            
	    if 'interfaceFunctionName=\"AFFICH_m\"' in line:
		 print("<BasicBlock blockType=\"d\" dependsOnU=\"1\" id=\"", end ='')
		 print(block_ida[aff_count], end = '')

	         print("\" interfaceFunctionName=\"TOWS_c\" parent=\"1\" simulationFunctionName=\"tows_c\" simulationFunctionType=\"C_OR_FORTRAN\" style=\"TOWS_c\">")
		 print("<ScilabString as=\"exprs\" height=\"3\" width=\"1\">")
                 print("<data column=\"0\" line=\"0\" value=\"1\"/>")
                 #For workspace variable name
		 aff_count = aff_count + 1
                 print("<data column=\"0\" line=\"1\" value=\"", end = '')
		 print("var"+str(aff_count), end ='')
		 workspace_variable_list.append("var"+str(aff_count))
		 print("\"/>")
		 print("<data column=\"0\" line=\"2\" value=\"0\"/>")
                 print("</ScilabString>")
		 affich_count = aff_count
		 read_file = open("Read_tows_c.txt", "r")
                 for line_content in read_file:
                     print(line_content,end= '')
            print(line,end = '')
	block_idint=[]
	block_idmatblsk=[]
	block_det=[]
	block_diag=[]
	block_div=[]
	block_curl=[]
	for block in blocks:
		if block.getAttribute("style") == "INTMUL":
			block_idint.append(int(block.getAttribute("id")))
		if block.getAttribute("style") == "MATBKSL":
			block_idmatblsk.append(int(block.getAttribute("id")))
		if block.getAttribute("style") == "MATDET":
			block_det.append(int(block.getAttribute("id")))
		if block.getAttribute("style") == "MATDIAG":
			block_diag.append(int(block.getAttribute("id")))
		if block.getAttribute("style") == "MATDIV":
			block_div.append(int(block.getAttribute("id")))
		if block.getAttribute("style") == "CURV_f":
			block_curl.append(int(block.getAttribute("id")))
	if len(block_idint)>=1:	
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				
				if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word:
					temp_word=""
					for i in range(len(block_idint)):
						if "<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_idint[i]+2)+"\"" in word:
							temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_idint[i]+2)+"\"","<ExplicitInputPort dataColumns=\"-3\" dataLines=\"-2\" dataType=\"REAL_MATRIX\" id=\""+str(block_idint[i]+2)+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)				
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				if "<ExplicitOutputPort dataType=\"REAL_MATRIX\"" in word:
					temp_word=""
					for i in range(len(block_idint)):
						if "<ExplicitOutputPort dataType=\"REAL_MATRIX\" id=\""+str(block_idint[i]+3)+"\"" in word:
							temp_word=word.replace("<ExplicitOutputPort dataType=\"REAL_MATRIX\" id=\""+str(block_idint[i]+3)+"\"","<ExplicitOutputPort dataColumns=\"-3\" dataType=\"REAL_MATRIX\" id=\""+str(block_idint[i]+3)+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)
	if len(block_idmatblsk)>=1:
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				
				if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word:
					temp_word=""
					for i in range(len(block_idmatblsk)):
						if "<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_idmatblsk[i]+2)+"\"" in word:
							temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_idmatblsk[i]+2)+"\"","<ExplicitInputPort dataColumns=\"-3\" dataType=\"REAL_MATRIX\" id=\""+str(block_idmatblsk[i]+2)+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				
				if "<ExplicitOutputPort dataType=\"REAL_MATRIX\"" in word:
					temp_word=""
					for i in range(len(block_idmatblsk)):
						if "<ExplicitOutputPort dataType=\"REAL_MATRIX\" id=\""+str(block_idmatblsk[i]+3)+"\"" in word:
							temp_word=word.replace("<ExplicitOutputPort dataType=\"REAL_MATRIX\" id=\""+str(block_idmatblsk[i]+3)+"\"","<ExplicitOutputPort dataColumns=\"-3\" dataLines=\"-2\" dataType=\"REAL_MATRIX\" id=\""+str(block_idmatblsk[i]+3)+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)
	if len(block_det)>=1:
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				
				if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word:
					temp_word=""
					for i in range(len(block_det)):
						if "<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_det[i]+1)+"\"" in word:
							temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_det[i]+1)+"\"","<ExplicitInputPort dataColumns=\"-1\" dataType=\"REAL_MATRIX\" id=\""+str(block_det[i]+1)+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				
				if "<ExplicitOutputPort dataType=\"REAL_MATRIX\"" in word:
					temp_word=""
					for i in range(len(block_det)):
						if "<ExplicitOutputPort dataType=\"REAL_MATRIX\" id=\""+str(block_det[i]+2)+"\"" in word:
							temp_word=word.replace("<ExplicitOutputPort dataType=\"REAL_MATRIX\" id=\""+str(block_det[i]+2)+"\"","<ExplicitOutputPort dataColumns=\"1\" dataLines=\"1\" dataType=\"REAL_MATRIX\" id=\""+str(block_det[i]+2)+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)
	if len(block_curl)>=1:
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				
				if "<ExplicitOutputPort dataType=\"REAL_MATRIX\"" in word:
					temp_word=""
					for i in range(len(block_curl)):
						if "<ExplicitOutputPort dataType=\"REAL_MATRIX\" id=\""+str(block_curl[i]+4)+"\"" in word:
							temp_word=word.replace("<ExplicitOutputPort dataType=\"REAL_MATRIX\" id=\""+str(block_curl[i]+4)+"\"","<ExplicitOutputPort dataColumns=\"1\" dataLines=\"1\" dataType=\"REAL_MATRIX\" id=\""+str(block_curl[i]+4)+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)
	if len(block_diag)>=1:
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				
				if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word:
					temp_word=""
					for i in range(len(block_diag)):
						if "<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_diag[i]+1)+"\"" in word:
							temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_diag[i]+1)+"\"","<ExplicitInputPort dataColumns=\"1\" dataType=\"REAL_MATRIX\" id=\""+str(block_diag[i]+1)+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				
				if "<ExplicitOutputPort dataType=\"REAL_MATRIX\"" in word:
					temp_word=""
					for i in range(len(block_diag)):
						if "<ExplicitOutputPort dataType=\"REAL_MATRIX\" id=\""+str(block_diag[i]+2)+"\"" in word:
							temp_word=word.replace("<ExplicitOutputPort dataType=\"REAL_MATRIX\" id=\""+str(block_diag[i]+2)+"\"","<ExplicitOutputPort dataColumns=\"-1\" dataType=\"REAL_MATRIX\" id=\""+str(block_diag[i]+2)+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)
	if len(block_div)>=1:
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				
				if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word:
					temp_word=""
					for i in range(len(block_div)):
						if "<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_div[i]+1)+"\"" in word:
							temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_div[i]+1)+"\"","<ExplicitInputPort dataColumns=\"-3\" dataType=\"REAL_MATRIX\" id=\""+str(block_div[i]+1)+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)
		with open(temp_file_xml_name,"r") as f:
			newline=[]
			i=0
			for word in f.readlines():
				
				if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word:
					temp_word=""
					for i in range(len(block_div)):
						if "<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_div[i]+2)+"\"" in word:
							temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\" id=\""+str(block_div[i]+2)+"\"","<ExplicitInputPort dataColumns=\"-3\" dataLines=\"-2\" dataType=\"REAL_MATRIX\" id=\""+str(block_div[i]+2)+"\"") 
							i=i+1
					if temp_word!="":
						newline.append(temp_word)
					else:
						newline.append(word)
				else:
					newline.append(word)
		with open(temp_file_xml_name,"w") as f:
			for line in newline:
				f.writelines(line)
        # Changing the file extension from xml to xcos
        base_filename = os.path.splitext(temp_file_xml_name)[0]
        os.rename(temp_file_xml_name, base_filename + ".xcos")
        source_folder = os.getcwd()
        destination_folder = source_folder + "/uploads/"


        # Move the xcos file to uploads directory
        folder_file_content = filter(os.path.isfile, os.listdir( os.curdir ) )
        for file in folder_file_content:
            if file.endswith(".xcos"):
                shutil.copy(file, destination_folder)
                os.remove(file)# After moving to the required folder deleting the xcos file.
        temp_file_xml_name = base_filename + ".xcos"
        xcos_file_list.append(temp_file_xml_name)
        workspace_list.append(workspace_counter)
        return str(client_id)
    else:
        return "error"

@app.route('/filenames.php', methods=['POST'])
def filenames():
    url = request.form['url']
    if url == '' or '.' in url or url[0] != '/' or url[-1] != '/':
        return "error"
    filelist = [url + f for f in os.listdir('webapp' + url)]
    return Response(json.dumps(filelist), mimetype='application/json')

@app.route('/UpdateTKfile', methods=['POST'])    
def UpdateTKfile():
    # function which makes the initialazation and updation of the files with obtained new value
    # Get the file
    file = request.files['file']

    # Check if the file is not null
    if file:
        filename1 = Details.uid+'_val.txt'
        # saves the file in values folder
        file.save(os.path.join(app.config['VALUES_FOLDER'], filename1)) 
        n = findFile()
        if n==0:
            # starts the thread
            getDetailsThread()

        elif n==1:
            # stops the thread
            if not (os.path.isfile(log_name)):
                stopDetailsThread()
                return ""
            open(log_dir + log_name,"w")
            
        
        return ""
    else:
        return "error"
            

@app.route('/importXcos')   
def importXcos():
    # function to take the request data when user click the url link (view example)
    # get the eid from the url
    Details.names[Details.uid+"eid"] = request.args.get('eid')
    
    with open("webapp/xcos/"+str(Details.names[Details.uid+"eid"])+".xcos") as inf:
        # read the xcos file contents
        Details.names[Details.uid+"xcosContents"] = inf.read()

    with open("webapp/index.html") as inf:
        txt = inf.read()
        # load soup to edit the html file
        Details.names[Details.uid+"soup"] = bs4.BeautifulSoup(txt,'html.parser')
    
    Details.names[Details.uid+"pidlist"] = Details.names[Details.uid+"soup"].findAll("p")
    Details.names[Details.uid+"innerhtml_1"] = Details.names[Details.uid+"pidlist"][11].text
    temp = Details.names[Details.uid+"soup"].find(text=Details.names[Details.uid+"innerhtml_1"]).replaceWith(Details.names[Details.uid+"xcosContents"]) 

    with open("webapp/index.html", "w") as file:
        # edit and save the changes in html file
        file.write(str(Details.names[Details.uid+"soup"]))

    import webbrowser
    # open browser to load the imported experiment
    url = "http://127.0.1:8001?eid="+str(Details.names[Details.uid+"eid"])
    webbrowser.open(url,2)

    return "0"


@app.route('/ChangeIndexFile',  methods=['POST'])
def ChangeIndexFile():
    with open("webapp/index.html") as inf:
        txt = inf.read()
        # load soup to edit the html file
        Details.names[Details.uid+"soup"] = bs4.BeautifulSoup(txt,'html.parser')

    Details.names[Details.uid+"pidlist"] = Details.names[Details.uid+"soup"].findAll("p")
    Details.names[Details.uid+"innerhtml_2"] = Details.names[Details.uid+"pidlist"][11].text

    if Details.names[Details.uid+"innerhtml_2"] == Details.names[Details.uid+"xcosContents"] :
        temp = Details.names[Details.uid+"soup"].find(text=Details.names[Details.uid+"innerhtml_2"]).replaceWith("XcosNull")
        with open("webapp/index.html", "w") as file:
                file.write(str(Details.names[Details.uid+"soup"]))
    return "0"
            

# route for download of binary and audio
@app.route('/downloadfile',methods=['POST'])
def DownloadFile ():
    filename =request.form['path']
    download_file =os.getcwd()+'/'+filename
    #check if audio file or binary file
    if "audio"  in filename:
        return send_file(download_file, as_attachment=True,mimetype='audio/basic') 
    return send_file(download_file, as_attachment=True,mimetype='application/octet-stream')


# route for deletion of binary and audio file
@app.route('/deletefile',methods=['POST'])
def DeletFile ():
    filename =request.form['path']
    delete_file =os.getcwd()+'/'+filename
    os.remove(delete_file)#deleting the file
    return "0"
    
        
@app.route('/SendLog')
def sse_request():
    # Set response method to event-stream
    return Response(event_stream(request.args.get('id', '')), mimetype='text/event-stream')


@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


# route to kill scilab on closing of chart
@app.route('/stop')
def stop():
    kill_scilab()

    return "done"


# route ro end blocks with no Ending parameter
@app.route('/endBlock/<fig_id>')
def endBlock(fig_id):
    figure_list.remove(fig_id)
    return "done"


@app.route('/')
def page():
    return app.send_static_file('index.html')

@app.route('/getOutput',methods=['POST'])
def run_scilab_func_request():

    xcos_function_file_dir = os.getcwd() + '/'
    num =request.form['num']
    den =request.form['den']
    alpha="A,B,C,D";
    
    #session=Details.uid
    if 'z' in num or 'z' in den:
    	command = ["./"+SCI+"bin/scilab-adv-cli", "-nogui", "-noatomsautoload", "-nb", "-nw", "-e", "loadXcosLibs();z=poly(0,'z');exec('" + xcos_function_file_dir + "cont_frm_write.sci"+"');calculate_cont_frm("+num+","+den+");quit();"]
        
    else:
        command = ["./"+SCI+"bin/scilab-adv-cli", "-nogui", "-noatomsautoload", "-nb", "-nw", "-e", "loadXcosLibs();s=poly(0,'s');exec('" + xcos_function_file_dir + "cont_frm_write.sci"+"');calculate_cont_frm("+num+","+den+");quit();"]
        
    scilab_proc = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, preexec_fn=os.setpgrp);
    scilab_out, scilab_err = scilab_proc.communicate()
    
    file_name="cont_frm_value.txt";
    #print(file_name);
    with open(file_name) as f:
       data = f.read() # Read the data into a variable
       file_rows = data.strip().split(' ') # Split the file rows into seperate elements of a list
       #print(file_rows)
       list_value="[["
       for i in range(len(file_rows)):   
	   value=file_rows[i]      
           if(i==(len(file_rows)-1)): 
	      list_value=list_value+value+"]]"   
           else:
              list_value=list_value+value+"],["
  
       print (list_value)
    return list_value


if __name__ == '__main__':
    # Set server address 127.0.0.1:8001/
    http_server = WSGIServer(('127.0.0.1', 8001), app)
    try:
        http_server.serve_forever()
    except KeyboardInterrupt:
        print('exiting')

