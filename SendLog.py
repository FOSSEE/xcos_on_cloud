#!/usr/bin/python3

import gevent
from gevent.event import Event
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
from config import FLASKSESSIONDIR, SESSIONDIR, XCOSSOURCEDIR, REMOVEFILE


def makedirs(dirname, dirtype):
    if not exists(dirname):
        print('making', dirtype, 'dir', dirname)
        os.makedirs(dirname)


def remove(filename):
    if filename is None:
        return False
    if not REMOVEFILE:
        print("not removing", filename)
        return True
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
# to store workspace files for TOWS_c block
WORKSPACE_FILES_FOLDER = 'workspace_files'

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
COPIED_EXPRESSION_SCI_FRM_SCILAB = abspath("copied_expression_from_scilab.sci")
EXP_SCI_FUNC_WRITE = abspath("expression-sci-function.sci")
BASEDIR = abspath('webapp')
IMAGEDIR = join(BASEDIR, 'res_imgs')
# display limit for long strings
DISPLAY_LIMIT = 10
# handle scilab startup
SCILAB_START = (
    "errcatch(-1,'stop');lines(0,120);clearfun('messagebox');"
    "function messagebox(msg,msgboxTitle,msgboxIcon,buttons,isModal),"
    "disp(msg),endfunction;")
SCILAB_END = "mode(2);quit();"
SCILAB_VARS = [
    "canon",
    "close",
    "extractDatatip",
    "extractLight",
    "messagebox",
    "syslin",
    "tf2ss",
]

USER_DATA = {}


class ScilabInstance:
    proc = None
    log_name = None

    def __init__(self):
        (self.proc, self.log_name) = prestart_scilab()


INSTANCES_1 = []
INSTANCES_2 = []
evt = Event()


def too_many_scilab_instances():
    l1 = len(INSTANCES_1)
    l2 = len(INSTANCES_2)
    return l1 >= config.SCILAB_MIN_INSTANCES or \
        l1 + l2 >= config.SCILAB_MAX_INSTANCES


def print_scilab_instances():
    count_1 = len(INSTANCES_1)
    count_2 = len(INSTANCES_2)
    msg = ''
    if count_1 > 0:
        msg += ', free=' + str(count_1)
    if count_2 > 0:
        msg += ', in use=' + str(count_2)
    print('instance count:', msg[2:])


def prestart_scilab_instances():
    attempt = 1

    while True:
        while too_many_scilab_instances():
            evt.wait()

        try:
            INSTANCES_1.append(ScilabInstance())
            attempt = 1
            print_scilab_instances()
        except Exception as e:
            print('could not start scilab:', str(e))
            if attempt >= 4:
                print('could not start scilab after', attempt, 'attempts')
                gevent.thread.interrupt_main()
                return
            gevent.sleep(15 * attempt)
            attempt += 1

        if too_many_scilab_instances():
            evt.clear()


def get_scilab_instance():
    try:
        instance = INSTANCES_1.pop()
        INSTANCES_2.append(instance)
        print_scilab_instances()
        if not too_many_scilab_instances():
            evt.set()

        return instance
    except IndexError:
        print('No free instance')
        return None


def remove_scilab_instance(instance):
    try:
        INSTANCES_2.remove(instance)
        print_scilab_instances()
        if not too_many_scilab_instances():
            evt.set()
    except ValueError:
        print('could not find instance', instance)


def stop_scilab_instance(base, createlogfile=False):
    if base.instance is None:
        print('no instance')
        return

    if not kill_scilab_with(base.instance.proc, signal.SIGTERM):
        kill_scilab_with(base.instance.proc, signal.SIGKILL)
    remove_scilab_instance(base.instance)

    if base.instance.log_name is None:
        if createlogfile:
            print('empty diagram')
    else:
        remove(base.instance.log_name)

    base.instance = None


def stop_scilab_instances():
    while len(INSTANCES_1) > 0:
        instance = INSTANCES_1.pop()
        if not kill_scilab_with(instance.proc, signal.SIGTERM):
            kill_scilab_with(instance.proc, signal.SIGKILL)

    while len(INSTANCES_2) > 0:
        instance = INSTANCES_2.pop()
        if not kill_scilab_with(instance.proc, signal.SIGTERM):
            kill_scilab_with(instance.proc, signal.SIGKILL)


class Diagram:
    diagram_id = None
    # session dir
    sessiondir = None
    # store uploaded filename
    xcos_file_name = None
    # type of uploaded file
    workspace_counter = 0
    # workspace from script
    workspace_filename = None
    # tk count
    tk_count = 0
    # store log name
    instance = None
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
            "'log_name': %s, "
            "'tkbool': %s, 'figure_list': %s }") % (
                self.instance.proc.pid if self.instance is not None else None,
                self.instance.log_name if self.instance is not None else None,
                self.tkbool, self.figure_list)


class Script:
    script_id = None
    sessiondir = None
    filename = None
    status = 0
    instance = None
    workspace_filename = None

    def __str__(self):
        return (
            "{ script_id: %s, filename: %s, status: %d, "
            "script_pid: %s, "
            "workspace_filename: %s }") % (
                self.script_id, self.filename, self.status,
                self.instance.proc.pid if self.instance is not None else None,
                self.workspace_filename)


class SciFile:
    '''Variables used in sci-func block'''
    filename = ''
    file_image = ''
    flag_sci = False
    instance = None


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
    makedirs(join(sessiondir, WORKSPACE_FILES_FOLDER), 'workspace files')

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


def get_script(script_id, scripts=None, remove=False):
    if script_id is None:
        return None
    if len(script_id) == 0:
        print("no id")
        return None
    script_id = int(script_id)

    if scripts is None:
        (__, scripts, __, __, __) = init_session()

    if script_id < 0 or script_id >= len(scripts):
        print("id", script_id, "not in scripts")
        return None

    script = scripts[script_id]

    if remove:
        scripts[script_id] = None

    return script


def add_script():
    (__, scripts, __, sessiondir, diagramlock) = init_session()

    diagramlock.acquire()
    script = Script()
    script.script_id = str(len(scripts))
    script.sessiondir = sessiondir
    scripts.append(script)
    diagramlock.release()

    return (script, sessiondir)


def parse_line(line, lineno):
    '''
    Function to parse the line
    Returns tuple of figure ID and state
    state = INITIALIZATION if new figure is created
            ENDING if current fig end
            DATA otherwise
    '''
    line_words = line.split(' ')  # Each line is split to read condition
    try:
        # The below condition determines the block ID
        if line_words[2] == "Block":
            # to get block id (Which is explicitly added by us while writing
            # into log in scilab source code)
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
    except Exception as e:
        print(str(e), "while parsing", line, "on line", lineno)
        return (None, NOLINE)


def get_line_and_state(file, figure_list, lineno):
    '''
    Function to get a new line from file
    This also parses the line and appends new figures to figure List
    '''
    line = file.readline()  # read line by line from log
    if not line:            # if line is empty then return noline
        return (None, NOLINE)
    # every line is passed to function parse_line for getting values
    parse_result = parse_line(line, lineno)
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
    elif state == NOLINE:
        return (None, NOLINE)
    return (line, DATA)


logfilefdrlock = RLock()
LOGFILEFD = 123


def prestart_scilab():
    cmd = SCILAB_START
    cmdarray = [SCI,
                "-nogui",
                "-noatomsautoload",
                "-nouserstartup",
                "-nb",
                "-nw",
                "-e", cmd]

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


def run_scilab(command, createlogfile=False):
    instance = get_scilab_instance()
    if instance is None:
        print('cannot run command', command)
        return None

    cmd = command + SCILAB_END
    print('running command', cmd)
    instance.proc.stdin.write(cmd)

    if not createlogfile:
        remove(instance.log_name)
        instance.log_name = None

    return instance


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
    return True


@app.route('/uploadscript', methods=['POST'])
def uploadscript():
    '''
    Below route is called for uploading script file.
    '''
    (script, sessiondir) = add_script()

    file = request.files['file']
    if not file:
        msg = "Upload Error\n"
        rv = {'msg': msg}
        return Response(json.dumps(rv), mimetype='application/json')

    fname = join(sessiondir, SCRIPT_FILES_FOLDER,
                 script.script_id + '_script.sce')
    file.save(fname)
    script.filename = fname

    if is_unsafe_script(fname):
        msg = ("System calls are not allowed in script.\n"
               "Please edit the script again.\n")
        script.status = -1
        rv = {'status': script.status, 'msg': msg}
        return Response(json.dumps(rv), mimetype='application/json')

    wfname = join(sessiondir, SCRIPT_FILES_FOLDER,
                  script.script_id + '_script_workspace.dat')
    script.workspace_filename = wfname
    command = "exec('" + fname + "');save('" + wfname + "');"

    script.instance = run_scilab(command)

    if script.instance is None:
        msg = "Resource not available"
        script.status = -2
        rv = {'status': script.status, 'msg': msg}
        return Response(json.dumps(rv), mimetype='application/json')

    msg = ''
    script.status = 1
    rv = {'script_id': script.script_id, 'status': script.status, 'msg': msg}
    return Response(json.dumps(rv), mimetype='application/json')


def clean_output(s):
    '''handle whitespace and sequences in output'''
    s = re.sub(r'[\a\b\f\r\v]', r'', s)
    # https://en.wikipedia.org/wiki/ANSI_escape_code#CSI_sequences
    s = re.sub(r'\x1b\[[\x30-\x3f]*[\x20-\x2f]*[\x40-\x7e]', r'', s)
    s = re.sub(r'\t', r'    ', s)
    s = re.sub(r' +(\n|$)', r'\n', s)
    s = re.sub(r'\n+', r'\n', s)
    s = re.sub(r'^\n', r'', s)
    return s


@app.route('/getscriptoutput', methods=['POST'])
def getscriptoutput():
    '''
    Below route is called for uploading script file.
    '''
    script = get_script(get_script_id())
    if script is None:
        # when called with same script_id again or with incorrect script_id
        print('no script')
        msg = "no script"
        rv = {'msg': msg}
        return Response(json.dumps(rv), mimetype='application/json')

    proc = script.instance.proc
    wfname = script.workspace_filename

    try:
        # output from scilab terminal is saved for checking error msg
        output = proc.communicate(timeout=30)[0]
        output = clean_output(output)
        remove_scilab_instance(script.instance)
        script.instance = None

        if proc.returncode < 0:
            msg = 'Script stopped'
            script.status = -5
            rv = {'status': script.status, 'msg': msg, 'output': output}
            return Response(json.dumps(rv), mimetype='application/json')
            return msg

        # if error is encountered while execution of script file, then error
        # message is returned to the user
        if '!--error' in output:
            msg = ("Check result window for details.\n"
                   "Please edit the script and execute again.\n")
            script.status = -3
            rv = {'status': script.status, 'msg': msg, 'output': output}
            return Response(json.dumps(rv), mimetype='application/json')

        print('workspace for', script.script_id, 'saved in', wfname)
        msg = ''
        script.status = 0
        rv = {'script_id': script.script_id, 'status': script.status,
              'msg': msg, 'output': output, 'returncode': proc.returncode}
        return Response(json.dumps(rv), mimetype='application/json')
    except subprocess.TimeoutExpired:
        kill_script(script)
        msg = 'Timeout'
        script.status = -4
        rv = {'status': script.status, 'msg': msg}
        return Response(json.dumps(rv), mimetype='application/json')


@app.route('/stopscript', methods=['POST'])
def kill_script(script=None):
    '''Below route is called for stopping a running script file.'''
    if script is None:
        script = get_script(get_script_id(), remove=True)
        if script is None:
            # when called with same script_id again or with incorrect script_id
            print('no script')
            return "error"

    print('kill_script: script=', script.__dict__)

    if script.filename is None:
        print('empty script')
    else:
        remove(script.filename)
        script.filename = None

    stop_scilab_instance(script)

    if script.workspace_filename is None:
        print('empty workspace')
    else:
        remove(script.workspace_filename)
        script.workspace_filename = None

    return "ok"


@app.route('/uploadsci', methods=['POST'])
def uploadsci():
    '''
    Below route is called for uploading sci file which is required in sci-func
    block (called in Javscript only_scifunc_code.js)
    '''
    (__, __, scifile, sessiondir, __) = init_session()

    if scifile.instance is not None:
        msg = 'Cannot execute more than one script at the same time.'
        return msg

    file = request.files['file']  # to get uploaded file
    # Check if the file is not null
    if not file:
        return "error"

    ts = datetime.now()
    # file name is created with timestamp
    fname = join(sessiondir, SCIFUNC_FILES_FOLDER,
                 str(ts) + secure_filename(file.filename))
    file.save(fname)  # file is saved in scifunc_files folder
    scifile.filename = fname
    scifile.flag_sci = True  # flag for file saved

    if is_unsafe_script(scifile.filename):
        msg = ("System calls are not allowed in .sci file!\n"
               "Please upload another .sci file!!")
        # flag for file saved will be set as False
        scifile.flag_sci = False
        return msg

    # scilab command is created to run that uploaded sci file which will be
    # used by sci-func block
    command = "exec('" + scifile.filename + "');"

    scifile.instance = run_scilab(command)

    if scifile.instance is None:
        msg = "Resource not available"
        remove(scifile.filename)
        scifile.flag_sci = False
        return msg

    try:
        # output from scilab terminal is saved for checking error msg
        proc = scifile.instance.proc
        out = proc.communicate(timeout=30)[0]
        remove_scilab_instance(scifile.instance)
        scifile.instance = None

        if proc.returncode < 0:
            msg = 'Cancelled'
            remove(scifile.filename)
            scifile.flag_sci = False
            return msg

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

        msg = "File is uploaded successfully!!"
        return msg
    except subprocess.TimeoutExpired:
        kill_scifile(scifile)
        msg = 'Timeout'
        return msg


@app.route('/stopscifile')
def kill_scifile(scifile=None):
    '''Below route is called for stopping a running sci file.'''
    if scifile is None:
        (__, __, scifile, __, __) = init_session()

    print('kill_scifile: scifile=', scifile.__dict__)

    if scifile.filename is None:
        print('empty scifile')
    else:
        remove(scifile.filename)
        scifile.filename = None

    stop_scilab_instance(scifile)

    scifile.flag_sci = False

    return "ok"


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


def get_script_id(key='script_id', default=''):
    form = request.form
    if form is None:
        print('No form in request')
        return default
    if key not in form:
        print('No', key, 'in request.form')
        return default
    value = form[key]
    if re.fullmatch(r'[0-9]+', value):
        return value
    displayvalue = value if len(
        value) <= DISPLAY_LIMIT + 3 else value[:DISPLAY_LIMIT] + '...'
    print('Invalid value', displayvalue, 'for', key, 'in request.form')
    return default


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

    stop_scilab_instance(diagram, True)

    stopDetailsThread(diagram)


def load_variables(filename):
    '''
    add scilab commands to load only user defined variables

    SCILAB_VARS contains the known list of inbuilt variables
    '''

    command = "[__V1,__V2]=listvarinfile('%s');" % filename
    command += "__V3=['%s'];" % ("';'".join(SCILAB_VARS))
    command += "__V4=setdiff(__V1,__V3);"
    command += "__V4=__V4(grep(__V4, '/^[^%]+$/', 'r'));"
    command += "if ~isempty(__V4) then;"
    command += "__V5=''''+strcat(__V4,''',''')+'''';"
    command += "__V6='load(''%s'','+__V5+');';" % filename
    command += "execstr(__V6);"
    command += "end;"
    command += "clear __V1 __V2 __V3 __V4 __V5 __V6;"
    return command


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

    # name of primary workspace file
    workspace_filename = diagram.workspace_filename
    # name of workspace file
    workspace = join(diagram.sessiondir, WORKSPACE_FILES_FOLDER,
                     "workspace.dat")

    loadfile = workspace_filename is not None or \
        (diagram.workspace_counter in (2, 3) and exists(workspace)) or \
        diagram.workspace_counter == 5

    command = ""

    if loadfile:
        # ignore import errors
        command += "errcatch(-1,'continue');"

        if workspace_filename is not None:
            command += load_variables(workspace_filename)

        if diagram.workspace_counter in (2, 3) and exists(workspace):
            # 3 - for both TOWS_c and FROMWSB and also workspace dat file exist
            # In this case workspace is saved in format of dat file (Scilab way
            # of saying workpsace)
            # For FROMWSB block and also workspace dat file exist
            command += load_variables(workspace)

        if diagram.workspace_counter == 5:
            command += "exec('" + scifile.filename + "');"

        command += "errcatch(-1,'stop');"

    # Scilab Commands for running of scilab based on existence of different
    # blocks in same diagram from workspace_counter's value
    #    1: Indicate TOWS_c exist
    #    2: Indicate FROMWSB exist
    #    3: Both TOWS_c and FROMWSB exist
    #    4: Indicate AFFICH_m exist (We dont want graphic window to open so
    #    xs2jpg() command is removed)
    #    5: Indicate Sci-func block as it some time return image as output
    #    rather than Sinks's log file.
    #    0/No-condition : For all other blocks

    command += "loadXcosLibs();"
    command += "importXcosDiagram('" + diagram.xcos_file_name + "');"
    command += "xcos_simulate(scs_m,4);"

    if diagram.workspace_counter == 4:
        # For AFFICH-m block
        pass
    elif diagram.workspace_counter == 5:
        # For Sci-Func block (Image are return as output in some cases)
        command += "xs2jpg(gcf(),'%s/%s');" % (IMAGEDIR, scifile.file_image)
    else:
        # For all other block
        command += "xs2jpg(gcf(),'%s/%s');" % (IMAGEDIR, 'img_test.jpg')

    if diagram.workspace_counter in (1, 2, 3) and exists(workspace):
        command += "deletefile('" + workspace + "');"

    if diagram.workspace_counter in (1, 3):
        command += "save('" + workspace + "');"

    diagram.instance = run_scilab(command, True)

    if diagram.instance is None:
        return "Resource not available"

    instance = diagram.instance
    print('log_name=', instance.log_name)

    # Start sending log to chart function for creating chart
    try:
        # For processes taking less than 10 seconds
        scilab_out = instance.proc.communicate(timeout=4)[0]
        scilab_out = re.sub(r'^[ !\\-]*\n', r'',
                            scilab_out, flags=re.MULTILINE)
        print("=== Begin output from scilab console ===")
        print(scilab_out, end='')
        print("===== End output from scilab console ===")
        # Check for errors in Scilab
        if "Empty diagram" in scilab_out:
            remove_scilab_instance(diagram.instance)
            diagram.instance = None
            return "Empty diagram"

        m = re.search(r'Fatal error: exception Failure\("([^"]*)"\)',
                      scilab_out)
        if m:
            msg = 'modelica error: ' + m.group(1)
            remove_scilab_instance(diagram.instance)
            diagram.instance = None
            return msg

        if ("xcos_simulate: "
                "Error during block parameters update.") in scilab_out:
            remove_scilab_instance(diagram.instance)
            diagram.instance = None
            return "Error in block parameter. Please check block parameters"

        if "xcosDiagramToScilab:" in scilab_out:
            remove_scilab_instance(diagram.instance)
            diagram.instance = None
            return "Error in xcos diagram. Please check diagram"

        if "Cannot find scilab-bin" in scilab_out:
            remove_scilab_instance(diagram.instance)
            diagram.instance = None
            return ("scilab has not been built. "
                    "Follow the installation instructions")

        if os.stat(instance.log_name).st_size == 0 and \
                diagram.workspace_counter != 1:
            remove_scilab_instance(diagram.instance)
            diagram.instance = None
            return "log file is empty"

    # For processes taking more than 10 seconds
    except subprocess.TimeoutExpired:
        pass

    if diagram.workspace_counter == 5:
        Timer(15.0, delete_image, [scifile]).start()
        Timer(10.0, delete_scifile, [scifile]).start()

    return ""


@flask.stream_with_context
def event_stream():
    '''
    Read log file and return data to eventscource function of javascript for
    displaying chart.

    This function is called in app route 'SendLog' below
    '''
    (diagram, __) = get_diagram(get_request_id())
    if diagram is None:
        print('no diagram')
        yield "event: ERROR\ndata: no diagram\n\n"
        return

    # Open the log file
    if not isfile(diagram.instance.log_name):
        print("log file does not exist")
        yield "event: ERROR\ndata: no log file found\n\n"
        remove_scilab_instance(diagram.instance)
        diagram.instance = None
        return
    while os.stat(diagram.instance.log_name).st_size == 0 and \
            diagram.instance.proc.poll() is None:
        gevent.sleep(LOOK_DELAY)
    if os.stat(diagram.instance.log_name).st_size == 0 and \
            diagram.instance.proc.poll() is not None:
        if diagram.workspace_counter != 1:
            print("log file is empty")
            yield "event: ERROR\ndata: log file is empty\n\n"
        else:
            # for Only TOWS_c block
            print("Variables are saved in workspace successfully")
            yield "event: MESSAGE\ndata: Workspace saved successfully\n\n"
        remove_scilab_instance(diagram.instance)
        diagram.instance = None
        return

    with open(diagram.instance.log_name, "r") as log_file:
        # Start sending log
        lineno = 0
        line = line_and_state()
        endtime = time() + config.SCILAB_INSTANCE_TIMEOUT_INTERVAL
        while time() <= endtime:
            lineno += 1
            line.set(get_line_and_state(log_file, diagram.figure_list, lineno))
            if len(diagram.figure_list) == 0:
                break
            # Get the line and loop until the state is ENDING and figure_list
            # empty. Determine if we get block id and give it to chart.js
            if line.get_state() == BLOCK_IDENTIFICATION:
                yield "event: block\ndata: " + line.get_line() + "\n\n"
            elif line.get_state() != DATA:
                gevent.sleep(LOOK_DELAY)
            else:
                yield "event: log\ndata: " + line.get_line() + "\n\n"

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
    # Check if the file is not null
    if not file:
        return "error"
    # flags to check if both TOWS_c and FROMWSB are present
    flag1 = 0
    flag2 = 0
    list1 = []
    list2 = []
    # Make the filename safe, remove unsupported chars
    (diagram, scripts, scifile, sessiondir) = add_diagram()
    script = get_script(get_script_id(default=None), scripts=scripts)
    if script is not None:
        diagram.workspace_filename = script.workspace_filename
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
    skipblock = False
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
            skipblock = True
        elif skipblock:
            if '</BasicBlock>' in line:
                skipblock = False
        else:
            print(line, end='')

    # Changing the file extension from xml to xcos
    fname = join(sessiondir, UPLOAD_FOLDER,
                 splitext(temp_file_xml_name)[0] + ".xcos")
    # Move the xcos file to uploads directory
    os.rename(temp_file_xml_name, fname)
    diagram.xcos_file_name = fname
    return diagram.diagram_id


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
        diagram.tk_starttime = time() + config.TKSCALE_START_DELAY
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
    (__, __, scifile, sessiondir, __) = init_session()

    if scifile.instance is not None:
        msg = 'Cannot execute more than one script at the same time.'
        return msg

    file_name = join(sessiondir, "cont_frm_value.txt")
    num = request.form['num']
    den = request.form['den']
    '''
    sample input to scilab:
    num: 1+s
    den: s^2-5*s+1
    '''

    if 'z' in num or 'z' in den:
        p = 'z'
    else:
        p = 's'
    command = "%s=poly(0, '%s');" % (p, p)
    command += "exec('%s');" % CONT_FRM_WRITE
    command += "calculate_cont_frm(%s,%s,'%s');" % (num, den, file_name)

    scifile.instance = run_scilab(command)

    if scifile.instance is None:
        msg = "Resource not available"
        return msg

    proc = scifile.instance.proc
    proc.communicate()
    remove_scilab_instance(scifile.instance)
    scifile.instance = None

    list_value = ""
    '''
    sample output from scilab:
    [[0], [1], [0], [0]]
    '''
    if isfile(file_name):
        with open(file_name) as f:
            data = f.read()  # Read the data into a variable
            list_value = data.replace('][', '],[')
        remove(file_name)

    else:
        list_value = "Error"

    return jsonify(list_value)


# App route for getting scilab expression output for Expression Block

@app.route('/getExpressionOutput', methods=['POST'])
def run_scilab_func_expr_request():
    (__, __, scifile, sessiondir, __) = init_session()

    if scifile.instance is not None:
        msg = 'Cannot execute more than one script at the same time.'
        return msg

    file_name = join(sessiondir, "expr_set_value.txt")
    head = request.form['head']
    exx = request.form['exx']
    '''
    sample input to scilab:
    head: %foo(u1,u2)
    exx: (u1>0)*sin(u2)^2
    '''
    command = "exec('%s');" % COPIED_EXPRESSION_SCI_FRM_SCILAB
    command += "exec('%s');" % EXP_SCI_FUNC_WRITE
    command += "callFunctionAcctoMethod('%s','%s','%s');" % (
        file_name, head, exx)

    scifile.instance = run_scilab(command)

    if scifile.instance is None:
        msg = "Resource not available"
        return msg

    proc = scifile.instance.proc
    proc.communicate()
    remove_scilab_instance(scifile.instance)
    scifile.instance = None

    # create a dictionary
    exprs_value = {}
    '''
    Array containing value which will be used as key
    for dictionary 'exprs_value'

    sample output from scilab:
    ok: true or scilab error message
    ok1: true
    ipar: [[2], [1], [6], [1], [5], [18], [2], [2], [5]
        , [101], [6], [2], [5], [15], [5], [3]]
    rpar: [[0], [2]]
    nz: [[1]]
    '''
    var_array = ["ok", "ok1", "ipar", "rpar", "nz"]
    with open(file_name) as f:
        data = f.read()  # Read the data into a variable
        valuesfromfile = data.splitlines()
    for i in range(len(valuesfromfile)):
        exprs_value[var_array[i]] = valuesfromfile[i]

    if not exprs_value:
        exprs_value["ok"] = "Enter a valid scilab expression : " + \
            "custom made message"
    remove(file_name)
    return jsonify(exprs_value)


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
    print('downloading', scilab_url)
    r = requests.get(scilab_url)
    text = clean_text(r.text)
    return (text, filename, example_id)


def clean_text_2(s, forindex):
    '''handle whitespace'''
    s = re.sub(r'[\a\b\f\r\v]', r'', s)
    s = re.sub(r'\t', r'    ', s)
    s = re.sub(r' +(\n|$)', r'\n', s)
    if forindex:
        s = re.sub(r'\n+$', r'', s)
        # double each backslash
        s = re.sub(r'\\', r'\\\\', s)
        # replace each newline with '\n'
        s = re.sub(r'\n', r'\\n', s)
    else:
        s = re.sub(r'\n{2,}$', r'\n', s)
    return s


def get_prerequisite_file(file_id):
    filename = ''
    filepath = ''
    cur = connection()
    cur.execute(config.QUERY_PREREQUISITE_FILE_BY_ID, [file_id])
    for (filename, filepath) in cur.fetchall():
        pass

    return return_prerequisite_file(filename, filepath, file_id, False)


def get_prerequisite_file_by_example_id(example_id):
    filename = ''
    filepath = ''
    file_id = None
    cur = connection()
    cur.execute(config.QUERY_PREREQUISITE_FILE_BY_EXAMPLE_ID, [example_id])
    for (filename, filepath, file_id) in cur.fetchall():
        pass

    return return_prerequisite_file(filename, filepath, file_id, True)


def return_prerequisite_file(filename, filepath, file_id, forindex):
    if file_id is None:
        return ('', filename)

    if XCOSSOURCEDIR != '' and filepath != '':
        try:
            print('reading', filename, 'from', filepath)
            with open(join(XCOSSOURCEDIR, filepath), 'r') as f:
                text = clean_text_2(f.read(), forindex)
                return (text, filename)
        except Exception as e:
            print('Exception:', str(e))

    scilab_url = "https://scilab.in/download/file/" + str(file_id)
    print('downloading', scilab_url)
    r = requests.get(scilab_url)
    text = clean_text_2(r.text, forindex)
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


@app.route('/prerequisite_file', methods=['GET', 'POST'])
def download_prerequisite_file():
    example_file_id = request.args.get('efid')
    (prerequisite_content, prerequisite_filename) = get_prerequisite_file(
        example_file_id)
    return Response(
        prerequisite_content,
        mimetype='application/octet-stream',
        headers={'Content-Disposition':
                 'attachment; filename="%s"' % prerequisite_filename})


@app.route('/open', methods=['GET', 'POST'])
def open_example_file():
    example_file_id = request.args.get('efid')
    (example_content, example_filename, example_id) = get_example_file(
        example_file_id)
    (prerequisite_content, prerequisite_filename) = \
        get_prerequisite_file_by_example_id(str(example_id))
    return render_template('index.html',
                           example_content=example_content,
                           example_filename=example_filename,
                           prerequisite_content=prerequisite_content,
                           prerequisite_filename=prerequisite_filename)

# example page end     #################


if __name__ == '__main__':
    print('starting')
    os.chdir(SESSIONDIR)
    worker = gevent.spawn(prestart_scilab_instances)
    # Set server address from config
    http_server = WSGIServer(
        (config.HTTP_SERVER_HOST, config.HTTP_SERVER_PORT), app)
    print('listening:', http_server)
    try:
        http_server.serve_forever()
    except KeyboardInterrupt:
        gevent.kill(worker)
        stop_scilab_instances()
        print('exiting')
