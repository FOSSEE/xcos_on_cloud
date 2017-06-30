from __future__ import print_function
from xml.dom import minidom
import gevent
import fileinput
import time
import shutil
import os
import time
import threading
from gevent import monkey
import fileinput
from gevent.pywsgi import WSGIServer
from flask import Flask, request, Response, render_template, send_from_directory ,send_file# send_file added to ease download
from werkzeug import secure_filename
from os.path import exists
#import webbrowser #modifiedm@shivendra for displaying image saved
#from random import randint # modified_shank : to generate random image names

monkey.patch_all(aggressive=False)

import subprocess32 as subprocess

app = Flask(__name__, static_folder='webapp/')

# This is the path to the upload directory and values directory
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['VALUES_FOLDER'] = 'values/'

# Make the upload directory and values direectory if not available
subprocess.Popen('mkdir -p ' + app.config['UPLOAD_FOLDER'], shell = True)
subprocess.Popen('mkdir -p ' + app.config['VALUES_FOLDER'], shell = True)

# These are the extension that we are accepting to be uploaded
app.config['ALLOWED_EXTENSIONS'] = set(['zcos', 'xcos', 'txt'])

# Delay time to look for new line (in s)
LOOK_DELAY = 0.1
# States of the line
INITIALIZATION = 0
ENDING = 1
DATA = 2
NOLINE = -1
BLOCK_IDENTIFICATION =- 2

# Scilab dir, can't run absolute paths
SCI = "../scilab_for_xcos/"

# List to store figure IDs
figure_list = []
# List to store filenames of files
xcos_file_list = []



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
        #The below condition determines the block ID #modified@shivendra
    if line_words[2] == "Block":
        block_id=int(line_words[-1])
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
        
def get_line_and_state(file, count):
    # ----------------> Jayaprakash A <--------------------
    #  Return the line from the log filebased on the line count 

    # Function to get a new line from file
    # This also parses the line and appends new figures to figure List
    global figure_list
    line = file.readlines()

    if not line[count]: # If required line is not present
        return (None, NOLINE)

    parse_result = parse_line(line[count])
    figure_id = parse_result[0]
    state = parse_result[1]
    if state == INITIALIZATION:
        # New figure created
        # Add figure ID to list
        figure_list.append(figure_id)
        return (None, INITIALIZATION)
    elif state == BLOCK_IDENTIFICATION:#check for block identification 
            return (str(figure_id),BLOCK_IDENTIFICATION)
    elif state == ENDING:
        # End of figure
        # Remove figure ID from list
        figure_list.remove(figure_id)
        return (None, ENDING)
    return (line[count], DATA)

def event_stream(xcos_file_id):
	global figure_list
        global kill_scilab
	# If no id is sent, return
	if(len(xcos_file_id)==0):
		return
	xcos_file_id = int(xcos_file_id)
	xcos_file_dir = os.getcwd() + '/uploads/'
	xcos_file_name = xcos_file_list[xcos_file_id]
	# Get previously running scilab process IDs
	proc = subprocess.Popen("pgrep scilab", stdout=subprocess.PIPE, shell=True)
	# out will contain output of command, the list of process IDs of scilab
	(out, err) = proc.communicate()
	_l = len(out)
	#initialise pid
	pid = 0
        #id to identify each session for saving workspace #modified@shivendra
        session=Details.uid
        workspace="workspace"+session+".dat"
        append=',"-append"'
        #print workspace_command
        command = ["./"+SCI+"bin/scilab-adv-cli", "-nogui", "-noatomsautoload", "-nb", "-nw", "-e", "load('"+workspace+"');loadXcosLibs();importXcosDiagram('" + xcos_file_dir + xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'webapp/res_imgs/img_test.jpg'),mode(2);deletefile('"+workspace+"');save('"+workspace+append+"') ;quit()"]
        if(not exists(workspace)):
                command = ["./"+SCI+"bin/scilab-adv-cli", "-nogui", "-noatomsautoload", "-nb", "-nw", "-e", "loadXcosLibs();importXcosDiagram('" + xcos_file_dir + xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'webapp/res_imgs/img_test.jpg'),mode(2);save('"+workspace+"') ;quit()"]  
	scilab_proc = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=False);

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
        #print pid;

	# Define function to kill scilab(if still running) and remove files
	def kill_scilab():
		# Kill scilab by it's pid
		subprocess.Popen(["kill", "-9", pid])   
		# Remove log file
		subprocess.Popen(["rm", "-f", log_dir+log_name], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=False)
		# Remove xcos file
		subprocess.Popen(["rm", "-f", xcos_file_dir+xcos_file_name], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=False) 
		scilab_proc.kill()
                
        #Sink Identification file  #modified@shivendra3
        #File created to idenify the block
        #identify_block_name="identify_block_"+pid+".txt"
        #identify_block= open(identify_block_name, "r")
        
	# Log file directory
	# As the scilab process is spawned by this script
	#    the log directory is same as that of this script
	log_dir = "" 
	# Log file name
        log_name = "scilab-log-"+pid+".txt"

	#log_name = "scilab-log-"+str(7275)+".txt"       # to test a particular log file

	# Initialise output and error variables for subprocess
	scilab_out = ""
	scilab_err = ""
	gevent.sleep(10)
        line_count = 0
        line = line_and_state(None, NOLINE)
        while not (os.path.isfile(log_name)): # Checks if such a file exists
                pass
        gevent.sleep(1)
        # This variable is for running the sleep command

        # Start sending log
        put_delay = False
        line_id = -1
        delay_length = -1
	try:
		# For processes taking less than 10 seconds
		scilab_out, scilab_err = scilab_proc.communicate(timeout=10)
		# Check for errors in Scilab  modified_shank
		if "Empty diagram" in scilab_out:
			yield "event: ERROR\ndata: Empty diagram\n\n"
			kill_scilab()
			return
		# Open the log file
		log_file = open(log_dir + log_name, "r")

		#identify block using file
		#identify_block= open(identify_block_name, "r")
		#block_value=identify_block.readline()
		#identify_block.close()
		#yield "event: block\ndata: " + block_value + "\n\n"
		# Check for empty diagram
	
		# Start sending log
		line = line_and_state(None, NOLINE)
		while (1):
		# -----------------> Jayaprakash A <--------------------
		# The chart must be updated for all the various lines it has in 0.1 seconds.
		# Hence dividing the sleep time 0.1 by the number of lines the chart contains

			if put_delay:
			    gevent.sleep(0.1 / delay_length)


			log_file = open(log_dir + log_name, "r+")

			if not ( line.set(get_line_and_state(log_file,line_count)) or line.get_state() != ENDING or len(figure_list) > 0 ):
			    break

			# ---------------> Jayaprakash A <--------------------
			if line.get_state()== BLOCK_IDENTIFICATION:
			    # Split the line obtained from log file and the 8th element is line ID
			    logLine = line.get_line()

			    line_contents = logLine.split(' ')
			    # Checking if the current line ID is same as first line ID and is the first occurence of matching
			    if(line_id == line_contents[7] and not put_delay):
				delay_length = line_count - 1 # The count of total number of lines in the chart
				put_delay = True
			    # The first line ID 
			    if(line_count == 1):
				line_id = line_contents[7]
			    yield "event: block\ndata: "+logLine+"\n\n"


			elif line.get_state() != DATA:
			    gevent.sleep(LOOK_DELAY)    


			# -------------------> Jayaprakash A <------------------- 
			else:
			    # Split the line obtained from log file and the 8th element is line ID
			    logLine = line.get_line()

			    line_contents = logLine.split(' ')
			    # Checking if the current line ID is same as first line ID and is the first occurence of matching
			    if(line_id == line_contents[7] and not put_delay):
				delay_length = line_count - 1 # The count of total number of lines in the chart
				put_delay = True

			    # The first line ID 
			    if(line_count == 1):
				line_id = line_contents[7]
			    yield "event: log\ndata: "+logLine+ "\n\n"


			# Reset line, so server won't send same line twice
			line = line_and_state(None, NOLINE)
			line_count = line_count + 1
			log_file.close()
		#webbrowser.open_new_tab("images/img_test.png")#modified@shivendra this displays saved image in a new window
		# Finished Sending Log
		kill_scilab()
		# Notify Client
		yield "event: DONE\ndata: None\n\n"

	# For processes taking more than 10 seconds
	except subprocess.TimeoutExpired:
	    	# Check for errors in Scilab  modified_shank
		if "Empty diagram" in scilab_out:
			yield "event: ERROR\ndata: Empty diagram\n\n"
			kill_scilab()
			return
 

		# Open the log file
		log_file = open(log_dir + log_name, "r")

		#identify block using file
		#identify_block= open(identify_block_name, "r")
		#block_value=identify_block.readline()
		#identify_block.close()
		#yield "event: block\ndata: " + block_value + "\n\n"
		# Check for empty diagram
	
		# Start sending log
		line = line_and_state(None, NOLINE)
		while (1):
			# -----------------> Jayaprakash A <--------------------
			# The chart must be updated for all the various lines it has in 0.1 seconds.
			# Hence dividing the sleep time 0.1 by the number of lines the chart contains

			if put_delay:
			    gevent.sleep(0.1 / delay_length)


			log_file = open(log_dir + log_name, "r+")

			if not ( line.set(get_line_and_state(log_file,line_count)) or line.get_state() != ENDING or len(figure_list) > 0 ):
			    break

			# ---------------> Jayaprakash A <--------------------
			if line.get_state()== BLOCK_IDENTIFICATION:
			    # Split the line obtained from log file and the 8th element is line ID
			    logLine = line.get_line()

			    line_contents = logLine.split(' ')
			    # Checking if the current line ID is same as first line ID and is the first occurence of matching
			    if(line_id == line_contents[7] and not put_delay):
				delay_length = line_count - 1 # The count of total number of lines in the chart
				put_delay = True
			    # The first line ID 
			    if(line_count == 1):
				line_id = line_contents[7]
			    yield "event: block\ndata: "+logLine+"\n\n"


			elif line.get_state() != DATA:
			    gevent.sleep(LOOK_DELAY)    


			# -------------------> Jayaprakash A <------------------- 
			else:
			    # Split the line obtained from log file and the 8th element is line ID
			    logLine = line.get_line()

			    line_contents = logLine.split(' ')
			    # Checking if the current line ID is same as first line ID and is the first occurence of matching
			    if(line_id == line_contents[7] and not put_delay):
				delay_length = line_count - 1 # The count of total number of lines in the chart
				put_delay = True

			    # The first line ID 
			    if(line_count == 1):
				line_id = line_contents[7]
			    yield "event: log\ndata: "+logLine+ "\n\n"


			# Reset line, so server won't send same line twice
			line = line_and_state(None, NOLINE)
			line_count = line_count + 1
			log_file.close()
		#webbrowser.open_new_tab("images/img_test.png")#modified@shivendra this displays saved image in a new window
		# Finished Sending Log
		kill_scilab()
		# Notify Client
		yield "event: DONE\ndata: None\n\n"

# class used to get the user_id and the boolean value is to make run a thread    # '=> Dattatreya <=' 
class Details:
     import uuid
     my_id = uuid.uuid1()
     uid = str(my_id) # user_id
     tkbool = True  # boolean value to run the thread acc. to it
     print("user_id:"+uid)
     names = {}



# function which will check and make initialization of every required fles.   # '=> Dattatreya <=' 
def findFile():     
	r = open("values/"+Details.uid+"_val.txt","r") 
	line = r.readline() # at first the val.txt contains "Start" indicating the starting of the process
	r.close()
	
	if line == "Start": 
	     Details.tkbool = True
	     w = open("values/"+Details.uid+"_tktime.txt","w") # tktime.txt is the file where we will update the time basing on the parameter ("Period" of CLOCK_c) for each tkscale
	     w.write("0\n0\n0\n0\n0\n0\n0\n0\n0\n0") # initialize all tktime values to 0
	     w.close()
	  
	     for i in range(10):
	     	open("values/"+Details.uid+"_tk"+str(i+1)+".txt","w").close(); # create empty tk text files
	     return 0
	elif line=="Stop": # at last the val.txt contains "Stop" indicating the ending process
	     return 1
	return 2

# function which changes flaoting to req scientific format    # '=> Dattatreya <=' 
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
	
# function which appends the 'updated' ('new') value to the file    # '=> Dattatreya <=' 
def AppendtoTKfile(fname,tlist,i):
	tl = tlist.split('  ') # converting string to list which stores the Period parameter at 0 index, data to be appended at index 1
	
	if(tl[1]==''):
		return # if data is empty, do not append it
	with open("values/"+Details.uid+"_tktime.txt", 'r') as file:
    		tktime = file.readlines() # read the tktime folder to get tkfile time at respective index (tk1.txt at 0 index)
	time = float(tktime[i])+float(tl[0]) # update the time
	tktime[i]=str(time)+'\n'

	with open("values/"+Details.uid+"_tktime.txt", 'w') as file:
    		file.writelines( tktime ) # write the updated the time to tktime.txt
	
	data = tl[1]
	time = changeFormat(time)
	
	line = time+"  "+data+"\n"
	
	w= open(fname,'a') # append data to the tk.txt
	w.write(line)
	w.close()
	

# function which take values from val.txt send the data to  append them in their respective 'tk' files.        # '=> Dattatreya <=' 
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
# function which makes the initialisation of thread    # '=> Dattatreya <=' 
def getDetailsThread():
	if Details.tkbool:
		getDetails()
		import threading 
		from threading import Timer
		threading.Timer(0.1,getDetailsThread).start()  # calls the same function adter 0.1 second

def stopDetailsThread():     # '=> Dattatreya <=' 
	Details.tkbool = False # stops the thread
	import os, glob
	for filename in glob.glob("values/"+Details.uid+"*"):
    		os.remove(filename) # deletes all files created under the 'uid' name


# Route that will process the file upload
@app.route('/upload', methods=['POST'])
def upload():
    # Get the file
    print( "upload")
    file = request.files['file']

    # Check if the file is not null
    if file:
        # Make the filename safe, remove unsupported chars
        client_id = len(xcos_file_list)

        #  ----------------> Jayaprakash A <------------------
        # Save the file in xml extension and using it for further modification by using xml parser
        temp_file_xml_name = str(client_id)+".xml"
        file.save(os.path.join(temp_file_xml_name))
        new_xml = minidom.parse(temp_file_xml_name)

        #  ---------------> Jayaprakash A <------------------
        blocks = new_xml.getElementsByTagName("BasicBlock")
	tk_is_present = False
        # List to contain all the block IDs of tkscales so that we can create read blocks with these IDs
        block_id = []
        for block in blocks:
            if block.getAttribute("interfaceFunctionName") == "TKSCALE":
                block_id.append(block.getAttribute("id"))
                block.setAttribute('id', '-1') 
		tk_is_present = True
                # Changed the ID of tkscales to -1 so that virtually the tkscale blocks get disconnected from diagram at the backend
        
        #  ---------------> Jayaprakash A <------------------
        # Hardcoded the real time scaling to 1.0 (i.e., no scaling of time occurs) only if tkscale is present
        if(tk_is_present):
            diagram = new_xml.getElementsByTagName("XcosDiagram")
            for dia in diagram:
                dia.setAttribute('realTimeScaling', '1.0')
                
        # ------------------> Jayaprakash A <-----------------------
        # Save the changes made by parser
        tk_count = 0 
        with open(temp_file_xml_name,'w') as f:
            f.write(new_xml.toxml())

        #  ---------------> Jayaprakash A <------------------
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

                # ----------------> Jayaprakash A <--------------------

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

        # -----------------------> Jayaprakash A <------------------------
        # Changing the file extension from xml to xcos
        base_filename = os.path.splitext(temp_file_xml_name)[0]
        os.rename(temp_file_xml_name, base_filename + ".xcos")
        source_folder = os.getcwd()
        destination_folder = source_folder + "/uploads/"

        # ----------------------> Jayaprakash A <-----------------------------
        # Move the xcos file to uploads directory
        folder_file_content = filter(os.path.isfile, os.listdir( os.curdir ) )
        for file in folder_file_content:
            if file.endswith(".xcos"):
                shutil.copy(file, destination_folder)
                subprocess.Popen(["rm",file])# After moving to the required folder deleting the xcos file.
        temp_file_xml_name = base_filename + ".xcos"
        xcos_file_list.append(temp_file_xml_name)

        return str(client_id)
    else:
        return "error"

@app.route('/UpdateTKfile', methods=['POST'])    
def UpdateTKfile():		# '=> Dattatreya <='  function which makes the initialazation and updation of the files with obtained new value
	# Get the file
	file = request.files['file']

	# Check if the file is not null
	if file:
		filename1 = Details.uid+'_val.txt'
		file.save(os.path.join(app.config['VALUES_FOLDER'], filename1)) # saves the file in values folder
		n = findFile()
		if n==0:
		   getDetailsThread() # starts the thread

		elif n==1:
		   stopDetailsThread() # stops the thread
		
		return ""
	else:
		return "error"
@app.route('/importXcos')   # '=> Dattatreya <=' function to take the request data when user click the url link (view example)
def importXcos():

	
	Details.names[Details.uid+"eid"] = request.args.get('eid')	# get the eid from the url
	
	with open("webapp/xcos/"+str(Details.names[Details.uid+"eid"])+".xcos") as inf:
		Details.names[Details.uid+"xcosContents"] = inf.read()	# read the xcos file contents
	import bs4
	with open("webapp/index.html") as inf:
    		txt = inf.read()
    		Details.names[Details.uid+"soup"] = bs4.BeautifulSoup(txt,'html.parser')	# load soup to edit the html file
	
	Details.names[Details.uid+"pidlist"] = Details.names[Details.uid+"soup"].findAll("p")
	Details.names[Details.uid+"innerhtml_1"] = Details.names[Details.uid+"pidlist"][11].text
	temp = Details.names[Details.uid+"soup"].find(text=Details.names[Details.uid+"innerhtml_1"]).replaceWith(Details.names[Details.uid+"xcosContents"])	

	with open("webapp/index.html", "w") as file:
    		file.write(str(Details.names[Details.uid+"soup"]))				# edit and save the changes in html file

	import webbrowser
	url = "http://127.0.1:8001?eid="+str(Details.names[Details.uid+"eid"])				# open browser to load the imported experiment
	webbrowser.open(url,2)

	return "0"

@app.route('/ChangeIndexFile',	methods=['POST'])
def ChangeIndexFile():

	import bs4
	with open("webapp/index.html") as inf:
    		txt = inf.read()
    		Details.names[Details.uid+"soup"] = bs4.BeautifulSoup(txt,'html.parser')	# load soup to edit the html file

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
		
@app.route('/SendLog')
def sse_request():
    # Set response method to event-stream
    return Response(event_stream(request.args.get('id', '')), mimetype='text/event-stream')

@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)

@app.route('/')
def page():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    # Set server address 127.0.0.1:8001/
    http_server = WSGIServer(('127.0.0.1', 8001), app)
    http_server.serve_forever()
