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
from os.path import abspath, basename, dirname, exists, isfile, join, splitext
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
from config import FLASKSESSIONDIR, SESSIONDIR, XCOSSOURCEDIR


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
    except BaseException:
        print("could not remove", filename)
        return False


# change directory before using relative paths
os.chdir(dirname(abspath(__file__)))

makedirs(FLASKSESSIONDIR, 'top flask session')
makedirs(SESSIONDIR, 'top session')

app = flask.Flask(__name__, static_folder='webapp/', template_folder='webapp')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = FLASKSESSIONDIR
# These are the extension that we are accepting to be uploaded
app.config['ALLOWED_EXTENSIONS'] = set(['zcos', 'xcos', 'txt'])
flask_session.Session(app)

# This is the path to the upload directory and values directory
UPLOAD_FOLDER = 'uploads'  # to store xcos file
VALUES_FOLDER = 'values'  # to store files related to tkscale block
# to store uploaded sci files for sci-func block
SCRIPT_FILES_FOLDER = 'script_files'
# to store uploaded sci files for sci-func block
SCIFUNC_FILES_FOLDER = 'scifunc_files'

# Delay time to look for new line (in s)
LOOK_DELAY = 0.1
# States of the line
# to indicate initialization of block in log file is encountered
INITIALIZATION = 0
# to indicate ending of log file data for that block is encountered
ENDING = 1
# to indicate data is proper and can be read
DATA = 2
# to indicate there is no line in log file further
NOLINE = -1
# to indicate block id is present
BLOCK_IDENTIFICATION = -2

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
SCILAB_START = (
    "errcatch(-1,'stop');lines(0,120);clearfun('messagebox');"
    "function messagebox(msg,msgboxTitle,msgboxIcon,buttons,isModal),"
    "disp(msg),endfunction;loadXcosLibs();")
SCILAB_END = "mode(2);quit();"

USER_DATA = {}


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
        return (
            "{ 'scilab_pid': %s, "
            "'log_name': %s, 'tkbool': %s, 'figure_list': %s }") % (
                self.scilab_proc.pid if self.scilab_proc is not None else None,
                self.log_name, self.tkbool, self.figure_list)


class Script:
    script_id = None
    sessiondir = None
    filename = None
    status = 0
    proc = None
    workspace_filename = None

    def __str__(self):
        return (
            "{ script_id: %s, filename: %s, status: %d, "
            "script_pid: %s, "
            "workspace_filename: %s }") % (
                self.script_id, self.filename, self.status,
                self.proc.pid if self.proc is not None else None,
                self.workspace_filename)


class SciFile:
    '''Variables used in sci-func block'''
    filename = ''
    file_image = ''
    flag_sci = False


class UserData:
    sessiondir = None
    diagrams = None
    scripts = None
    scifile = None
    diagramlock = None

    def __init__(self):
        self.sessiondir = mkdtemp(
            prefix=datetime.now().strftime('%Y%m%d.'), dir=SESSIONDIR)
        self.diagrams = []
        self.scripts = []
        self.scifile = SciFile()
        self.diagramlock = RLock()


class line_and_state:
    '''
    Class to store the line and its state (Used in reading data from log file)
    '''
    line = None  # initial line to none(Nothing is present)
    state = NOLINE  # initial state to NOLINE ie

    def __init__(self, line, state):
        self.line = line
        self.state = state

    def set(self, line_state):
        self.line = line_state[0]  # to set line
        self.state = line_state[1]  # to set state
        return False

    def get_line(self):
        return self.line

    def get_state(self):
        return self.state


def init_session():
    if 'uid' not in session:
        session['uid'] = str(uuid.uuid1())

    uid = session['uid']

    if uid not in USER_DATA:
        USER_DATA[uid] = UserData()

    ud = USER_DATA[uid]

    sessiondir = ud.sessiondir

    makedirs(sessiondir, 'session')
    makedirs(join(sessiondir, UPLOAD_FOLDER), 'upload')
    makedirs(join(sessiondir, VALUES_FOLDER), 'values')
    makedirs(join(sessiondir, SCRIPT_FILES_FOLDER), 'script files')
    makedirs(join(sessiondir, SCIFUNC_FILES_FOLDER), 'scifunc files')

    return (ud.diagrams, ud.scripts, ud.scifile, sessiondir, ud.diagramlock)


def get_diagram(xcos_file_id, remove=False):
    if len(xcos_file_id) == 0:
        print("no id")
        return (None, None)
    xcos_file_id = int(xcos_file_id)

    (diagrams, __, scifile, __, __) = init_session()

    if xcos_file_id < 0 or xcos_file_id >= len(diagrams):
        print("id", xcos_file_id, "not in diagrams")
        return (None, None)

    diagram = diagrams[xcos_file_id]

    if remove:
        diagrams[xcos_file_id] = Diagram()

    return (diagram, scifile)


def add_diagram():
    (diagrams, scripts, scifile, sessiondir, diagramlock) = init_session()

    diagramlock.acquire()
    diagram = Diagram()
    diagram.diagram_id = str(len(diagrams))
    diagram.sessiondir = sessiondir
    diagrams.append(diagram)
    diagramlock.release()

    return (diagram, scripts, scifile, sessiondir)


def parse_line(line):
    '''
    Function to parse the line
    Returns tuple of figure ID and state
    state = INITIALIZATION if new figure is created
            ENDING if current fig end
            DATA otherwise
    '''
    line_words = line.split(' ')  # Each line is split to read condition
    # The below condition determines the block ID
    if line_words[2] == "Block":
        # to get block id (Which is explicitly added by us while writing into
        # log in scilab source code)
        block_id = int(line_words[4])
        return (block_id, BLOCK_IDENTIFICATION)
    if line_words[2] == "Initialization":
        # New figure created
        # Get fig id
        # to extract figure ids (sometime multiple sinks can be used in one
        # diagram to differentiate that)
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


def get_line_and_state(file, figure_list):
    '''
    Function to get a new line from file
    This also parses the line and appends new figures to figure List
    '''
    line = file.readline()  # read line by line from log
    if not line:            # if line is empty then return noline
        return (None, NOLINE)
    # every line is passed to function parse_line for getting values
    parse_result = parse_line(line)
    figure_id = parse_result[0]
    state = parse_result[1]
    if state == INITIALIZATION:
        # New figure created
        # Add figure ID to list
        figure_list.append(figure_id)  # figure id of block is added to list
        return (None, INITIALIZATION)
    # Check for block identification
    elif state == BLOCK_IDENTIFICATION:
        return (line, BLOCK_IDENTIFICATION)
    elif state == ENDING:
        # End of figure
        # Remove figure ID from list
        # Once ending of log file/data is encountered for that block, figure id
        # will be removed
        figure_list.remove(figure_id)
        return (None, ENDING)
    return (line, DATA)


logfilefdrlock = RLock()
LOGFILEFD = 123


def run_scilab(command, createlogfile=False):
    cmd = SCILAB_START + command + SCILAB_END
    print('running command', cmd)
    cmdarray = [SCI,
                "-nogui",
                "-noatomsautoload",
                "-nouserstartup",
                "-nb",
                "-nw",
                "-e", cmd]
    if not createlogfile:
        return subprocess.Popen(
            cmdarray,
            stdin=subprocess.PIPE, stdout=subprocess.PIPE,
            stderr=subprocess.PIPE, start_new_session=True,
            universal_newlines=True)

    logfilefd, log_name = mkstemp(prefix=datetime.now().strftime(
        'scilab-log-%Y%m%d-'), suffix='.txt', dir=SESSIONDIR)

    logfilefdrlock.acquire()
    if logfilefd != LOGFILEFD:
        os.dup2(logfilefd, LOGFILEFD)
        os.close(logfilefd)
    proc = subprocess.Popen(
        cmdarray,
        stdin=subprocess.PIPE, stdout=subprocess.PIPE,
        stderr=subprocess.PIPE, start_new_session=True,
        universal_newlines=True, pass_fds=(LOGFILEFD, ))
    os.close(LOGFILEFD)
    logfilefdrlock.release()

    return (proc, log_name)


SYSTEM_COMMANDS = re.compile(config.SYSTEM_COMMANDS)


def is_unsafe_script(filename):
    '''
    Read file and check for system commands and return error if file contains
    system commands
    '''
    with open(filename, 'r') as f:
        if not re.search(SYSTEM_COMMANDS, f.read()):
            return False

    # Delete saved file if system commands are encountered in that file
    remove(filename)
    msg = ("System calls are not allowed in script file!\n"
           "Please upload another script file!!")
    return msg


@app.route('/uploadscript', methods=['POST'])
def uploadscript():
    '''
    Below route is called for uploading script file.
    '''
    (__, scripts, __, sessiondir, diagramlock) = init_session()

    file = request.files['file']
    if not file:
        msg = "Upload Error"
        return msg

    diagramlock.acquire()
    script = Script()
    script.script_id = str(len(scripts))
    script.sessiondir = sessiondir
    scripts.append(script)
    diagramlock.release()

    fname = join(sessiondir, SCRIPT_FILES_FOLDER,
                 script.script_id + '_script.sce')
    file.save(fname)
    script.filename = fname

    if is_unsafe_script(fname):
        msg = ("System calls are not allowed in script.\n"
               "Please edit the script again.")
        script.status = -1
        return msg

    wfname = join(sessiondir, SCRIPT_FILES_FOLDER,
                  script.script_id + '_script_workspace.dat')
    script.workspace_filename = wfname
    command = "exec('" + fname + "');save('" + wfname + "');"

    try:
        proc = run_scilab(command)
    except FileNotFoundError:
        msg = "scilab not found. Follow the installation instructions"
        script.status = -2
        return msg
    script.proc = proc

    try:
        # output from scilab terminal is saved for checking error msg
        out = proc.communicate(timeout=30)[0]

        # if error is encountered while execution of script file, then error
        # message is returned to the user
        if '!--error' in out:
            error_index = out.index('!')
            msg = out[error_index:-9]
            script.status = -3
            return msg

        print('workspace for', script.script_id, 'saved in', wfname)
        script.status = 0
        return script.script_id
    except subprocess.TimeoutExpired:
        if not kill_scilab_with(proc, signal.SIGTERM):
            kill_scilab_with(proc, signal.SIGKILL)
        msg = 'Timeout'
        script.status = -4
        return msg


@app.route('/uploadsci', methods=['POST'])
def uploadsci():
    '''
    Below route is called for uploading sci file which is required in sci-func
    block (called in Javscript only_scifunc_code.js)
    '''
    (__, __, scifile, sessiondir, __) = init_session()

    file = request.files['file']  # to get uploaded file
    if file and request.method == 'POST':
        ts = datetime.now()
        # file name is created with timestamp
        fname = join(sessiondir, SCIFUNC_FILES_FOLDER,
                     str(ts) + secure_filename(file.filename))
        file.save(fname)  # file is saved in scifunc_files folder
        scifile.filename = fname
        scifile.flag_sci = True  # flag for file saved

        # Read file and check for system commands and return error if file
        # contain system commands
        match = re.findall(SYSTEM_COMMANDS, open(scifile.filename, 'r').read())
        if match:
            msg = ("System calls are not allowed in .sci file!\n"
                   "Please upload another .sci file!!")
            # Delete saved file if system commands are encountered in that file
            remove(scifile.filename)
            # flag for file saved will be set as False
            scifile.flag_sci = False
            return msg

        # scilab command is created to run that uploaded sci file which will be
        # used by sci-func block
        command = "exec('" + scifile.filename + "');"

        try:
            output_com = run_scilab(command)
        except FileNotFoundError:
            return "scilab not found. Follow the installation instructions"

        # output from scilab terminal is saved for checking error msg
        out = output_com.communicate()[0]

        # if error is encountered while execution of sci file, then error msg
        # is returned to user. in case no error is encountered, file uploaded
        # successful msg is sent to user.
        if '!--error' in out:
            error_index = out.index('!')
            msg = out[error_index:-9]
            # Delete saved file if error is encountered while executing sci
            # function in that file
            remove(scifile.filename)
            # flag for file saved will be set as False
            scifile.flag_sci = False
            return msg
        else:
            msg = "File is uploaded successfully!!"
            return msg


@app.route('/requestfilename', methods=['POST'])
def sendfile():
    '''
    This route is used in index.html for checking condition
    if sci file is uploaded for sci-func block diagram imported directly using
    import (will confirm again)
    '''
    (__, __, scifile, __, __) = init_session()

    if scifile.flag_sci:
        scifile.file_image = ('img_test%s.jpg' %
                              splitext(basename(scifile.filename))[0])
    else:
        scifile.file_image = ''
    scifile.flag_sci = False
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


def get_request_id(key='id'):
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
    displayvalue = value if len(
        value) <= DISPLAY_LIMIT + 3 else value[:DISPLAY_LIMIT] + '...'
    print('Invalid value', displayvalue, 'for', key, 'in request.args')
    return ''


def kill_scilab(diagram=None):
    '''Define function to kill scilab(if still running) and remove files'''
    if diagram is None:
        (diagram, __) = get_diagram(get_request_id(), True)

    if diagram is None:
        print('no diagram')
        return
    print('kill_scilab: diagram=', diagram.__dict__)

    if diagram.xcos_file_name is None:
        print('empty diagram')
    else:
        # Remove xcos file
        remove(diagram.xcos_file_name)
        diagram.xcos_file_name = None

    if diagram.scilab_proc is None:
        print('no scilab proc')
    else:
        if not kill_scilab_with(diagram.scilab_proc, signal.SIGTERM):
            kill_scilab_with(diagram.scilab_proc, signal.SIGKILL)
        diagram.scilab_proc = None

    if diagram.log_name is None:
        print('empty diagram')
    else:
        # Remove log file
        remove(diagram.log_name)
        diagram.log_name = None

    stopDetailsThread(diagram)


@app.route('/start_scilab')
def start_scilab():
    '''
    function to execute xcos file using scilab (scilab-adv-cli), access log
    file written by scilab

    This function is called in app route 'start_scilab' below
    '''
    (diagram, scifile) = get_diagram(get_request_id())
    if diagram is None:
        print('no diagram')
        return "error"

    # name of workspace file
    workspace = "workspace.dat"

    # Scilab Commands for running of scilab based on existence of different
    # blocks in same diagram from workpace_counter's value
    #    1: Indicate TOWS_c exist
    #    2: Indicate FROMWSB exist
    #    3: Both TOWS_c and FROMWSB exist
    #    4: Indicate AFFICH_m exist (We dont want graphic window to open so
    #    xs2jpg() command is removed)
    #    5: Indicate Sci-func block as it some time return image as output
    #    rather than Sinks's log file.
    #    0/No-condition : For all other blocks
    if diagram.workspace_counter == 3 and exists(workspace):
        # 3 - for both TOWS_c and FROMWSB and also workspace dat file exist
        # In this case workspace is saved in format of dat file (Scilab way of
        # saying workpsace)
        command = (
            "load('" + workspace + "');"
            "importXcosDiagram('" + diagram.xcos_file_name + "');"
            "xcos_simulate(scs_m,4);"
            "xs2jpg(gcf(),'" + IMAGEDIR + "/img_test.jpg');"
            "deletefile('" + workspace + "');"
            "save('" + workspace + "');")
    elif diagram.workspace_counter == 1 or diagram.workspace_counter == 3:
        # For 1- TOWS_c or 3 - for both TOWS_c and FROMWSB
        command = (
            "importXcosDiagram('" + diagram.xcos_file_name + "');"
            "xcos_simulate(scs_m,4);"
            "xs2jpg(gcf(),'" + IMAGEDIR + "/img_test.jpg');"
            "deletefile('" + workspace + "');"
            "save('" + workspace + "');")
    elif diagram.workspace_counter == 4:
        # For AFFICH-m block
        command = (
            "importXcosDiagram('" + diagram.xcos_file_name + "');"
            "xcos_simulate(scs_m,4);")
    elif diagram.workspace_counter == 2 and exists(workspace):
        # For FROMWSB block and also workspace dat file exist
        command = (
            "load('" + workspace + "');"
            "importXcosDiagram('" + diagram.xcos_file_name + "');"
            "xcos_simulate(scs_m,4);"
            "xs2jpg(gcf(),'" + IMAGEDIR + "/img_test.jpg');"
            "deletefile('" + workspace + "');")
    elif diagram.workspace_counter == 5:
        # For Sci-Func block (Image are return as output in some cases)
        command = (
            "exec('" + scifile.filename + "');"
            "importXcosDiagram('" + diagram.xcos_file_name + "');"
            "xcos_simulate(scs_m,4);"
            "xs2jpg(gcf(),"
            "'" + IMAGEDIR + "/" + scifile.file_image + "');")
        t = Timer(15.0, delete_image, [scifile])
        t.start()
        t1 = Timer(10.0, delete_scifile, [scifile])
        t1.start()
    else:
        # For all other block
        command = (
            "importXcosDiagram('" + diagram.xcos_file_name + "');"
            "xcos_simulate(scs_m,4);"
            "xs2jpg(gcf(),'" + IMAGEDIR + "/img_test.jpg');")

    try:
        diagram.scilab_proc, diagram.log_name = run_scilab(command, True)
    except FileNotFoundError:
        return "scilab not found. Follow the installation instructions"

    print('log_name=', diagram.log_name)

    # Start sending log to chart function for creating chart
    try:
        # For processes taking less than 10 seconds
        scilab_out = diagram.scilab_proc.communicate(timeout=4)[0]
        scilab_out = re.sub(r'^[ !\\-]*\n', r'',
                            scilab_out, flags=re.MULTILINE)
        print("=== Begin output from scilab console ===")
        print(scilab_out, end='')
        print("===== End output from scilab console ===")
        # Check for errors in Scilab
        if "Empty diagram" in scilab_out:
            return "Empty diagram"

        m = re.search(r'Fatal error: exception Failure\("([^"]*)"\)',
                      scilab_out)
        if m:
            msg = 'modelica error: ' + m.group(1)
            return msg

        if ("xcos_simulate: "
                "Error during block parameters update.") in scilab_out:
            return "Error in block parameter. Please check block parameters"

        if "xcosDiagramToScilab:" in scilab_out:
            return "Error in xcos diagram. Please check diagram"

        if "Cannot find scilab-bin" in scilab_out:
            return ("scilab has not been built. "
                    "Follow the installation instructions")

        if os.stat(diagram.log_name).st_size == 0:
            return "log file is empty"

    # For processes taking more than 10 seconds
    except subprocess.TimeoutExpired:
        pass

    return ""


@flask.stream_with_context
def event_stream():
    '''
    Read log file and return data to eventscource function of javascript for
    displaying chart.

    This function is called in app route 'SendLog' below
    '''
    (diagram, __) = get_diagram(get_request_id())

    # Open the log file
    if not isfile(diagram.log_name):
        print("log file does not exist")
        yield "event: ERROR\ndata: no log file found\n\n"
        return
    while os.stat(diagram.log_name).st_size == 0 and \
            diagram.scilab_proc.poll() is None:
        gevent.sleep(LOOK_DELAY)
    if os.stat(diagram.log_name).st_size == 0 and \
            diagram.scilab_proc.poll() is not None:
        print("log file is empty")
        yield "event: ERROR\ndata: log file is empty\n\n"
        return

    with open(diagram.log_name, "r") as log_file:
        # Start sending log
        line = line_and_state(None, NOLINE)
        while line.set(get_line_and_state(log_file, diagram.figure_list)) or \
                len(diagram.figure_list) > 0:
            # Get the line and loop until the state is ENDING and figure_list
            # empty. Determine if we get block id and give it to chart.js
            if line.get_state() == BLOCK_IDENTIFICATION:
                yield "event: block\ndata: " + line.get_line() + "\n\n"
            elif line.get_state() != DATA:
                gevent.sleep(LOOK_DELAY)
            else:
                yield "event: log\ndata: " + line.get_line() + "\n\n"
            # Reset line, so server won't send same line twice
            line = line_and_state(None, NOLINE)

    # Finished Sending Log
    kill_scilab(diagram)

    # Notify Client
    yield "event: DONE\ndata: None\n\n"


def delete_image(scifile):
    if scifile.file_image == '':
        return

    image_path = IMAGEDIR + '/' + scifile.file_image
    remove(image_path)
    scifile.file_image = ''


def delete_scifile(scifile):
    if scifile.filename == '':
        return

    remove(scifile.filename)
    scifile.filename = ''


def AppendtoTKfile(diagram):
    '''function which appends the updated (new) value to the file'''
    starttime = diagram.tk_starttime

    for i in range(diagram.tk_count):
        fname = join(diagram.sessiondir, VALUES_FOLDER,
                     diagram.diagram_id + "_tk" + str(i + 1) + ".txt")

        # append data to the tk.txt
        with open(fname, 'a') as w:
            while time() > starttime + \
                    diagram.tk_times[i] + diagram.tk_deltatimes[i]:
                # update the time
                diagram.tk_times[i] += diagram.tk_deltatimes[i]
                w.write('%10.3E %10.3E\n' %
                        (diagram.tk_times[i], diagram.tk_values[i]))


def getDetailsThread(diagram):
    '''function which makes the initialisation of thread'''
    while diagram.tkbool:
        AppendtoTKfile(diagram)
        gevent.sleep(0.1)


def stopDetailsThread(diagram):
    diagram.tkbool = False  # stops the thread
    gevent.sleep(LOOK_DELAY)
    fname = join(diagram.sessiondir, VALUES_FOLDER,
                 diagram.diagram_id + "_*")
    for fn in glob.glob(fname):
        # deletes all files created under the 'diagram_id' name
        remove(fn)


@app.route('/upload', methods=['POST'])
def upload():
    '''Route that will process the file upload'''
    # Get the file
    file = request.files['file']
    # flags to check if both TOWS_c and FROMWSB are present
    flag1 = 0
    flag2 = 0
    list1 = []
    list2 = []
    # Check if the file is not null
    if file:
        # Make the filename safe, remove unsupported chars
        (diagram, scripts, scifile, sessiondir) = add_diagram()
        # Save the file in xml extension and using it for further modification
        # by using xml parser
        temp_file_xml_name = diagram.diagram_id + ".xml"
        file.save(temp_file_xml_name)
        new_xml = minidom.parse(temp_file_xml_name)

        # to identify if we have to load or save to workspace or neither #0 if
        # neither TOWS_c or FROWSB found
        blocks = new_xml.getElementsByTagName("BasicBlock")
        tk_is_present = False
        pattern = re.compile(r"<SplitBlock")
        for i, line in enumerate(open(temp_file_xml_name)):
            for match in re.finditer(pattern, line):
                list1.append(i + 1)
        pattern1 = re.compile(r"<ControlPort")
        for i, line in enumerate(open(temp_file_xml_name)):
            for match in re.finditer(pattern1, line):
                list2.append(i + 1)
        pattern2 = re.compile(r"<ImplicitInputPort")
        count1 = 0

        for i, line in enumerate(open(temp_file_xml_name)):
            for match in re.finditer(pattern2, line):
                count1 += 1
        if count1 >= 1:
            splitline = []
            count = 0
            for i in range(len(list1)):
                for j in range(len(list2)):
                    if list2[j] == list1[i] + 3:
                        count += 1
                        splitline.append(list1[i])
            blocksplit = new_xml.getElementsByTagName("SplitBlock")
            block_ids = []  # this stores the id of split blocks
            for block in blocksplit:
                if block.getAttribute("style") == "SPLIT_f":
                    block_ids.append(int(block.getAttribute("id")))
            compsplit = []
            for i in range(len(splitline)):
                for j in range(len(list1)):
                    if splitline[i] == list1[j]:
                        compsplit.append(j)

            finalsplit = []
            for i in range(len(compsplit)):
                finalsplit.append(block_ids[compsplit[i]])

            blockcontrol = new_xml.getElementsByTagName("ControlPort")
            for block in blockcontrol:
                for i in range(len(finalsplit)):
                    # match the lines with the parent of our spliblocks which
                    # we need to change
                    if block.getAttribute("parent") == str(finalsplit[i]):
                        block.setAttribute('id', '-1')

            blockcommand = new_xml.getElementsByTagName("CommandPort")
            for block in blockcommand:
                for i in range(len(finalsplit)):
                    if block.getAttribute("parent") == str(finalsplit[i]):
                        block.setAttribute('id', '-1')

            # here we take the ids of command controllink which we will search
            # and change
            finalchangeid = []
            for i in range(len(finalsplit)):
                finalchangeid.append(finalsplit[i] + 4)
                finalchangeid.append(finalsplit[i] + 5)

            # here we save the contents
            with open(temp_file_xml_name, 'w') as f:
                f.write(new_xml.toxml())

            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():

                    if "<CommandControlLink id=" in word:
                        temp_word = ""
                        for i in range(len(finalchangeid)):
                            fcid = str(finalchangeid[i])
                            srch = '<CommandControlLink id="' + fcid + '"'
                            if srch in word:
                                rplc = '<ImplicitLink id="' + fcid + '"'
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
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
            # length=len(finalsplit)
            # return finalsplit
            with open(temp_file_xml_name, "w") as out_file:
                for line in buf:
                    for i in range(len(finalsplit)):
                        fs = str(finalsplit[i])
                        srch = ('<ControlPort connectable="0" '
                                'dataType="UNKNOW_TYPE" id="-1" ordering="1" '
                                'parent="' + fs + '"')
                        if srch in line:
                            line = (
                                '\t    <ImplicitInputPort connectable="0" '
                                'dataType="UNKNOW_TYPE" '
                                'id="' + str(finalsplit[i] + 1) + '" '
                                'ordering="1" parent="' + fs + '" '
                                'style="ImplicitInputPort">\n'
                                '\t\t<mxGeometry as="geometry" height="10" '
                                'relative="1" width="10" y="0.5000">\n'
                                '\t\t</mxGeometry>\n'
                                '\t    </ImplicitInputPort>\n'
                                '\t    <ImplicitOutputPort connectable="0" '
                                'dataType="UNKNOW_TYPE" '
                                'id="' + str(finalsplit[i] + 2) + '" '
                                'ordering="1" parent="' + fs + '" '
                                'style="ImplicitOutputPort">\n'
                                '\t\t<mxGeometry as="geometry" height="10" '
                                'relative="1" width="10" y="0.5000">\n'
                                '\t\t</mxGeometry>\n'
                                '\t    </ImplicitOutputPort>\n'
                                '\t    <ImplicitOutputPort connectable="0" '
                                'dataType="UNKNOW_TYPE" '
                                'id="' + str(finalsplit[i] + 3) + '" '
                                'ordering="1" parent="' + fs + '" '
                                'style="ImplicitOutputPort">\n'
                                '\t\t<mxGeometry as="geometry" height="10" '
                                'relative="1" width="10" y="0.5000">\n'
                                '\t\t</mxGeometry>\n'
                                '\t    </ImplicitOutputPort>\n' + line)

                    out_file.write(line)
            list3 = []
            implitdetect = []
            # return temp_file_xml_name
            for i in range(len(finalsplit)):
                implitdetect.append(finalsplit[i] + 5)
                implitdetect.append(finalsplit[i] + 6)
            for i in range(len(implitdetect)):
                pattern3 = re.compile(
                    "<ImplicitLink id=\"" + str(implitdetect[i]) + "\"")
                for i, line in enumerate(open(temp_file_xml_name)):
                    for match in re.finditer(pattern3, line):
                        list3.append(i - 1)
            with open(temp_file_xml_name, 'r+') as f:
                data = f.read().splitlines()
                replace = list3
                for i in replace:
                    data[i] = '\t    </ImplicitLink>'
                f.seek(0)
                f.write('\n'.join(data))
                f.truncate()
            fname = join(sessiondir, UPLOAD_FOLDER,
                         splitext(temp_file_xml_name)[0] + ".xcos")
            os.rename(temp_file_xml_name, fname)
            diagram.xcos_file_name = fname
            return diagram.diagram_id

        # List to contain all affich blocks
        blockaffich = new_xml.getElementsByTagName("AfficheBlock")
        for block in blockaffich:
            if block.getAttribute("interfaceFunctionName") == "AFFICH_m":
                diagram.workspace_counter = 4

        # List to contain all the block IDs of tkscales so that we can create
        # read blocks with these IDs
        block_id = []
        for block in blocks:
            if block.getAttribute("interfaceFunctionName") == "TKSCALE":
                block_id.append(block.getAttribute("id"))
                block.setAttribute('id', '-1')
                tk_is_present = True
                # Changed the ID of tkscales to -1 so that virtually the
                # tkscale blocks get disconnected from diagram at the backend
            # Taking workspace_counter 1 for TOWS_c and 2 for FROMWSB
            if block.getAttribute(
                    "interfaceFunctionName") == "scifunc_block_m":
                diagram.workspace_counter = 5
            if block.getAttribute("interfaceFunctionName") == "TOWS_c":
                diagram.workspace_counter = 1
                flag1 = 1
            if block.getAttribute("interfaceFunctionName") == "FROMWSB":
                diagram.workspace_counter = 2
                flag2 = 1
        if flag1 and flag2:
            # Both TOWS_c and FROMWSB are present
            diagram.workspace_counter = 3
        # Hardcoded the real time scaling to 1.0 (i.e., no scaling of time
        # occurs) only if tkscale is present
        if tk_is_present:
            for dia in new_xml.getElementsByTagName("XcosDiagram"):
                dia.setAttribute('realTimeScaling', '1.0')

        # Save the changes made by parser
        with open(temp_file_xml_name, 'w') as f:
            f.write(new_xml.toxml())

        # In front of block tkscale printing the block corresponding to read
        # function and assigning corresponding values
        for line in fileinput.input(temp_file_xml_name, inplace=1):

            if 'interfaceFunctionName=\"TKSCALE\"' in line:
                # change the block ID
                i = diagram.tk_count
                print('<BasicBlock blockType="d" id="', block_id[i], '" '
                      'interfaceFunctionName="RFILE_f" parent="1" '
                      'simulationFunctionName="readf" '
                      'simulationFunctionType="DEFAULT" style="RFILE_f">',
                      sep='')
                print('<ScilabString as="exprs" height="5" width="1">')
                print('<data column="0" line="0" value="1"/>')
                # Value equal to 1 implies take readings from first column in
                # the file
                print('<data column="0" line="1" value="2"/>')
                # Path to the file from which read block obtains the values
                fname = join(diagram.sessiondir, VALUES_FOLDER,
                             diagram.diagram_id + "_tk" + str(i + 1) + ".txt")
                print('<data column="0" line="2" value="', fname, '"/>',
                      sep='')
                print('<data column="0" line="3" value="(2(e10.3,1x))"/>')
                # (2(e10.3,1x)) The format in which numbers are written
                # Two columns with base 10 and 3 digits after decimal and 1x
                # represents 1 unit space between two columns.
                print('<data column="0" line="4" value="2"/>')
                print('</ScilabString>')
                print('<ScilabDouble as="realParameters" '
                      'height="0" width="0"/>')
                print('<ScilabDouble as="integerParameters" '
                      'height="105" width="1">')
                diagram.tk_count += 1
                # The remaining part of the block is read from the
                # Read_Content.txt file and written to the xml file
                with open(READCONTENTFILE, "r") as read_file:
                    for line_content in read_file:
                        print(line_content, end='')
            print(line, end='')

        # To resolve port issue coming in xcos file for following blocks :
        # INTMUL,MATBKSL,MATDET,MATDIAG,MATDIV and CURV_F
        # ISSUE is missing of dataColumns and dataLines in port tag
        block_idint = []
        block_idmatblsk = []
        block_det = []
        block_diag = []
        block_div = []
        block_curl = []
        for block in blocks:
            # to find INTMUL in blocks and extract its block id and save in
            # block_idint
            if block.getAttribute("style") == "INTMUL":
                block_idint.append(int(block.getAttribute("id")))
            # to find MATBKSL in blocks and extract its block id and save in
            # block_idmatblsk
            if block.getAttribute("style") == "MATBKSL":
                block_idmatblsk.append(int(block.getAttribute("id")))
            # to find MATDET in blocks and extract its block id and save in
            # block_det
            if block.getAttribute("style") == "MATDET":
                block_det.append(int(block.getAttribute("id")))
            # to find MATDIAG in blocks and extract its block id and save in
            # block_diag
            if block.getAttribute("style") == "MATDIAG":
                block_diag.append(int(block.getAttribute("id")))
            # to find MATDIV in blocks and extract its block id and save in
            # block_div
            if block.getAttribute("style") == "MATDIV":
                block_div.append(int(block.getAttribute("id")))
            # to find CURV_f in blocks and extract its block id and save in
            # block_curl
            if block.getAttribute("style") == "CURV_f":
                block_curl.append(int(block.getAttribute("id")))
        if len(block_idint) >= 1:
            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():
                    # check for existance of "ExplicitInputPort" in line
                    srch = '<ExplicitInputPort dataType="REAL_MATRIX"'
                    if srch in word:
                        rplc = ('<ExplicitInputPort dataColumns="-3" '
                                'dataLines="-2" dataType="REAL_MATRIX"')
                        temp_word = ""
                        for i in range(len(block_idint)):
                            # if ordering= 2 and parent id= INTMUL block id
                            srch2 = (
                                'ordering="2" '
                                'parent="' + str(block_idint[i]) + '"')
                            if srch2 in word:
                                # replace word and add datacolumns and
                                # datalines
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():
                    # check for existance of "ExplicitOutputPort" in line
                    srch = '<ExplicitOutputPort dataType="REAL_MATRIX"'
                    if srch in word:
                        rplc = ('<ExplicitOutputPort dataColumns="-3" '
                                'dataType="REAL_MATRIX"')
                        temp_word = ""
                        for i in range(len(block_idint)):
                            # if parent id= INTMUL block id
                            srch2 = 'parent="' + str(block_idint[i]) + '"'
                            if srch2 in word:
                                # replace word and add datacolumns and
                                # datalines
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        if len(block_idmatblsk) >= 1:
            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():
                    srch = '<ExplicitInputPort dataType="REAL_MATRIX"'
                    if srch in word:
                        rplc = ('<ExplicitInputPort dataColumns="-3" '
                                'dataType="REAL_MATRIX"')
                        temp_word = ""
                        for i in range(len(block_idmatblsk)):
                            srch2 = (
                                'ordering="2" '
                                'parent="' + str(block_idmatblsk[i]) + '"')
                            if srch2 in word:
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():
                    srch = '<ExplicitOutputPort dataType="REAL_MATRIX"'
                    if srch in word:
                        rplc = ('<ExplicitOutputPort dataColumns="-3" '
                                'dataLines="-2" dataType="REAL_MATRIX"')
                        temp_word = ""
                        for i in range(len(block_idmatblsk)):
                            srch2 = 'parent="' + str(block_idmatblsk[i]) + '"'
                            if srch2 in word:
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        if len(block_det) >= 1:
            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():
                    srch = '<ExplicitInputPort dataType="REAL_MATRIX"'
                    if srch in word:
                        rplc = ('<ExplicitInputPort dataColumns="-1" '
                                'dataType="REAL_MATRIX"')
                        temp_word = ""
                        for i in range(len(block_det)):
                            srch2 = (
                                'ordering="2" '
                                'parent="' + str(block_det[i]) + '"')
                            if srch2 in word:
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():
                    srch = '<ExplicitOutputPort dataType="REAL_MATRIX"'
                    if srch in word:
                        rplc = ('<ExplicitOutputPort dataColumns="1" '
                                'dataLines="1" dataType="REAL_MATRIX"')
                        temp_word = ""
                        for i in range(len(block_det)):
                            srch2 = 'parent="' + str(block_det[i]) + '"'
                            if srch2 in word:
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        if len(block_curl) >= 1:
            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():
                    srch = '<ExplicitOutputPort dataType="REAL_MATRIX"'
                    if srch in word:
                        rplc = ('<ExplicitOutputPort dataColumns="1" '
                                'dataLines="1" dataType="REAL_MATRIX"')
                        temp_word = ""
                        for i in range(len(block_curl)):
                            srch2 = 'parent="' + str(block_curl[i]) + '"'
                            if srch2 in word:
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        if len(block_diag) >= 1:
            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():
                    srch = '<ExplicitInputPort dataType="REAL_MATRIX"'
                    if srch in word:
                        rplc = ('<ExplicitInputPort dataColumns="1" '
                                'dataType="REAL_MATRIX"')
                        temp_word = ""
                        for i in range(len(block_diag)):
                            srch2 = (
                                'ordering="2" '
                                'parent="' + str(block_diag[i]) + '"')
                            if srch2 in word:
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():
                    srch = '<ExplicitOutputPort dataType="REAL_MATRIX"'
                    if srch in word:
                        rplc = ('<ExplicitOutputPort dataColumns="-1" '
                                'dataType="REAL_MATRIX"')
                        temp_word = ""
                        for i in range(len(block_diag)):
                            srch2 = 'parent="' + str(block_diag[i]) + '"'
                            if srch2 in word:
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        if len(block_div) >= 1:
            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():
                    srch = '<ExplicitInputPort dataType="REAL_MATRIX"'
                    if srch in word:
                        rplc = ('<ExplicitInputPort dataColumns="-3" '
                                'dataType="REAL_MATRIX"')
                        temp_word = ""
                        for i in range(len(block_div)):
                            srch2 = (
                                'ordering="1" '
                                'parent="' + str(block_div[i]) + '"')
                            if srch2 in word:
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
            with open(temp_file_xml_name, "r") as f:
                newline = []
                i = 0
                for word in f.readlines():
                    srch = '<ExplicitInputPort dataType="REAL_MATRIX"'
                    if srch in word:
                        rplc = ('<ExplicitInputPort dataColumns="-3" '
                                'dataLines="-2" dataType="REAL_MATRIX"')
                        temp_word = ""
                        for i in range(len(block_div)):
                            srch2 = (
                                'ordering="2" '
                                'parent="' + str(block_div[i]) + '"')
                            if srch2 in word:
                                temp_word = word.replace(srch, rplc)
                                i += 1
                        if temp_word != "":
                            newline.append(temp_word)
                        else:
                            newline.append(word)
                    else:
                        newline.append(word)
            with open(temp_file_xml_name, "w") as f:
                for line in newline:
                    f.writelines(line)
        # Changing the file extension from xml to xcos
        fname = join(sessiondir, UPLOAD_FOLDER,
                     splitext(temp_file_xml_name)[0] + ".xcos")
        # Move the xcos file to uploads directory
        os.rename(temp_file_xml_name, fname)
        diagram.xcos_file_name = fname
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

    # function which makes the initialazation and updation of the files with
    # obtained new value
    # Get the file
    file = request.files['file']

    # Check if the file is not null
    if not file:
        return "error"

    # saves the file in values folder
    line = file.read().decode()

    if line == "Start":
        # at first the val.txt contains "Start" indicating the starting of the
        # process
        diagram.tkbool = True
        diagram.tk_starttime = time()
        diagram.tk_deltatimes = []
        diagram.tk_values = []
        diagram.tk_times = []
        for i in range(diagram.tk_count):
            diagram.tk_deltatimes.append(0.1)
            diagram.tk_values.append(0)
            diagram.tk_times.append(0)
            fname = join(diagram.sessiondir, VALUES_FOLDER,
                         diagram.diagram_id + "_tk" + str(i + 1) + ".txt")
            open(fname, "w").close()
            # create empty tk text files
        # starts the thread
        Timer(0.1, getDetailsThread, [diagram]).start()
    elif line == "Stop":
        # at last the val.txt contains "Stop" indicating the ending process
        # stops the thread
        stopDetailsThread(diagram)
    else:
        tklist = line.split(',')

        for i in range(min(diagram.tk_count, len(tklist))):
            tl = tklist[i].split('  ')
            if len(tl) == 1 or tl[1] == '':
                continue
            diagram.tk_deltatimes[i] = float(tl[0])
            diagram.tk_values[i] = float(tl[1])
    return ""


@app.route('/downloadfile', methods=['POST'])
def DownloadFile():
    '''route for download of binary and audio'''
    fn = request.form['path']
    if fn == '' or fn[0] == '.' or '/' in fn:
        print('downloadfile=', fn)
        return "error"
    # check if audio file or binary file
    if "audio" in fn:
        mimetype = 'audio/basic'
    else:
        mimetype = 'application/octet-stream'
    return flask.send_from_directory(
        SESSIONDIR, fn, as_attachment=True, mimetype=mimetype)


@app.route('/deletefile', methods=['POST'])
def DeleteFile():
    '''route for deletion of binary and audio file'''
    fn = request.form['path']
    if fn == '' or fn[0] == '.' or '/' in fn:
        print('deletefile=', fn)
        return "error"
    remove(fn)  # deleting the file
    return "0"


@app.route('/SendLog')
def sse_request():
    '''Set response method to event-stream'''
    return Response(event_stream(), mimetype='text/event-stream')


@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


@app.route('/stop')
def stop():
    '''route to kill scilab on closing of chart'''
    kill_scilab()
    return "done"


@app.route('/endBlock/<fig_id>')
def endBlock(fig_id):
    '''route to end blocks with no Ending parameter'''
    (diagram, __) = get_diagram(get_request_id())
    if diagram is None:
        print('no diagram')
        return

    diagram.figure_list.remove(fig_id)
    return "done"


@app.route('/')
def page():
    return render_template('index.html',
                           example_content='',
                           example_filename='',
                           prerequisite_content='',
                           prerequisite_filename='')


@app.route('/getOutput', methods=['POST'])
def run_scilab_func_request():
    (diagram, __) = get_diagram(get_request_id())
    if diagram is None:
        print('no diagram')
        return

    num = request.form['num']
    den = request.form['den']

    if 'z' in num or 'z' in den:
        command = "z=poly(0,'z');exec('" + CONT_FRM_WRITE + \
            "');calculate_cont_frm(" + num + "," + den + ");"

    else:
        command = "s=poly(0,'s');exec('" + CONT_FRM_WRITE + \
            "');calculate_cont_frm(" + num + "," + den + ");"

    try:
        diagram.scilab_proc = run_scilab(command)
    except FileNotFoundError:
        return "scilab not found. Follow the installation instructions"

    diagram.scilab_proc.communicate()

    file_name = "cont_frm_value.txt"
    with open(file_name) as f:
        data = f.read()  # Read the data into a variable
        # Split the file rows into seperate elements of a list
        file_rows = data.strip().split(' ')
        list_value = "[["
        for i in range(len(file_rows)):
            value = file_rows[i]
            if i == len(file_rows) - 1:
                list_value = list_value + value + "]]"
            else:
                list_value = list_value + value + "],["

    return list_value


# example page start ###################

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


def clean_text(s):
    return re.sub(r'[ \t]*[\r\n]+[ \t]*', r'', s)


def get_example_file(example_file_id):
    filename = 'example.xcos'
    filepath = ''
    cur = connection()
    cur.execute(config.QUERY_EXAMPLE_FILE_BY_ID, [example_file_id])
    for (filename, filepath, example_id) in cur.fetchall():
        pass

    if XCOSSOURCEDIR != '' and filepath != '':
        try:
            print('reading', filename, 'from', filepath)
            with open(join(XCOSSOURCEDIR, filepath), 'r') as f:
                text = clean_text(f.read())
                return (text, filename, example_id)
        except Exception as e:
            print('Exception:', str(e))

    scilab_url = "https://scilab.in/download/file/" + example_file_id
    r = requests.get(scilab_url)
    text = clean_text(r.text)
    return (text, filename, example_id)


def clean_text_2(s):
    '''handle whitespace'''
    s = re.sub(r'[\a\b\f\r\v]', r'', s)
    s = re.sub(r'\t', r'    ', s)
    s = re.sub(r' +(\n|$)', r'\n', s)
    s = re.sub(r'\n+$', r'', s)
    # double each backslash
    s = re.sub(r'\\', r'\\\\', s)
    # replace each newline with '\n'
    s = re.sub(r'\n', r'\\n', s)
    return s


def get_prerequisite_file(example_id):
    filename = ''
    filepath = ''
    prerequisite_file_id = None
    cur = connection()
    cur.execute(config.QUERY_PREREQUISITE_FILE_BY_EXAMPLE_ID, [example_id])
    for (filename, filepath, prerequisite_file_id) in cur.fetchall():
        pass

    if prerequisite_file_id is None:
        return ('', filename)

    if XCOSSOURCEDIR != '' and filepath != '':
        try:
            print('reading', filename, 'from', filepath)
            with open(join(XCOSSOURCEDIR, filepath), 'r') as f:
                text = clean_text_2(f.read())
                return (text, filename)
        except Exception as e:
            print('Exception:', str(e))

    scilab_url = "https://scilab.in/download/file/" + str(prerequisite_file_id)
    r = requests.get(scilab_url)
    text = clean_text_2(r.text)
    return (text, filename)


@app.route('/example_file', methods=['GET', 'POST'])
def download_example_file():
    example_file_id = request.args.get('efid')
    (example_content, example_filename, example_id) = get_example_file(
        example_file_id)
    return Response(
        example_content,
        mimetype='application/octet-stream',
        headers={'Content-Disposition':
                 'attachment; filename="%s"' % example_filename})


@app.route('/open', methods=['GET', 'POST'])
def open_example_file():
    example_file_id = request.args.get('efid')
    (example_content, example_filename, example_id) = get_example_file(
        example_file_id)
    (prerequisite_content, prerequisite_filename) = get_prerequisite_file(
        str(example_id))
    return render_template('index.html',
                           example_content=example_content,
                           example_filename=example_filename,
                           prerequisite_content=prerequisite_content,
                           prerequisite_filename=prerequisite_filename)

# example page end     #################


if __name__ == '__main__':
    print('starting')
    os.chdir(SESSIONDIR)
    # Set server address from config
    http_server = WSGIServer(
        (config.HTTP_SERVER_HOST, config.HTTP_SERVER_PORT), app)
    print('listening:', http_server)
    try:
        http_server.serve_forever()
    except KeyboardInterrupt:
        print('exiting')
