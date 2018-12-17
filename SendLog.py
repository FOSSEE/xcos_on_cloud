#!/usr/bin/python3

import gevent
from gevent.lock import RLock
from gevent.monkey import patch_all
from gevent.pywsgi import WSGIServer

patch_all(aggressive=False, subprocess=False)

from datetime import datetime
import fileinput
import flask
from flask import request, Response, session, render_template, jsonify
import flask_session
import glob
import json
import os
from os.path import abspath, basename, exists, isfile, join, splitext
import re
import requests
import signal
import subprocess
from tempfile import mkdtemp, mkstemp
from threading import Timer
from time import time
import uuid
from werkzeug import secure_filename
from xml.dom import minidom

from db_connection import connection
import config
from config import FLASKSESSIONDIR, SESSIONDIR

def makedirs(dirname, dirtype):
    if not exists(dirname):
        print('making', dirtype, 'dir', dirname)
        os.makedirs(dirname)

def remove(filename):
    if filename is None:
        return False
    try:
        os.remove(filename)
        return True
    except:
        print("could not remove", filename)
        return False

makedirs(FLASKSESSIONDIR, 'top flask session')
makedirs(SESSIONDIR, 'top session')

app = flask.Flask(__name__, static_folder='webapp/', template_folder='webapp')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = FLASKSESSIONDIR
# These are the extension that we are accepting to be uploaded
app.config['ALLOWED_EXTENSIONS'] = set(['zcos', 'xcos', 'txt'])
flask_session.Session(app)

# This is the path to the upload directory and values directory
UPLOAD_FOLDER = 'uploads' # to store xcos file
VALUES_FOLDER = 'values' # to store files related to tkscale block
SCIFUNC_FILES_FOLDER = 'scifunc_files' # to store uploaded sci files for sci-func block

# Delay time to look for new line (in s)
LOOK_DELAY = 0.1
# States of the line
INITIALIZATION = 0 # to indicate initialization of block in log file is encounter
ENDING = 1      # to indicate ending of log file data for that block is encounter
DATA = 2        # to indicate data is proper and can be read
NOLINE = -1     # to indicate there is no line in log file further
BLOCK_IDENTIFICATION = -2 # to indicate block id is present

# Scilab dir
SCIDIR = abspath(config.SCILAB_DIR)
SCI = join(SCIDIR, "bin", "scilab-adv-cli")
READCONTENTFILE = abspath("Read_Content.txt")
CONT_FRM_WRITE = abspath("cont_frm_write.sci")
BASEDIR = abspath('webapp')
IMAGEDIR = join(BASEDIR, 'res_imgs')
# display limit for long strings
DISPLAY_LIMIT = 10
# handle scilab startup
SCILAB_START = "errcatch(-1,'stop');lines(0,120);clearfun('messagebox');function messagebox(msg,msgboxTitle,msgboxIcon,buttons,isModal),disp(msg),endfunction;loadXcosLibs();"
SCILAB_END = "mode(2);quit();"

RUNTIME = {}

class Runtime:
    scilab_proc = None
    # store log name
    log_name = None
    # is thread running?
    tkbool = False
    tk_starttime = None
    # in memory values
    tk_deltatimes = None
    tk_values = None
    tk_times = None
    # List to store figure IDs from log_name
    figure_list = None

    def __init__(self):
        self.figure_list = []

    def __str__(self):
        return "{ 'scilab_pid': %s, 'log_name': %s, 'tkbool': %s, 'figure_list': %s }" % (
                self.scilab_proc.pid if self.scilab_proc is not None else None,
                self.log_name, self.tkbool, self.figure_list)

class Diagram:
    diagram_id = None
    # session dir
    sessiondir = None
    # store uploaded filename
    xcos_file_name = None
    # type of uploaded file
    workspace_counter = 0
    # tk count
    tk_count = 0
    # link to runtime
    uid = None

    def toDict(self):
        return self.__dict__

    def fromDict(self, d):
        if 'diagram_id' in d:
            self.diagram_id = d['diagram_id']
        if 'sessiondir' in d:
            self.sessiondir = d['sessiondir']
        if 'xcos_file_name' in d:
            self.xcos_file_name = d['xcos_file_name']
        if 'workspace_counter' in d:
            self.workspace_counter = d['workspace_counter']
        if 'tk_count' in d:
            self.tk_count = d['tk_count']
        if 'uid' in d:
            self.uid = d['uid']
        else:
            self.uid = str(uuid.uuid1())

class SciFile:
    #Variables used in sci-func block
    filename = ''
    file_image = ''
    flag_sci = False

    def toDict(self):
        return self.__dict__

    def fromDict(self, d):
        if 'filename' in d:
            self.filename = d['filename']
        if 'file_image' in d:
            self.file_image = d['file_image']
        if 'flag_sci' in d:
            self.flag_sci = d['flag_sci']

# Class to store the line and its state (Used in reading data from log file)
class line_and_state:
    line = None # initial line to none(Nothing is present)
    state = NOLINE #initial state to NOLINE ie
    def __init__(self, line, state):
        self.line = line
        self.state = state
    def set(self, line_state):
        self.line = line_state[0] #to set line
        self.state = line_state[1] # to set state
        return False
    def get_line(self):
        return self.line
    def get_state(self):
        return self.state

def init_session():
    if 'sessiondir' not in session:
        session['sessiondir'] = mkdtemp(prefix=datetime.now().strftime('%Y%m%d.'), dir=SESSIONDIR)

    sessiondir = session['sessiondir']

    makedirs(sessiondir, 'session')
    makedirs(join(sessiondir, UPLOAD_FOLDER), 'upload')
    makedirs(join(sessiondir, VALUES_FOLDER), 'values')
    makedirs(join(sessiondir, SCIFUNC_FILES_FOLDER), 'scifunc files')

    if 'diagrams' not in session:
        session['diagrams'] = []
    if 'scifile' not in session:
        session['scifile'] = SciFile().toDict()

    diagrams = session['diagrams']

    s = session['scifile']
    scifile = SciFile()
    scifile.fromDict(s)

    return (diagrams, scifile)

def get_diagram(xcos_file_id, remove=False):
    if len(xcos_file_id) == 0:
        print("no id")
        return (None, None)
    xcos_file_id = int(xcos_file_id)

    (diagrams, scifile) = init_session()

    if xcos_file_id < 0 or xcos_file_id >= len(diagrams):
        print("id", xcos_file_id, "not in diagrams")
        return (None, None)

    d = diagrams[xcos_file_id]
    diagram = Diagram()
    diagram.fromDict(d)
    if diagram.diagram_id is None:
        diagram.diagram_id = str(xcos_file_id)
    if diagram.sessiondir is None:
        diagram.sessiondir = session['sessiondir']

    if remove:
        diagrams[xcos_file_id] = Diagram().toDict()
    else:
        diagrams[xcos_file_id] = diagram.toDict()
    save_diagram()

    return (diagram, scifile)

def add_diagram():
    (diagrams, scifile) = init_session()

    diagram = Diagram()
    diagram.diagram_id = str(len(diagrams))
    diagram.sessiondir = session['sessiondir']
    diagram.uid = str(uuid.uuid1())
    diagrams.append(diagram.toDict())

    return (diagram, scifile)

def get_runtime(uid, *, create=False, remove=False):
    if uid in RUNTIME:
        return RUNTIME.pop(uid) if remove else RUNTIME[uid]
    if create:
        runtime = RUNTIME[uid] = Runtime()
        print('added runtime[', uid, ']=', runtime, sep='')
        return runtime
    print('not found runtime: uid=', uid, sep='')
    return None

def save_diagram():
    session.modified = True

def save_scifile(scifile):
    session['scifile'] = scifile.toDict()

# Function to parse the line
# Returns tuple of figure ID and state
# state = INITIALIZATION if new figure is created
#         ENDING if current fig end
#         DATA otherwise
def parse_line(line):
    line_words = line.split(' ') #Each line is split to read condition
    #The below condition determines the block ID
    if line_words[2] == "Block":
        block_id=int(line_words[4]) # to get block id (Which is explicitly added by us while writing into log in scilab source code)
        return (block_id, BLOCK_IDENTIFICATION)
    if line_words[2] == "Initialization":
        # New figure created
        # Get fig id
        figure_id = int(line_words[-1]) # to extract figure ids (sometime multiple sinks can be used in one diagram to differentiate that)
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

def get_line_and_state_modified(file, figure_list):
    # Function to get a new line from file
    # This also parses the line and appends new figures to figure List
    line = file.readline() #read line by line from log
    if not line:            # if line is empty then return noline
        return (None, NOLINE)
    parse_result = parse_line(line) # every line is passed to function parse_line for getting values
    figure_id = parse_result[0]
    state = parse_result[1]
    if state == INITIALIZATION:
        # New figure created
        # Add figure ID to list
        figure_list.append(figure_id) #figure id of block is added to list
        return (None, INITIALIZATION)
    # Check for block identification
    elif state == BLOCK_IDENTIFICATION:
        return (line, BLOCK_IDENTIFICATION)
    elif state == ENDING:
        # End of figure
        # Remove figure ID from list
        figure_list.remove(figure_id) # Once ending of log file/data is encounter for that block figure id will be removed
        return (None, ENDING)
    return (line, DATA)


logfilefdrlock = RLock()
LOGFILEFD = 123

def run_scilab(command, createlogfile=False):
    cmd = SCILAB_START + command + SCILAB_END
    print('running command', cmd)
    cmdarray = [SCI, "-nogui", "-noatomsautoload", "-nouserstartup", "-nb", "-nw", "-e", cmd]
    if not createlogfile:
        return subprocess.Popen(cmdarray, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, start_new_session=True, universal_newlines=True)

    logfilefd, log_name = mkstemp(prefix=datetime.now().strftime('scilab-log-%Y%m%d-'), suffix='.txt', dir=SESSIONDIR)

    logfilefdrlock.acquire()
    if logfilefd != LOGFILEFD:
        os.dup2(logfilefd, LOGFILEFD)
        os.close(logfilefd)
    proc = subprocess.Popen(cmdarray, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, start_new_session=True, universal_newlines=True, pass_fds=(LOGFILEFD, ))
    os.close(LOGFILEFD)
    logfilefdrlock.release()

    return (proc, log_name)


# Below route is called for uploading sci file which is required in sci-func block (called in Javscript only_scifunc_code.js)
@app.route('/uploadsci', methods=['POST'])
def uploadsci():
    (diagrams, scifile) = init_session()

    file = request.files['file'] #to get uploaded file
    if file and request.method == 'POST':
        ts = datetime.now()
        # file name is created with timestamp
        scifile.filename = join(session['sessiondir'], SCIFUNC_FILES_FOLDER, str(ts) + secure_filename(file.filename))
        file.save(scifile.filename) # file is saved in scifunc_files folder
        scifile.flag_sci = True # flag for file saved

        #Following are system command which are not permitted in sci files (Reference scilab-on-cloud project)
        system_commands = re.compile(r'unix\(.*\)|unix_g\(.*\)|unix_w\(.*\)|unix_x\(.*\)|unix_s\(.*\)|host|newfun|execstr|ascii|mputl|dir\(\)')
        #Read file and check for system commands and return error if file contain system commands
        match = re.findall(system_commands, open(scifile.filename, 'r').read())
        if(match):
            msg = "System calls are not allowed in .sci file!\n Please upload another .sci file!!"
            remove(scifile.filename) # Delete saved file if system commands are encounter in that file
            scifile.flag_sci = False # flag for file saved will be set as False
            return msg

        # scilab command is created to run that uploaded sci file which will be used by sci-func block
        command = "exec('"+scifile.filename+"');"

        try:
            output_com = run_scilab(command)
        except FileNotFoundError:
            return "scilab not found. Follow the installation instructions"

        out = output_com.communicate()[0] # output from scilab terminal is saved for checking error msg

        # if error is encounter while execution of sci file then error msg is return to user for rectifying it
        # in case no error are encounter file uploaded successful msg is sent to user
        if('!--error' in out):
            error_index = out.index('!')
            msg = out[error_index:-9]
            remove(scifile.filename) # Delete saved file if error is encounter while executing sci function in that file
            scifile.flag_sci = False # flag for file saved will be set as False
            return msg
        else:
            save_scifile(scifile)
            msg = "File is uploaded successfully!!"
            return msg

'''
This route is used in index.html for checking condition
if sci file is uploaded for sci-func block diagram imported directly using import (will confirm again)
'''
@app.route('/requestfilename', methods=['POST'])
def sendfile():
    (diagrams, scifile) = init_session()

    if scifile.flag_sci:
        scifile.file_image = splitext(basename(scifile.filename))[0]
    else:
        scifile.file_image = ''
    scifile.flag_sci = False
    save_scifile(scifile)
    return scifile.file_image


def kill_scilab_with(proc, sgnl):
    '''
    function to kill a process group with a signal. wait for maximum 2 seconds
    for process to exit. return True on exit, False otherwise
    '''

    if proc.poll() is not None:
        return True

    try:
        os.killpg(proc.pid, sgnl)
    except OSError:
        print('could not kill', proc.pid, 'with signal', sgnl)
        return False
    except TypeError:
        print('could not kill invalid process with signal', sgnl)
        return True

    for i in range(0, 20):
        gevent.sleep(LOOK_DELAY)
        if proc.poll() is not None:
            return True
    return False

def get_request_id(key = 'id'):
    args = request.args
    if args is None:
        print('No args in request')
        return ''
    if key not in args:
        print('No', key, 'in request.args')
        return ''
    value = args[key]
    if re.fullmatch(r'[0-9]+', value):
        return value
    displayvalue = value if len(value) <= DISPLAY_LIMIT + 3 else value[:DISPLAY_LIMIT] + '...'
    print('Invalid value', displayvalue, 'for', key, 'in request.args')
    return ''

# Define function to kill scilab(if still running) and remove files
def kill_scilab(diagram = None):
    if diagram is None:
        (diagram, __) = get_diagram(get_request_id(), True)

    if diagram is None:
        print('no diagram')
        return
    print('kill_scilab: diagram=', diagram.toDict())

    if diagram.xcos_file_name is None:
        print('empty diagram')
    else:
        # Remove xcos file
        remove(diagram.xcos_file_name)
        diagram.xcos_file_name = None
        save_diagram()

    runtime = get_runtime(diagram.uid, remove=True)
    if runtime is None:
        return
    print('kill_scilab: runtime=', runtime)

    if runtime.scilab_proc is None:
        print('no scilab proc')
    else:
        if not kill_scilab_with(runtime.scilab_proc, signal.SIGTERM):
            kill_scilab_with(runtime.scilab_proc, signal.SIGKILL)
        runtime.scilab_proc = None

    if runtime.log_name is None:
        print('empty runtime')
    else:
        # Remove log file
        remove(runtime.log_name)
        runtime.log_name = None

    stopDetailsThread(diagram, runtime)

'''
function to execute xcos file using scilab (scilab-adv-cli), access log file written by scilab

This function is called in app route 'start_scilab' below
'''
@app.route('/start_scilab')
def start_scilab():
    (diagram, scifile) = get_diagram(get_request_id())
    if diagram is None:
        print('no diagram')
        return "error"
    runtime = get_runtime(diagram.uid, create=True)

    # name of workspace file
    workspace="workspace.dat"

    ''' Scilab Commands for running of scilab based on existence of different blocks in same diagram from workpace_counter's value
        1: Indicate TOWS_c exist
        2: Indicate FROMWSB exist
        3: Both TOWS_c and FROMWSB exist
        4: Indicate AFFICH_m exist (We dont want graphic window to open so xs2jpg() command is removed)
        5: Indicate Sci-func block as it some time return image as output rather than Sinks's log file.
        0/No-condition : For all other blocks
    '''
    if diagram.workspace_counter == 3 and exists(workspace):
        #3 - for both TOWS_c and FROMWSB and also workspace dat file exist
        #In this case workspace is saved in format of dat file (Scilab way of saying workpsace)
        command = "load('"+workspace+"');importXcosDiagram('" + diagram.xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'" + IMAGEDIR + "/img_test.jpg');deletefile('"+workspace+"');save('"+workspace+"');"
    elif diagram.workspace_counter == 1 or diagram.workspace_counter == 3:
        #For 1- TOWS_c or 3 - for both TOWS_c and FROMWSB
        command = "importXcosDiagram('" + diagram.xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'" + IMAGEDIR + "/img_test.jpg');deletefile('"+workspace+"');save('"+workspace+"');"
    elif diagram.workspace_counter == 4:
        # For AFFICH-m block
        command = "importXcosDiagram('" + diagram.xcos_file_name + "');xcos_simulate(scs_m,4);"
    elif diagram.workspace_counter == 2 and exists(workspace):
        # For FROMWSB block and also workspace dat file exist
        command = "load('"+workspace+"');importXcosDiagram('" + diagram.xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'" + IMAGEDIR + "/img_test.jpg');deletefile('"+workspace+"');"
    elif diagram.workspace_counter == 5:
        # For Sci-Func block (Image are return as output in some cases)
        command = "exec('" + scifile.filename +"');importXcosDiagram('" + diagram.xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'" + IMAGEDIR + "/img_test"+scifile.file_image+".jpg');"
        t = Timer(15.0, delete_image)
        t.start()
        t1 = Timer(10.0, delete_scifile)
        t1.start()
    else:
        # For all other block
        command = "importXcosDiagram('" + diagram.xcos_file_name + "');xcos_simulate(scs_m,4);xs2jpg(gcf(),'" + IMAGEDIR + "/img_test.jpg');"

    try:
        runtime.scilab_proc, runtime.log_name = run_scilab(command, True)
    except FileNotFoundError:
        return "scilab not found. Follow the installation instructions"

    print('log_name=', runtime.log_name)

    # Start sending log to chart function for creating chart
    try:
        # For processes taking less than 10 seconds
        scilab_out, scilab_err = runtime.scilab_proc.communicate(timeout=4)
        scilab_out = re.sub(r'^[ !\\-]*\n', r'', scilab_out, flags=re.MULTILINE)
        print("=== Begin output from scilab console ===")
        print(scilab_out, end='')
        print("===== End output from scilab console ===")
        # Check for errors in Scilab
        if "Empty diagram" in scilab_out:
            return "Empty diagram"

        m = re.search(r'Fatal error: exception Failure\("([^"]*)"\)', scilab_out)
        if m:
            msg = 'modelica error: ' + m.group(1)
            return msg

        if "xcos_simulate: Error during block parameters update." in scilab_out:
            return "Error in block parameter. Please check block parameters"

        if "xcosDiagramToScilab:" in scilab_out:
            return "Error in xcos diagram. Please check diagram"

        if "Cannot find scilab-bin" in scilab_out:
            return "scilab has not been built. Follow the installation instructions"

        if os.stat(runtime.log_name).st_size == 0:
            return "log file is empty"

    # For processes taking more than 10 seconds
    except subprocess.TimeoutExpired:
        pass

    return ""

'''
Read log file and return data to eventscource function of javascript for displaying chart.

This function is called in app route 'SendLog' below
'''
@flask.stream_with_context
def event_stream():
    (diagram, __) = get_diagram(get_request_id())
    runtime = get_runtime(diagram.uid)
    if runtime is None:
        yield "event: ERROR\ndata: no data found\n\n"
        return

    # Open the log file
    if not isfile(runtime.log_name):
        print("log file does not exist")
        yield "event: ERROR\ndata: no log file found\n\n"
        return
    while os.stat(runtime.log_name).st_size == 0 and runtime.scilab_proc.poll() is None:
        gevent.sleep(LOOK_DELAY)
    if os.stat(runtime.log_name).st_size == 0 and runtime.scilab_proc.poll() is not None:
        print("log file is empty")
        yield "event: ERROR\ndata: log file is empty\n\n"
        return

    with open(runtime.log_name, "r") as log_file:
        # Start sending log
        line = line_and_state(None, NOLINE)
        while line.set(get_line_and_state_modified(log_file, runtime.figure_list)) or len(runtime.figure_list) > 0:
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
    kill_scilab(diagram)

    # Notify Client
    yield "event: DONE\ndata: None\n\n"


def delete_image():
    (diagrams, scifile) = init_session()

    if scifile.file_image == '':
        return

    image_path = IMAGEDIR + '/img_test' + scifile.file_image + '.jpg'
    remove(image_path)
    scifile.file_image = ''
    save_scifile(scifile)

def delete_scifile():
    (diagrams, scifile) = init_session()

    if scifile.filename == '':
        return

    remove(scifile.filename)
    scifile.filename = ''
    save_scifile(scifile)

# function which appends the 'updated' ('new') value to the file
def AppendtoTKfile(diagram, runtime):
    starttime = runtime.tk_starttime

    for i in range(diagram.tk_count):
        fname = join(diagram.sessiondir, VALUES_FOLDER, diagram.diagram_id+"_tk"+str(i+1)+".txt")

        # append data to the tk.txt
        with open(fname, 'a') as w:
            while time() > starttime + runtime.tk_times[i] + runtime.tk_deltatimes[i]:
                # update the time
                runtime.tk_times[i] += runtime.tk_deltatimes[i]
                w.write('%10.3E %10.3E\n' % (runtime.tk_times[i], runtime.tk_values[i]))


# function which makes the initialisation of thread
def getDetailsThread(diagram):
    runtime = get_runtime(diagram.uid)
    if runtime is None:
        return

    while runtime.tkbool:
        AppendtoTKfile(diagram, runtime)
        gevent.sleep(0.1)

def stopDetailsThread(diagram, runtime):
    runtime.tkbool = False # stops the thread
    gevent.sleep(LOOK_DELAY)
    for fn in glob.glob(join(diagram.sessiondir, VALUES_FOLDER, diagram.diagram_id)+"_*"):
        # deletes all files created under the 'diagram_id' name
        remove(fn)

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
        (diagram, scifile) = add_diagram()
        # Save the file in xml extension and using it for further modification by using xml parser
        temp_file_xml_name = diagram.diagram_id+".xml"
        file.save(temp_file_xml_name)
        new_xml = minidom.parse(temp_file_xml_name)

        # to identify if we have to load or save to workspace or neither #0 if neither TOWS_c or FROWSB found
        blocks = new_xml.getElementsByTagName("BasicBlock")
        tk_is_present = False
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
            block_ids=[] #this stores the id of split blocks
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
                    if block.getAttribute("parent") == str(finalsplit[i]): #match the lines with the parent of our spliblocks which we need to change
                        block.setAttribute('id', '-1')
            blockcommand = new_xml.getElementsByTagName("CommandPort")
            for block in blockcommand:
                for i in range(len(finalsplit)):
                    if block.getAttribute("parent") == str(finalsplit[i]):

                        block.setAttribute('id', '-1')
            finalchangeid=[] #here we take the ids of command controllink which we will search and change
            for i in range(len(finalsplit)):
                finalchangeid.append(finalsplit[i]+4)
                finalchangeid.append(finalsplit[i]+5)

            with open(temp_file_xml_name, 'w') as f: #here we save the contents
                f.write(new_xml.toxml())

            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():

                    if "<CommandControlLink id=" in word:
                        temp_word=""
                        for i in range(len(finalchangeid)):
                            if "<CommandControlLink id=\""+str(finalchangeid[i])+"\"" in word:
                                temp_word=word.replace("<CommandControlLink id=\""+str(finalchangeid[i])+"\"", "<ImplicitLink id=\""+str(finalchangeid[i])+"\"")
                                i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
            with open(temp_file_xml_name, "r") as in_file:
                buf = in_file.readlines()
            #length=len(finalsplit)
            #return finalsplit
            with open(temp_file_xml_name, "w") as out_file:
                for line in buf:
                    for i in range (len(finalsplit)):
                        if '<ControlPort connectable=\"0\" dataType=\"UNKNOW_TYPE\" id=\"-1\" ordering=\"1\" parent="'+str(finalsplit[i])+"\"" in line:
                            line="\t    <ImplicitInputPort connectable=\"0\" dataType=\"UNKNOW_TYPE\" id=\""+str(finalsplit[i]+1)+"\""+" ordering=\"1\" parent=\""+str(finalsplit[i])+"\""+" style=\"ImplicitInputPort\">\n\t\t<mxGeometry as=\"geometry\" height=\"10\" relative=\"1\" width=\"10\" y=\"0.5000\">\n\t\t</mxGeometry>\n\t    </ImplicitInputPort>\n\t    <ImplicitOutputPort connectable=\"0\" dataType=\"UNKNOW_TYPE\" id=\""+str(finalsplit[i]+2)+"\""+" ordering=\"1\" parent=\""+str(finalsplit[i])+"\""+" style=\"ImplicitOutputPort\">\n\t\t<mxGeometry as=\"geometry\" height=\"10\" relative=\"1\" width=\"10\" y=\"0.5000\">\n\t\t</mxGeometry>\n\t    </ImplicitOutputPort>\n\t    <ImplicitOutputPort connectable=\"0\" dataType=\"UNKNOW_TYPE\" id=\""+str(finalsplit[i]+3)+"\""+" ordering=\"1\" parent=\""+str(finalsplit[i])+"\""+" style=\"ImplicitOutputPort\">\n\t\t<mxGeometry as=\"geometry\" height=\"10\" relative=\"1\" width=\"10\" y=\"0.5000\">\n\t\t</mxGeometry>\n\t    </ImplicitOutputPort>\n"+line

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
            with open(temp_file_xml_name, 'r+') as f:
                data = f.read().splitlines()
                replace = list3
                for i in replace:
                    data[i] = '\t    </ImplicitLink>'
                f.seek(0)
                f.write('\n'.join(data))
                f.truncate()
            diagram.xcos_file_name = join(session['sessiondir'], UPLOAD_FOLDER, splitext(temp_file_xml_name)[0] + ".xcos")
            os.rename(temp_file_xml_name, diagram.xcos_file_name)
            save_diagram()
            return diagram.diagram_id


        # List to contain all affich blocks
        blockaffich = new_xml.getElementsByTagName("AfficheBlock")
        for block in blockaffich:
            if block.getAttribute("interfaceFunctionName") == "AFFICH_m":
                diagram.workspace_counter = 4

        # List to contain all the block IDs of tkscales so that we can create read blocks with these IDs
        block_id = []
        for block in blocks:
            if block.getAttribute("interfaceFunctionName") == "TKSCALE":
                block_id.append(block.getAttribute("id"))
                block.setAttribute('id', '-1')
                tk_is_present = True
                # Changed the ID of tkscales to -1 so that virtually the tkscale blocks get disconnected from diagram at the backend
            # Taking workspace_counter 1 for TOWS_c and 2 for FROMWSB
            if block.getAttribute("interfaceFunctionName")== "scifunc_block_m":
                diagram.workspace_counter = 5
            if block.getAttribute("interfaceFunctionName")== "TOWS_c":
                diagram.workspace_counter = 1
                flag1=1
            if block.getAttribute("interfaceFunctionName")== "FROMWSB":
                diagram.workspace_counter = 2
                flag2=1
        if (flag1 and flag2):
            # Both TOWS_c and FROMWSB are present
            diagram.workspace_counter = 3
        # Hardcoded the real time scaling to 1.0 (i.e., no scaling of time occurs) only if tkscale is present
        if tk_is_present:
            for dia in new_xml.getElementsByTagName("XcosDiagram"):
                dia.setAttribute('realTimeScaling', '1.0')


        # Save the changes made by parser
        with open(temp_file_xml_name, 'w') as f:
            f.write(new_xml.toxml())


        # In front of block tkscale printing the block corresponding to read function and assigning corresponding values
        for line in fileinput.input(temp_file_xml_name, inplace=1):

            if 'interfaceFunctionName=\"TKSCALE\"' in line:
                # change the block ID
                print('<BasicBlock blockType="d" id="', block_id[diagram.tk_count], '" interfaceFunctionName="RFILE_f" parent="1" simulationFunctionName="readf" simulationFunctionType="DEFAULT" style="RFILE_f">', sep='')
                print("<ScilabString as=\"exprs\" height=\"5\" width=\"1\">")
                print("<data column=\"0\" line=\"0\" value=\"1\"/>")
                # Value equal to 1 implies take readings from first column in the file
                print("<data column=\"0\" line=\"1\" value=\"2\"/>")
                # Path to the file from which read block obtains the values
                print('<data column="0" line="2" value="', join(diagram.sessiondir, VALUES_FOLDER, diagram.diagram_id), '_tk', diagram.tk_count + 1, '.txt', '"/>', sep='')
                print("<data column=\"0\" line=\"3\" value=\"(2(e10.3,1x))\"/>")
                # (2(e10.3,1x)) The format in which numbers are written
                # Two columns with base 10 and 3 digits after decimal and 1x represents 1 unit space between two columns.
                print("<data column=\"0\" line=\"4\" value=\"2\"/>")
                print("</ScilabString>")
                print("<ScilabDouble as=\"realParameters\" height=\"0\" width=\"0\"/>")
                print("<ScilabDouble as=\"integerParameters\" height=\"105\" width=\"1\">")
                diagram.tk_count += 1
                # The remaining part of the block is read from the Read_Content.txt file and written to the xml file
                with open(READCONTENTFILE, "r") as read_file:
                    for line_content in read_file:
                        print(line_content, end= '')
            print(line, end = '')

        # To resolve port issue coming in xcos file for following blocks : INTMUL,MATBKSL,MATDET,MATDIAG,MATDIV and CURV_F
        # ISSUE is missing of dataColumns and dataLines in port tag
        block_idint=[]
        block_idmatblsk=[]
        block_det=[]
        block_diag=[]
        block_div=[]
        block_curl=[]
        for block in blocks:
            if block.getAttribute("style") == "INTMUL": # to find INTMUL in blocks and extract its block id and save in block_idint
                block_idint.append(int(block.getAttribute("id")))
            if block.getAttribute("style") == "MATBKSL": # to find MATBKSL in blocks and extract its block id and save in block_idmatblsk
                block_idmatblsk.append(int(block.getAttribute("id")))
            if block.getAttribute("style") == "MATDET": # to find MATDET in blocks and extract its block id and save in block_det
                block_det.append(int(block.getAttribute("id")))
            if block.getAttribute("style") == "MATDIAG": # to find MATDIAG in blocks and extract its block id and save in block_diag
                block_diag.append(int(block.getAttribute("id")))
            if block.getAttribute("style") == "MATDIV": # to find MATDIV in blocks and extract its block id and save in block_div
                block_div.append(int(block.getAttribute("id")))
            if block.getAttribute("style") == "CURV_f": # to find CURV_f in blocks and extract its block id and save in block_curl
                block_curl.append(int(block.getAttribute("id")))
        if len(block_idint)>=1:
            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():

                    if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word: # check for existance of "ExplicitInputPort" in line
                        temp_word=""
                        for i in range(len(block_idint)):
                            if "ordering=\"2\" parent=\""+str(block_idint[i])+"\"" in word: # if ordering= 2 and parent id= INTMUL block id
                                temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\"","<ExplicitInputPort dataColumns=\"-3\" dataLines=\"-2\" dataType=\"REAL_MATRIX\"") # replace work and add datacolumns and datalines
                                i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():
                    if "<ExplicitOutputPort dataType=\"REAL_MATRIX\"" in word: # check for existance of "ExplicitOutputPort" in line
                        temp_word=""
                        for i in range(len(block_idint)):
                            if "parent=\""+str(block_idint[i])+"\"" in word: # if parent id= INTMUL block id
                                temp_word=word.replace("<ExplicitOutputPort dataType=\"REAL_MATRIX\"","<ExplicitOutputPort dataColumns=\"-3\" dataType=\"REAL_MATRIX\"")  # replace work and add datacolumns and datalines
                                i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        if len(block_idmatblsk)>=1:
            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():

                    if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word:
                        temp_word=""
                        for i in range(len(block_idmatblsk)):
                            if  "ordering=\"2\" parent=\""+str(block_idmatblsk[i])+"\"" in word:
                                temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\"","<ExplicitInputPort dataColumns=\"-3\" dataType=\"REAL_MATRIX\"")
                                i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():

                    if "<ExplicitOutputPort dataType=\"REAL_MATRIX\"" in word:
                        temp_word=""
                        for i in range(len(block_idmatblsk)):
                            if "parent=\""+str(block_idmatblsk[i])+"\"" in word:
                                    temp_word=word.replace("<ExplicitOutputPort dataType=\"REAL_MATRIX\"","<ExplicitOutputPort dataColumns=\"-3\" dataLines=\"-2\" dataType=\"REAL_MATRIX\"")
                                    i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        if len(block_det)>=1:
            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():

                    if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word:
                        temp_word=""
                        for i in range(len(block_det)):
                            if "ordering=\"2\" parent =\""+str(block_det[i])+"\"" in word:
                                temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\"","<ExplicitInputPort dataColumns=\"-1\" dataType=\"REAL_MATRIX\"")
                                i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():

                    if "<ExplicitOutputPort dataType=\"REAL_MATRIX\"" in word:
                        temp_word=""
                        for i in range(len(block_det)):
                            if "parent=\""+str(block_det[i])+"\"" in word:
                                temp_word=word.replace("<ExplicitOutputPort dataType=\"REAL_MATRIX\"","<ExplicitOutputPort dataColumns=\"1\" dataLines=\"1\" dataType=\"REAL_MATRIX\"")
                                i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        if len(block_curl)>=1:
            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():

                    if "<ExplicitOutputPort dataType=\"REAL_MATRIX\"" in word:
                        temp_word=""
                        for i in range(len(block_curl)):
                            if "parent=\""+str(block_curl[i])+"\"" in word:
                                temp_word=word.replace("<ExplicitOutputPort dataType=\"REAL_MATRIX\"","<ExplicitOutputPort dataColumns=\"1\" dataLines=\"1\" dataType=\"REAL_MATRIX\"")
                                i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        if len(block_diag)>=1:
            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():

                    if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word:
                        temp_word=""
                        for i in range(len(block_diag)):
                            if "ordering=\"2\" parent=\""+str(block_diag[i])+"\"" in word:
                                    temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\"","<ExplicitInputPort dataColumns=\"1\" dataType=\"REAL_MATRIX\"")
                                    i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():

                    if "<ExplicitOutputPort dataType=\"REAL_MATRIX\"" in word:
                        temp_word=""
                        for i in range(len(block_diag)):
                            if "parent=\""+str(block_diag[i])+"\"" in word:
                                temp_word=word.replace("<ExplicitOutputPort dataType=\"REAL_MATRIX\"","<ExplicitOutputPort dataColumns=\"-1\" dataType=\"REAL_MATRIX\"")
                                i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        if len(block_div)>=1:
            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():

                    if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word:
                        temp_word=""
                        for i in range(len(block_div)):
                            if "ordering=\"1\" parent=\""+str(block_div[i])+"\"" in word:
                                temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\"","<ExplicitInputPort dataColumns=\"-3\" dataType=\"REAL_MATRIX\"")
                                i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
            with open(temp_file_xml_name, "r") as f:
                newline=[]
                i=0
                for word in f.readlines():

                    if "<ExplicitInputPort dataType=\"REAL_MATRIX\"" in word:
                        temp_word=""
                        for i in range(len(block_div)):
                            if "ordering=\"2\" parent=\""+str(block_div[i])+"\"" in word:
                                temp_word=word.replace("<ExplicitInputPort dataType=\"REAL_MATRIX\"","<ExplicitInputPort dataColumns=\"-3\" dataLines=\"-2\" dataType=\"REAL_MATRIX\"")
                                i=i+1
                        if temp_word!="":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        # Changing the file extension from xml to xcos
        diagram.xcos_file_name = join(session['sessiondir'], UPLOAD_FOLDER, splitext(temp_file_xml_name)[0] + ".xcos")
        # Move the xcos file to uploads directory
        os.rename(temp_file_xml_name, diagram.xcos_file_name)
        save_diagram()
        return diagram.diagram_id
    else:
        return "error"

@app.route('/filenames.php', methods=['POST'])
def filenames():
    url = request.form['url']
    if url == '' or '.' in url or url[0] != '/' or url[-1] != '/':
        return "error"
    filelist = [url + f for f in os.listdir(BASEDIR + url)]
    return Response(json.dumps(filelist), mimetype='application/json')

@app.route('/UpdateTKfile', methods=['POST'])
def UpdateTKfile():
    (diagram, __) = get_diagram(get_request_id())
    if diagram is None:
        print('no diagram')
        return "error"

    # function which makes the initialazation and updation of the files with obtained new value
    # Get the file
    file = request.files['file']

    # Check if the file is not null
    if not file:
        return "error"

    # saves the file in values folder
    line = file.read().decode()
    createruntime = line == "Start"
    runtime = get_runtime(diagram.uid, create=createruntime)
    if runtime is None:
        return ""

    if line == "Start":
        # at first the val.txt contains "Start" indicating the starting of the process
        runtime.tkbool = True
        runtime.tk_starttime = time()
        runtime.tk_deltatimes = [ ]
        runtime.tk_values = [ ]
        runtime.tk_times = [ ]
        for i in range(diagram.tk_count):
            runtime.tk_deltatimes.append(0.1)
            runtime.tk_values.append(0)
            runtime.tk_times.append(0)
            open(join(diagram.sessiondir, VALUES_FOLDER, diagram.diagram_id+"_tk"+str(i+1)+".txt"), "w").close();
            # create empty tk text files
        # starts the thread
        Timer(0.1, getDetailsThread, [diagram]).start()
    elif line == "Stop":
        # at last the val.txt contains "Stop" indicating the ending process
        # stops the thread
        stopDetailsThread(diagram, runtime)
    else:
        tklist = line.split(',')

        for i in range(min(diagram.tk_count, len(tklist))):
            tl = tklist[i].split('  ')
            if len(tl) == 1 or tl[1] == '':
                continue
            runtime.tk_deltatimes[i] = float(tl[0])
            runtime.tk_values[i] = float(tl[1])
    return ""


# route for download of binary and audio
@app.route('/downloadfile', methods=['POST'])
def DownloadFile():
    fn = request.form['path']
    if fn == '' or fn[0] == '.' or '/' in fn:
        print('downloadfile=', fn)
        return "error"
    #check if audio file or binary file
    if "audio" in fn:
        mimetype = 'audio/basic'
    else:
        mimetype = 'application/octet-stream'
    return flask.send_from_directory(SESSIONDIR, fn, as_attachment=True, mimetype=mimetype)


# route for deletion of binary and audio file
@app.route('/deletefile', methods=['POST'])
def DeleteFile():
    fn = request.form['path']
    if fn == '' or fn[0] == '.' or '/' in fn:
        print('deletefile=', fn)
        return "error"
    remove(fn) #deleting the file
    return "0"


@app.route('/SendLog')
def sse_request():
    # Set response method to event-stream
    return Response(event_stream(), mimetype='text/event-stream')


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
    (diagram, __) = get_diagram(get_request_id())
    if diagram is None:
        print('no diagram')
        return
    runtime = get_runtime(diagram.uid)

    runtime.figure_list.remove(fig_id)
    return "done"


@app.route('/')
def page():
    return app.send_static_file('index.html')

@app.route('/getOutput', methods=['POST'])
def run_scilab_func_request():
    (diagram, __) = get_diagram(get_request_id())
    if diagram is None:
        print('no diagram')
        return
    runtime = get_runtime(diagram.uid, True)

    num =request.form['num']
    den =request.form['den']
    alpha="A,B,C,D";

    if 'z' in num or 'z' in den:
        command = "z=poly(0,'z');exec('" + CONT_FRM_WRITE +"');calculate_cont_frm("+num+","+den+");"

    else:
        command = "s=poly(0,'s');exec('" + CONT_FRM_WRITE +"');calculate_cont_frm("+num+","+den+");"

    try:
        runtime.scilab_proc = run_scilab(command)
    except FileNotFoundError:
        return "scilab not found. Follow the installation instructions"

    scilab_out, scilab_err = runtime.scilab_proc.communicate()

    file_name="cont_frm_value.txt";
    with open(file_name) as f:
        data = f.read() # Read the data into a variable
        file_rows = data.strip().split(' ') # Split the file rows into seperate elements of a list
        list_value="[["
        for i in range(len(file_rows)):
            value=file_rows[i]
            if(i==(len(file_rows)-1)):
                list_value=list_value+value+"]]"
            else:
                list_value=list_value+value+"],["

    return list_value


################### example page start ###################

@app.route('/example')
def example_page():
    try:
        cur = connection()
        cur.execute(config.QUERY_CATEGORY)
        data = cur.fetchall()
        return render_template('example.html', data=data)
    except Exception as e:
        return str(e)

@app.route('/get_book', methods=['GET', 'POST'])
def ajax_get_book():
    cat_id = request.args.get('catid')
    try:
        cur = connection()
        cur.execute(config.QUERY_BOOK, [cat_id])
        data = cur.fetchall()
        return jsonify(data)
    except Exception as e:
        return str(e)

@app.route('/get_chapter', methods=['GET', 'POST'])
def ajax_get_chapter():
    book_id = request.args.get('bookid')
    try:
        cur = connection()
        cur.execute(config.QUERY_CHAPTER, [book_id])
        chapter = cur.fetchall()
        return jsonify(chapter)
    except Exception as e:
        return str(e)

@app.route('/get_example', methods=['GET', 'POST'])
def ajax_get_example():
    chapter_id = request.args.get('chapterid')
    try:
        cur = connection()
        cur.execute(config.QUERY_EXAMPLE, [chapter_id])
        example = cur.fetchall()
        return jsonify(example)
    except Exception as e:
        return str(e)

@app.route('/get_example_file', methods=['GET', 'POST'])
def ajax_get_example_file():
    example_id = request.args.get('exampleid')
    try:
        cur = connection()
        cur.execute(config.QUERY_EXAMPLE_FILE, [example_id])
        example_file = cur.fetchall()
        return jsonify(example_file)
    except Exception as e:
        return str(e)

def get_example_file(example_file_id):
    filename = 'example.xcos'
    cur = connection()
    cur.execute(config.QUERY_EXAMPLE_FILE_BY_ID, [example_file_id])
    example_file = cur.fetchall()
    for ef in example_file:
        filename = ef[0]

    scilab_url = "https://scilab.in/download/file/" + example_file_id
    r = requests.get(scilab_url)
    return (r.text, basename(filename))

@app.route('/example_file', methods=[ 'GET', 'POST' ])
def download_example_file():
    example_file_id = request.args.get('efid')
    (example_content, filename) = get_example_file(example_file_id)
    return Response(example_content, mimetype='application/octet-stream', headers={
        'Content-Disposition' : 'attachment; filename="' + filename + '"'
        })

@app.route('/open', methods=[ 'GET', 'POST' ])
def open_example_file():
    example_file_id = request.args.get('efid')
    (example_content, filename) = get_example_file(example_file_id)
    return render_template('index.html', example_content=example_content, filename=filename)

################### example page end     #################


if __name__ == '__main__':
    print('starting')
    os.chdir(SESSIONDIR)
    # Set server address from config
    http_server = WSGIServer((config.HTTP_SERVER_HOST, config.HTTP_SERVER_PORT), app)
    try:
        http_server.serve_forever()
    except KeyboardInterrupt:
        print('exiting')

