#!/usr/bin/python3

import gevent
from gevent.event import Event
from gevent.lock import RLock
from gevent.monkey import patch_all
from gevent.pywsgi import WSGIHandler, WSGIServer

patch_all(aggressive=False, subprocess=False)

from datetime import datetime
import fileinput
import flask
from flask import request, Response, session, render_template, jsonify
from flask_caching import Cache
import flask_session
from flaskext.versioned import Versioned
import glob
from importlib import reload
import json
import logging
from logging.handlers import TimedRotatingFileHandler
import sqlite3
import os
from os.path import abspath, dirname, exists, isfile, join, splitext
import re
import requests
import signal
import subprocess
from tempfile import mkdtemp, mkstemp
from threading import Timer, current_thread
from time import time
import uuid
from werkzeug.http import dump_cookie
from xml.dom import minidom
from werkzeug.utils import secure_filename

import config


class MyWSGIHandler(WSGIHandler):
    def format_request(self):
        length = self.response_length or '-'
        if self.time_finish:
            delta = '%.6f' % (self.time_finish - self.time_start)
        else:
            delta = '-'
        if isinstance(self.client_address, tuple):
            client_address = self.client_address[0]
        else:
            client_address = self.client_address
        return '%s "%s" %s %s %s' % (
            client_address or '-',
            self.requestline or '',
            (self._orig_status or self.status or '000').split()[0],
            length,
            delta)


class MyResponse(Response):
    def set_cookie(self, *args, **kwargs):
        cookie = dump_cookie(*args, **kwargs)
        if kwargs.get('samesite', None) is None:
            cookie = '%s; %s=%s' % (cookie,
                                    'SameSite', config.SESSION_COOKIE_SAMESITE)
        self.headers.add('Set-Cookie', cookie)


def makedirs(dirname, dirtype):
    if not exists(dirname):
        os.makedirs(dirname)


def rmdir(dirname, dirtype):
    try:
        if exists(dirname):
            os.rmdir(dirname)
    except Exception as e:
        logger.warning('could not remove %s: %s', dirname, str(e))


def remove(filename):
    if filename is None:
        return False
    if not config.REMOVEFILE:
        logger.debug('not removing %s', filename)
        return True
    try:
        os.remove(filename)
        return True
    except BaseException:
        logger.error('could not remove %s', filename)
        return False


# change directory before using relative paths
ROOTDIR = dirname(abspath(__file__))
os.chdir(ROOTDIR)

# Scilab dir
SCIDIR = abspath(config.SCILAB_DIR)
SCI = join(SCIDIR, "bin", "scilab-adv-cli")
READCONTENTFILE = abspath("resources/Read_Content.txt")
BASEDIR = abspath('webapp')
IMAGEDIR = join(BASEDIR, config.IMAGEDIR)
IMAGEURLDIR = '/' + config.IMAGEDIR + '/'
DB_NAME = abspath(config.DB_NAME)
XCOSSOURCEDIR = abspath(config.XCOSSOURCEDIR)
SESSIONDIR = abspath(config.SESSIONDIR)
FLASKSESSIONDIR = abspath(config.FLASKSESSIONDIR)
FLASKCACHINGDIR = abspath(config.FLASKCACHINGDIR)
LOGDIR = abspath(config.LOGDIR)
LOGFILE = join(LOGDIR, config.LOGFILE)
SYSTEM_COMMANDS = re.compile(config.SYSTEM_COMMANDS)
SPECIAL_CHARACTERS = re.compile(config.SPECIAL_CHARACTERS)


makedirs(FLASKSESSIONDIR, 'top flask session')
makedirs(SESSIONDIR, 'top session')
makedirs(FLASKCACHINGDIR, 'top flask caching')
makedirs(LOGDIR, 'log')

cache = Cache(config={
    'CACHE_TYPE': 'filesystem',
    'CACHE_DEFAULT_TIMEOUT': config.FLASKCACHINGDEFAULTTIMEOUT,
    'CACHE_DIR': FLASKCACHINGDIR})

app = flask.Flask(__name__, static_folder='webapp/', template_folder='webapp')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = FLASKSESSIONDIR
app.config['SESSION_COOKIE_SAMESITE'] = config.SESSION_COOKIE_SAMESITE
app.config['SESSION_COOKIE_SECURE'] = config.SESSION_COOKIE_SECURE
# These are the extension that we are accepting to be uploaded
app.config['ALLOWED_EXTENSIONS'] = set(['zcos', 'xcos', 'txt'])
app.response_class = MyResponse
cache.init_app(app)
flask_session.Session(app)
versioned = Versioned(app)

logger = logging.getLogger('xcos')
logger.setLevel(logging.DEBUG)
handler = TimedRotatingFileHandler(LOGFILE,
                                   when='midnight',
                                   backupCount=config.LOGBACKUPCOUNT)
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter(
    fmt='%(asctime)s %(threadName)s %(levelname)s %(message)s',
    datefmt='%H:%M:%S')
handler.setFormatter(formatter)
logger.addHandler(handler)

# This is the path to the upload directory and values directory
UPLOAD_FOLDER = 'uploads'  # to store xcos file
VALUES_FOLDER = 'values'  # to store files related to tkscale block
# to store uploaded sci files for sci-func block
SCRIPT_FILES_FOLDER = 'script_files'
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

# display limit for long strings
DISPLAY_LIMIT = 10
# handle scilab startup
SCILAB_START = (
    "funcprot(0);errcatch(-1,'stop');lines(0,120);"
    "clearfun('messagebox');"
    "function messagebox(msg,title,icon,buttons,modal),disp(msg),endfunction;"
    "function xinfo(msg),disp(msg),endfunction;"
    "funcprot(1);")
SCILAB_END = "mode(2);quit();"

USER_DATA = {}
VERSIONED_CHECK_TIME = 0
VERSIONED_LOCK = RLock()
VERSIONED_FILES_MTIME = {}


def version_check():
    global VERSIONED_CHECK_TIME

    modified = False

    if time() > VERSIONED_CHECK_TIME:
        with VERSIONED_LOCK:
            if time() > VERSIONED_CHECK_TIME:
                reload(config)
                modified = is_versioned_file_modified()
                VERSIONED_CHECK_TIME = time() + config.VERSIONED_CHECK_INTERVAL

    return modified


def is_versioned_file_modified():
    modified = False

    for f in config.VERSIONED_FILES:
        last_mtime = VERSIONED_FILES_MTIME.get(f, None)
        mtime = os.stat(join(BASEDIR, f)).st_mtime
        if last_mtime is None:
            VERSIONED_FILES_MTIME[f] = mtime
        elif mtime > last_mtime:
            VERSIONED_FILES_MTIME[f] = mtime
            logger.debug('%s modified', f)
            modified = True

    if modified:
        app.jinja_env.cache.clear()

    return modified


class ScilabInstance:
    proc = None
    log_name = None
    base = None
    starttime = None
    endtime = None

    def __init__(self):
        (self.proc, self.log_name) = prestart_scilab()

    def __str__(self):
        return "{pid: %s, log_name: %s}" % (self.proc.pid, self.log_name)


INSTANCES_1 = []
INSTANCES_2 = []
evt = Event()


def no_free_scilab_instance():
    l1 = len(INSTANCES_1)
    return l1 == 0


def too_many_scilab_instances():
    l1 = len(INSTANCES_1)
    l2 = len(INSTANCES_2)
    return l1 >= config.SCILAB_MIN_INSTANCES or \
        l1 + l2 >= config.SCILAB_MAX_INSTANCES


def start_scilab_instances():
    l1 = len(INSTANCES_1)
    l2 = len(INSTANCES_2)
    lssi = min(config.SCILAB_START_INSTANCES,
               config.SCILAB_MAX_INSTANCES - l2) - l1
    if lssi > 0:
        logger.info('can start %s instances', lssi)
    return lssi


def print_scilab_instances():
    l1 = len(INSTANCES_1)
    l2 = len(INSTANCES_2)
    msg = ''
    if l1 > 0:
        msg += ', free=' + str(l1)
    if l2 > 0:
        msg += ', in use=' + str(l2)
    logger.info('instance count: %s', msg[2:])


FIRST_INSTANCE = True


def prestart_scilab_instances():
    global FIRST_INSTANCE

    current_thread().name = 'PreStart'

    attempt = 1

    while True:
        while too_many_scilab_instances():
            evt.wait()

        for i in range(start_scilab_instances()):
            instance = ScilabInstance()
            proc = instance.proc
            if proc is None:
                gevent.thread.interrupt_main()
                return

            if FIRST_INSTANCE:
                gevent.sleep(1)
                for i in range(2, 4):
                    if proc.poll() is not None:
                        break
                    gevent.sleep(i)

            if proc.poll() is not None:
                (out, err) = proc.communicate()
                out = re.sub(r'^[ !\\-]*\n', r'', out, flags=re.MULTILINE)
                if out:
                    logger.info('=== Output from scilab console ===\n%s',
                                out)
                if err:
                    logger.info('=== Error from scilab console ===\n%s',
                                err)

                # Check for errors in Scilab
                if 'Cannot find scilab-bin' in out:
                    logger.critical('scilab has not been built. '
                                    'Follow the installation instructions')
                    gevent.thread.interrupt_main()
                    return

                returncode = proc.returncode
                msg = 'attempts' if attempt != 1 else 'attempt'

                if attempt >= 4:
                    logger.critical('aborting after %s %s: rc = %s',
                                    attempt, msg, returncode)
                    gevent.thread.interrupt_main()
                    return

                logger.error('retrying after %s %s: rc = %s',
                             attempt, msg, returncode)
                gevent.sleep(config.SCILAB_INSTANCE_RETRY_INTERVAL * attempt)
                attempt += 1
                FIRST_INSTANCE = True
                continue

            INSTANCES_1.append(instance)
            attempt = 1
            FIRST_INSTANCE = False

        print_scilab_instances()

        if too_many_scilab_instances():
            evt.clear()


def get_scilab_instance():
    global FIRST_INSTANCE

    try:
        while True:
            instance = INSTANCES_1.pop(0)
            proc = instance.proc
            if proc.poll() is not None:
                logger.warning('scilab instance exited: return code is %s',
                               proc.returncode)
                FIRST_INSTANCE = True
                if not too_many_scilab_instances():
                    evt.set()
                    if no_free_scilab_instance():
                        gevent.sleep(4)
                continue

            INSTANCES_2.append(instance)
            print_scilab_instances()
            if not too_many_scilab_instances():
                evt.set()

            return instance
    except IndexError:
        logger.error('No free instance')
        return None


def remove_scilab_instance(instance):
    try:
        INSTANCES_2.remove(instance)
        print_scilab_instances()
        if not too_many_scilab_instances():
            evt.set()
    except ValueError:
        logger.error('could not find instance %s', instance)


def stop_scilab_instance(base, createlogfile=False):
    stop_instance(base.instance, createlogfile)

    base.instance = None


def stop_instance(instance, createlogfile=False, removeinstance=True):
    if instance is None:
        logger.warning('no instance')
        return

    if not kill_scilab_with(instance.proc, signal.SIGTERM):
        kill_scilab_with(instance.proc, signal.SIGKILL)

    if removeinstance:
        remove_scilab_instance(instance)

    if instance.log_name is None:
        if createlogfile:
            logger.warning('empty diagram')
    else:
        remove(instance.log_name)
        instance.log_name = None

    instance.base = None


def stop_scilab_instances():
    if len(INSTANCES_1) > 0:
        logger.info('stopping %s idle instances', len(INSTANCES_1))
        while len(INSTANCES_1) > 0:
            instance = INSTANCES_1.pop()
            stop_instance(instance, removeinstance=False)

    if len(INSTANCES_2) > 0:
        logger.info('stopping %s busy instances', len(INSTANCES_2))
        while len(INSTANCES_2) > 0:
            instance = INSTANCES_2.pop()
            stop_instance(instance, removeinstance=False)


def reap_scilab_instances():
    current_thread().name = 'Reaper'
    while True:
        gevent.sleep(100)

        remove_instances = []

        for instance in INSTANCES_2:
            if instance.endtime < time():
                remove_instances.append(instance)

        count = len(remove_instances)
        if count == 0:
            continue

        logger.info('removing %s stale instances', count)
        for instance in remove_instances:
            base = instance.base
            if base is None:
                logger.warning('cannot stop instance %s', instance)
                stop_instance(instance)
            elif isinstance(base, Diagram):
                kill_scilab(base)
            elif isinstance(base, Script):
                kill_script(base)
            elif isinstance(base, SciFile):
                kill_scifile(base)
            else:
                logger.warning('cannot stop instance %s', instance)
                stop_instance(instance)


class Diagram:
    diagram_id = None
    # session dir
    sessiondir = None
    # store uploaded filename
    xcos_file_name = None
    # type of uploaded file
    workspace_counter = 0
    save_variables = set()
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
    file_image = ''

    def __init__(self):
        self.figure_list = []

    def __str__(self):
        return "{instance: %s, tkbool: %s, figure_list: %s}" % (
            self.instance, self.tkbool, self.figure_list)

    def clean(self):
        if self.instance is not None:
            kill_scilab(self)
            self.instance = None
        if self.xcos_file_name is not None:
            remove(self.xcos_file_name)
            self.xcos_file_name = None
        if self.workspace_filename is not None:
            remove(self.workspace_filename)
            self.workspace_filename = None
        if self.file_image != '':
            remove(join(IMAGEDIR, self.file_image))
            self.file_image = ''


class Script:
    script_id = None
    sessiondir = None
    filename = None
    status = 0
    instance = None
    workspace_filename = None

    def __str__(self):
        return (
            "{script_id: %s, filename: %s, status: %d, instance: %s, "
            "workspace_filename: %s}") % (
                self.script_id, self.filename, self.status, self.instance,
                self.workspace_filename)

    def clean(self):
        if self.instance is not None:
            kill_script(self)
            self.instance = None
        if self.filename is not None:
            remove(self.filename)
            self.filename = None
        if self.workspace_filename is not None:
            remove(self.workspace_filename)
            self.workspace_filename = None


class SciFile:
    '''Variables used in sci-func block'''
    instance = None

    def clean(self):
        if self.instance is not None:
            kill_scifile(self)
            self.instance = None


class DataFile:
    sessiondir = None
    data_filename = None

    def clean(self):
        if self.data_filename is not None:
            remove(self.data_filename)
            self.data_filename = None


class UserData:
    sessiondir = None
    diagrams = None
    scripts = None
    datafiles = None
    scriptcount = None
    scifile = None
    diagramlock = None
    timestamp = None

    def __init__(self):
        self.sessiondir = mkdtemp(
            prefix=datetime.now().strftime('%Y%m%d.'), dir=SESSIONDIR)
        self.diagrams = []
        self.datafiles = []
        self.scripts = {}
        self.scriptcount = 0
        self.scifile = SciFile()
        self.diagramlock = RLock()
        self.timestamp = time()

    def getscriptcount(self):
        with self.diagramlock:
            rv = self.scriptcount
            self.scriptcount += 1

        return str(rv)

    def clean(self):
        for diagram in self.diagrams:
            diagram.clean()
        self.diagrams = None
        for script in self.scripts:
            self.scripts[script].clean()
        self.scripts = None
        for datafile in self.datafiles:
            datafile.clean()
        self.datafiles = None
        self.scifile.clean()
        self.scifile = None
        self.diagramlock = None
        # name of workspace file
        workspace = join(self.sessiondir, WORKSPACE_FILES_FOLDER,
                         "workspace.dat")
        if exists(workspace):
            remove(workspace)

        sessiondir = self.sessiondir

        rmdir(join(sessiondir, WORKSPACE_FILES_FOLDER), 'workspace files')
        rmdir(join(sessiondir, SCRIPT_FILES_FOLDER), 'script files')
        rmdir(join(sessiondir, VALUES_FOLDER), 'values')
        rmdir(join(sessiondir, UPLOAD_FOLDER), 'upload')
        rmdir(sessiondir, 'session')


def set_session():
    if 'uid' not in session:
        session['uid'] = str(uuid.uuid4())

    uid = session['uid']
    if not hasattr(current_thread(), 's_name'):
        current_thread().s_name = current_thread().name
    current_thread().name = 'S-%s-%s' % (current_thread().s_name[12:], uid[:6])
    return uid


def init_session():
    uid = set_session()

    if uid not in USER_DATA:
        USER_DATA[uid] = UserData()

    ud = USER_DATA[uid]
    ud.timestamp = time()

    sessiondir = ud.sessiondir

    makedirs(sessiondir, 'session')
    makedirs(join(sessiondir, UPLOAD_FOLDER), 'upload')
    makedirs(join(sessiondir, VALUES_FOLDER), 'values')
    makedirs(join(sessiondir, SCRIPT_FILES_FOLDER), 'script files')
    makedirs(join(sessiondir, WORKSPACE_FILES_FOLDER), 'workspace files')

    return (ud.diagrams, ud.scripts, ud.getscriptcount, ud.scifile,
            ud.datafiles, sessiondir, ud.diagramlock)


def clean_sessions(final=False):
    current_thread().name = 'Clean'
    totalcount = 0
    cleanuids = []
    for uid, ud in USER_DATA.items():
        totalcount += 1
        if final or time() - ud.timestamp > config.SESSIONTIMEOUT:
            cleanuids.append(uid)

    logger.info('cleaning %s/%s sessions', len(cleanuids), totalcount)
    for uid in cleanuids:
        current_thread().name = 'Clean-%s' % uid[:6]
        try:
            logger.info('cleaning')
            ud = USER_DATA.pop(uid)
            ud.clean()
        except Exception as e:
            logger.warning('could not clean: %s', str(e))


def clean_sessions_thread():
    current_thread().name = 'Clean'
    while True:
        gevent.sleep(config.SESSIONTIMEOUT / 2)
        try:
            clean_sessions()
        except Exception as e:
            logger.warning('Exception in clean_sessions: %s', str(e))


def get_diagram(xcos_file_id, remove=False):
    if not xcos_file_id:
        logger.warning('no id')
        return None
    xcos_file_id = int(xcos_file_id)

    (diagrams, __, __, __, __, __, __) = init_session()

    if xcos_file_id < 0 or xcos_file_id >= len(diagrams):
        logger.warning('id %s not in diagrams', xcos_file_id)
        return None

    diagram = diagrams[xcos_file_id]

    if remove:
        diagrams[xcos_file_id] = Diagram()

    return diagram


def add_diagram():
    (diagrams, scripts, __, __, __, sessiondir, diagramlock) = init_session()

    with diagramlock:
        diagram = Diagram()
        diagram.diagram_id = str(len(diagrams))
        diagram.sessiondir = sessiondir
        diagrams.append(diagram)

    return (diagram, scripts, sessiondir)


def add_datafile():
    (__, __, __, __, datafiles, sessiondir, __) = init_session()

    datafile = DataFile()
    datafile.sessiondir = sessiondir
    datafiles.append(datafile)

    return (datafile, sessiondir, str(len(datafiles)))


def get_script(script_id, scripts=None, remove=False):
    if script_id is None:
        return None
    if not script_id:
        logger.warning('no id')
        return None

    if scripts is None:
        (__, scripts, __, __, __, __, __) = init_session()

    if script_id not in scripts:
        logger.warning('id %s not in scripts', script_id)
        return None

    script = scripts[script_id]

    if remove:
        del scripts[script_id]

    return script


def add_script():
    (__, scripts, getscriptcount, __, __, sessiondir, __) = init_session()

    script_id = getscriptcount()

    script = Script()
    script.script_id = script_id
    script.sessiondir = sessiondir
    scripts[script_id] = script

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
        if line_words[0] == "Initialization":
            # New figure created
            # Get fig id
            # to extract figure ids (sometime multiple sinks can be used in one
            # diagram to differentiate that)
            figure_id = line_words[-1]
            return (figure_id, INITIALIZATION)
        elif line_words[0] == "Ending":
            # Current figure end
            # Get fig id
            figure_id = line_words[-1]
            return (figure_id, ENDING)
        else:
            # Current figure coordinates
            figure_id = line_words[2]
            return (figure_id, DATA)
    except Exception as e:
        logger.error('%s while parsing %s on line %s', str(e), line, lineno)
        return (None, NOLINE)


def get_line_and_state(file, figure_list, lineno, incomplete_line):
    '''
    Function to get a new line from file
    This also parses the line and appends new figures to figure List
    '''
    line = file.readline()  # read line by line from log
    if not line:            # if line is empty then return noline
        return (incomplete_line, NOLINE)
    if incomplete_line is not None:
        line = incomplete_line + line
    if '\n' not in line:
        return (line, NOLINE)
    # every line is passed to function parse_line for getting values
    line = line.rstrip()
    parse_result = parse_line(line, lineno)
    figure_id = parse_result[0]
    state = parse_result[1]
    if state == INITIALIZATION:
        # New figure created
        # Add figure ID to list
        figure_list.append(figure_id)  # figure id of block is added to list
        return (None, INITIALIZATION)
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

    with logfilefdrlock:
        if logfilefd != LOGFILEFD:
            os.dup2(logfilefd, LOGFILEFD)
            os.close(logfilefd)

        try:
            proc = subprocess.Popen(
                cmdarray,
                stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                stderr=subprocess.PIPE, start_new_session=True,
                universal_newlines=True, pass_fds=(LOGFILEFD, ))
        except FileNotFoundError:
            logger.critical('scilab has not been built. '
                            'Follow the installation instructions')
            proc = None
            remove(log_name)
            log_name = None

        os.close(LOGFILEFD)

    return (proc, log_name)


def run_scilab(command, base, createlogfile=False, timeout=70):
    instance = get_scilab_instance()
    if instance is None:
        logger.error('cannot run command %s', command)
        return None

    cmd = command + SCILAB_END
    logger.info('running command %s', cmd)
    instance.proc.stdin.write(cmd)

    if not createlogfile:
        remove(instance.log_name)
        instance.log_name = None

    instance.base = base
    instance.starttime = time()
    instance.endtime = time() + timeout
    return instance


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


@app.route('/uploaddatafile', methods=['POST'])
def uploaddatafile():
    '''
    Below route is called for uploading audio/other file.
    '''
    # Get the au/other data file
    file = request.files['file']
    # Check if the data file is not null
    if not file:
        msg = "Error occured while uploading file. Please try again\n"
        rv = {'msg': msg}
        return Response(json.dumps(rv), mimetype='application/json')

    (datafile, sessiondir, currlen) = add_datafile()
    fname = join(sessiondir, UPLOAD_FOLDER, currlen + '@@'
                 + secure_filename(file.filename))
    file.save(fname)
    datafile.data_filename = fname
    rv = {'filepath': datafile.data_filename}
    return Response(json.dumps(rv), mimetype='application/json')


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
    command = "exec('%s');save('%s');" % (fname, wfname)

    script.instance = run_scilab(command, script)

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
        logger.warning('no script')
        msg = "no script"
        rv = {'msg': msg}
        return Response(json.dumps(rv), mimetype='application/json')

    instance = script.instance
    if instance is None:
        logger.warning('no instance')
        msg = "no instance"
        rv = {'msg': msg}
        return Response(json.dumps(rv), mimetype='application/json')

    proc = instance.proc

    try:
        # output from scilab terminal is saved for checking error msg
        output = proc.communicate(timeout=30)[0]
        output = clean_output(output)
        remove_scilab_instance(script.instance)
        script.instance = None

        returncode = proc.returncode
        if returncode < 0 or returncode == 2:
            logger.warning('return code is %s', returncode)
            msg = 'Script stopped'
            script.status = -5
            rv = {'status': script.status, 'msg': msg, 'output': output}
            return Response(json.dumps(rv), mimetype='application/json')
        if returncode > 0:
            logger.info('return code is %s', returncode)
            if output:
                logger.info('=== Output from scilab console ===\n%s', output)

        # if error is encountered while execution of script file, then error
        # message is returned to the user
        if '!--error' in output:
            msg = ("Check result window for details.\n"
                   "Please edit the script and execute again.\n")
            script.status = -3
            rv = {'status': script.status, 'msg': msg, 'output': output}
            return Response(json.dumps(rv), mimetype='application/json')

        logger.info('workspace for %s saved in %s',
                    script.script_id, script.workspace_filename)
        msg = ''
        script.status = 0

        cmd = list_variables(script.workspace_filename)
        script.instance = run_scilab(cmd, script)
        instance = script.instance

        if instance is None:
            msg = "Resource not available"
            script.status = -2
            rv = {'status': script.status, 'msg': msg}
            return Response(json.dumps(rv), mimetype='application/json')

        proc = instance.proc
        listoutput = proc.communicate(timeout=10)[0]
        remove_scilab_instance(script.instance)
        script.instance = None

        returncode = proc.returncode
        if returncode < 0 or returncode == 2:
            logger.warning('return code is %s', returncode)
            msg = 'Script stopped'
            script.status = -5
            rv = {'status': script.status, 'msg': msg, 'output': listoutput}
            return Response(json.dumps(rv), mimetype='application/json')
        if returncode > 0:
            logger.info('return code is %s', returncode)
            if listoutput:
                logger.info('=== List output from scilab console ===\n%s',
                            listoutput)
        try:
            listoutput = listoutput.strip()
            variables = json.loads(listoutput)
        except Exception as e:
            logger.warning('error while loading: %s: %s', listoutput, str(e))
            variables = []

        rv = {'script_id': script.script_id, 'status': script.status,
              'msg': msg, 'output': output, 'returncode': returncode,
              'variables': variables}
        return Response(json.dumps(rv), mimetype='application/json')
    except subprocess.TimeoutExpired:
        kill_script(script)
        msg = 'Timeout'
        script.status = -4
        rv = {'status': script.status, 'msg': msg}
        return Response(json.dumps(rv), mimetype='application/json')
    except UnicodeDecodeError:
        kill_script(script)
        msg = 'Unicode Decode Error'
        script.status = -6
        rv = {'status': script.status, 'msg': msg}
        return Response(json.dumps(rv), mimetype='application/json')


@app.route('/stopscript', methods=['POST'])
def kill_script(script=None):
    '''Below route is called for stopping a running script file.'''
    if script is None:
        script = get_script(get_script_id(), remove=True)
        if script is None:
            # when called with same script_id again or with incorrect script_id
            logger.warning('no script')
            return "error"

    logger.info('kill_script: script=%s', script)

    stop_scilab_instance(script)

    if script.filename is None:
        logger.warning('empty script')
    else:
        remove(script.filename)
        script.filename = None

    if script.workspace_filename is None:
        logger.warning('empty workspace')
    else:
        remove(script.workspace_filename)
        script.workspace_filename = None

    return "ok"


@app.route('/stopscifile')
def kill_scifile(scifile=None):
    '''Below route is called for stopping a running sci file.'''
    if scifile is None:
        (__, __, __, scifile, __, __, __) = init_session()

    logger.info('kill_scifile: scifile=%s', scifile)

    stop_scilab_instance(scifile)

    return "ok"


@app.route('/requestfilename')
def sendfile():
    '''
    This route is used in chart.js for sending image filename
    '''
    diagram = get_diagram(get_request_id())
    if diagram is None:
        logger.warning('no diagram')
        return ''
    if diagram.file_image == '':
        logger.warning('no diagram image')
        return ''

    return IMAGEURLDIR + diagram.file_image


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
        logger.warning('could not kill %s with signal %s', proc.pid, sgnl)
        return False
    except TypeError:
        logger.warning('could not kill invalid process with signal %s', sgnl)
        return True

    for i in range(0, 20):
        gevent.sleep(LOOK_DELAY)
        if proc.poll() is not None:
            return True
    return False


def get_request_id(key='id'):
    args = request.args
    if args is None:
        logger.warning('No args in request')
        return ''
    if key not in args:
        logger.warning('No %s in request.args', key)
        return ''
    value = args[key]
    if re.fullmatch(r'[0-9]+', value):
        return value
    displayvalue = value if len(
        value) <= DISPLAY_LIMIT + 3 else value[:DISPLAY_LIMIT] + '...'
    logger.warning('Invalid value %s for %s in request.args',
                   displayvalue, key)
    return ''


def get_script_id(key='script_id', default=''):
    form = request.form
    if form is None:
        logger.warning('No form in request')
        return default
    if key not in form:
        logger.warning('No %s in request.form', key)
        return default
    value = form[key]
    if re.fullmatch(r'[0-9]+', value):
        return value
    displayvalue = value if len(
        value) <= DISPLAY_LIMIT + 3 else value[:DISPLAY_LIMIT] + '...'
    logger.warning('Invalid value %s for %s in request.form',
                   displayvalue, key)
    return default


def kill_scilab(diagram=None):
    '''Define function to kill scilab(if still running) and remove files'''
    if diagram is None:
        diagram = get_diagram(get_request_id(), True)

    if diagram is None:
        logger.warning('no diagram')
        return
    logger.info('kill_scilab: diagram=%s', diagram)

    stop_scilab_instance(diagram, True)

    if diagram.xcos_file_name is None:
        logger.warning('empty diagram')
    else:
        # Remove xcos file
        remove(diagram.xcos_file_name)
        diagram.xcos_file_name = None

    if diagram.file_image != '':
        logger.warning('not removing %s', diagram.file_image)

    stopDetailsThread(diagram)


def list_variables(filename):
    '''
    add scilab commands to list only user defined variables
    '''

    command = "[__V1,__V2,__V3]=listvarinfile('%s');" % filename
    command += "__V5=grep(string(__V2),'/^([124568]|1[7])$/','r');"
    command += "__V1=__V1(__V5);"
    command += "__V2=__V2(__V5);"
    command += "__V3=list(__V3(__V5));"
    command += "__V5=grep(__V1,'/^[^%]+$/','r');"
    command += "if ~isempty(__V5) then;"
    command += "__V1=__V1(__V5);"
    command += "__V2=__V2(__V5);"
    command += "__V3=list(__V3(__V5));"
    command += "__V6=''''+strcat(__V1,''',''')+'''';"
    command += "__V7='load(''%s'','+__V6+');';" % filename
    command += "execstr(__V7);"
    command += "__V9='[';"
    command += "for __V8=1:size(__V5,2) do;"
    command += "__V18=__V1(__V8);"
    command += "__V28=__V2(__V8);"
    command += "__V38=__V3(__V8);"
    command += "__V9=__V9+'{\"\"name\"\":\"\"'+__V18+'\"\",'+"
    command += "'\"\"type\"\":\"\"'+string(__V28)+'\"\",'+"
    command += "'\"\"size\"\":\"\"'+sci2exp(__V38)+'\"\",'+"
    command += "'\"\"value\"\":\"\"';"
    command += "if size(__V38,2)>1 then;"
    command += "__V10=__V38(1)*__V38(2);"
    command += "else;"
    command += "__V10=__V38;"
    command += "end;"
    command += "if __V10<=100 then;"
    command += "__V9=__V9+sci2exp(eval(__V18));"
    command += "end;"
    command += "__V9=__V9+'\"\"}';"
    command += "if __V8<size(__V5,2) then;"
    command += "__V9=__V9+',';"
    command += "end;"
    command += "end;"
    command += "__V9=__V9+']';"
    command += "printf('%s',__V9);"
    command += "end;"
    return command


def load_variables(filename):
    '''
    add scilab commands to load only user defined variables
    '''

    command = "[__V1,__V2]=listvarinfile('%s');" % filename
    command += "__V5=grep(string(__V2),'/^([124568]|1[7])$/','r');"
    command += "__V1=__V1(__V5);"
    command += "__V2=__V2(__V5);"
    command += "__V5=grep(__V1,'/^[^%]+$/','r');"
    command += "if ~isempty(__V5) then;"
    command += "__V1=__V1(__V5);"
    command += "__V2=__V2(__V5);"
    command += "__V6=''''+strcat(__V1,''',''')+'''';"
    command += "__V7='load(''%s'','+__V6+');';" % filename
    command += "execstr(__V7);"
    command += "end;"
    command += "clear __V1 __V2 __V5 __V6 __V7;"
    return command


@app.route('/start_scilab')
def start_scilab():
    '''
    function to execute xcos file using scilab (scilab-adv-cli), access log
    file written by scilab

    This function is called in app route 'start_scilab' below
    '''
    diagram = get_diagram(get_request_id())
    if diagram is None:
        logger.warning('no diagram')
        return "error"

    # name of primary workspace file
    workspace_filename = diagram.workspace_filename
    # name of workspace file
    workspace = join(diagram.sessiondir, WORKSPACE_FILES_FOLDER,
                     "workspace.dat")

    if diagram.workspace_counter in (2, 3) and not exists(workspace):
        logger.warning('no workspace')
        return ("Workspace does not exist. "
                "Please simulate a diagram with TOWS_c block first. "
                "Do not use any FROMWSB block in that diagram.")

    loadfile = workspace_filename is not None or \
        diagram.workspace_counter in (2, 3)

    command = ""

    if loadfile:
        # ignore import errors
        command += "errcatch(-1,'continue');"

        if workspace_filename is not None:
            command += load_variables(workspace_filename)

        if diagram.workspace_counter in (2, 3):
            # 3 - for both TOWS_c and FROMWSB and also workspace dat file exist
            # In this case workspace is saved in format of dat file (Scilab way
            # of saying workpsace)
            # For FROMWSB block and also workspace dat file exist
            command += load_variables(workspace)

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
    command += "importXcosDiagram('%s');" % diagram.xcos_file_name
    command += "xcos_simulate(scs_m,4);"

    if diagram.workspace_counter == 4:
        # For AFFICH-m block
        pass
    elif diagram.workspace_counter == 5:
        # For Sci-Func block (Image are return as output in some cases)
        diagram.file_image = 'img-%s-%s.jpg' % (
            datetime.now().strftime('%Y%m%d'), str(uuid.uuid4()))
        command += "xs2jpg(gcf(),'%s/%s');" % (IMAGEDIR, diagram.file_image)
    elif config.CREATEIMAGE:
        # For all other block
        command += "xs2jpg(gcf(),'%s/%s');" % (IMAGEDIR, 'img_test.jpg')

    if diagram.workspace_counter in (1, 3):
        if diagram.save_variables:
            command += "save('%s','%s');" % (
                workspace, "','".join(diagram.save_variables))
        else:
            command += "save('%s');" % workspace

    diagram.instance = run_scilab(command, diagram, True,
                                  config.SCILAB_INSTANCE_TIMEOUT_INTERVAL + 60)

    if diagram.instance is None:
        return "Resource not available"

    instance = diagram.instance
    logger.info('log_name=%s', instance.log_name)

    # Start sending log to chart function for creating chart
    try:
        # For processes taking less than 10 seconds
        scilab_out = instance.proc.communicate(timeout=4)[0]
        scilab_out = re.sub(r'^[ !\\-]*\n', r'',
                            scilab_out, flags=re.MULTILINE)
        if scilab_out:
            logger.info('=== Output from scilab console ===\n%s', scilab_out)
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

        if "Simulation problem:" in scilab_out:
            remove_scilab_instance(diagram.instance)
            diagram.instance = None
            return "Error in simulation. Please check script uploaded/executed"

        if "Cannot find scilab-bin" in scilab_out:
            remove_scilab_instance(diagram.instance)
            diagram.instance = None
            return ("scilab has not been built. "
                    "Follow the installation instructions")

        if os.stat(instance.log_name).st_size == 0 and \
                diagram.workspace_counter not in (1, 5):
            remove_scilab_instance(diagram.instance)
            diagram.instance = None
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
    diagram = get_diagram(get_request_id())
    if diagram is None:
        logger.warning('no diagram')
        yield "event: ERROR\ndata: no diagram\n\n"
        return

    # Open the log file
    if not isfile(diagram.instance.log_name):
        logger.warning('log file does not exist')
        yield "event: ERROR\ndata: no log file found\n\n"
        remove_scilab_instance(diagram.instance)
        diagram.instance = None
        return
    while os.stat(diagram.instance.log_name).st_size == 0 and \
            diagram.instance.proc.poll() is None:
        gevent.sleep(LOOK_DELAY)
    if os.stat(diagram.instance.log_name).st_size == 0 and \
            diagram.instance.proc.poll() is not None:
        if diagram.workspace_counter == 1:
            # for Only TOWS_c block
            logger.info('variables are saved in workspace')
            yield "event: MESSAGE\ndata: Workspace saved successfully\n\n"
        elif diagram.workspace_counter == 5:
            logger.info('image created')
            yield "event: DONE\ndata: None\n\n"
        else:
            logger.warning('log file is empty')
            yield "event: ERROR\ndata: log file is empty\n\n"
        remove_scilab_instance(diagram.instance)
        diagram.instance = None
        return

    with open(diagram.instance.log_name, "r") as log_file:
        # Start sending log
        duplicatelineno = 0
        duplicatelines = 0
        lastline = ''
        lineno = 0
        line = None
        endtime = time() + config.SCILAB_INSTANCE_TIMEOUT_INTERVAL
        log_size = 0
        while time() <= endtime and log_size <= config.MAX_LOG_SIZE:
            (line, state) = get_line_and_state(log_file, diagram.figure_list,
                                               lineno, line)
            # if incomplete line, wait for the complete line
            if state == NOLINE:
                gevent.sleep(LOOK_DELAY)
                continue
            if not diagram.figure_list:
                break
            # Get the line and loop until the state is ENDING and figure_list
            # empty. Determine if we get block id and give it to chart.js
            if line is None:
                continue
            if lastline != line:
                if duplicatelineno != 0:
                    duplicatelines += duplicatelineno
                    yield "event: duplicate\ndata: %d\n\n" % duplicatelineno
                    duplicatelineno = 0
                lastline = line
                log_size += len(line)
                if state == DATA:
                    yield "event: log\ndata: %s\n\n" % line
            else:
                duplicatelineno += 1
            lineno += 1
            line = None

        if duplicatelineno != 0:
            duplicatelines += duplicatelineno
            yield "event: duplicate\ndata: %d\n\n" % duplicatelineno
            duplicatelineno = 0

        if duplicatelines != 0:
            logger.info('lines = %s, duplicate lines = %s, log size = %s',
                        lineno, duplicatelines, log_size)
        else:
            logger.info('lines = %s, log size = %s', lineno, log_size)

    # Finished Sending Log
    kill_scilab(diagram)

    # Notify Client
    yield "event: DONE\ndata: None\n\n"


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
    (diagram, scripts, sessiondir) = add_diagram()
    script = get_script(get_script_id(default=None), scripts=scripts)
    if script is not None:
        diagram.workspace_filename = script.workspace_filename
    # Save the file in xml extension and using it for further modification
    # by using xml parser
    temp_file_xml_name = diagram.diagram_id + ".xml"
    file.save(temp_file_xml_name)
    new_xml = minidom.parse(temp_file_xml_name)

    # to identify if we have to load or save to workspace or neither #0 if
    # neither TOWS_c or FROMWSB found
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
        interfaceFunctionName = block.getAttribute("interfaceFunctionName")
        if interfaceFunctionName == "AFFICH_m":
            diagram.workspace_counter = 4

    # List to contain all the block IDs of tkscales so that we can create
    # read blocks with these IDs
    block_id = []
    for block in blocks:
        interfaceFunctionName = block.getAttribute("interfaceFunctionName")
        if interfaceFunctionName == "TKSCALE":
            block_id.append(block.getAttribute("id"))
            block.setAttribute('id', '-1')
            tk_is_present = True
            # Changed the ID of tkscales to -1 so that virtually the
            # tkscale blocks get disconnected from diagram at the backend
        # Taking workspace_counter 1 for TOWS_c and 2 for FROMWSB
        elif interfaceFunctionName == "scifunc_block_m":
            diagram.workspace_counter = 5
        elif interfaceFunctionName == "TOWS_c":
            if block.childNodes:
                for node in block.childNodes:
                    if not isinstance(node, minidom.Element):
                        continue
                    if node.getAttribute("as") != "exprs":
                        continue
                    if node.childNodes is None:
                        continue
                    childCount = 0
                    for childChildNode in node.childNodes:
                        if not isinstance(childChildNode, minidom.Element):
                            continue
                        childCount += 1
                        if childCount != 2:
                            continue
                        value = childChildNode.getAttribute("value")
                        if value is not None:
                            diagram.save_variables.add(value)
                        break
            diagram.workspace_counter = 1
            flag1 = 1
        elif interfaceFunctionName == "FROMWSB":
            diagram.workspace_counter = 2
            flag2 = 1
    if diagram.save_variables:
        logger.info("save variables = %s", diagram.save_variables)
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
    set_session()
    url = request.form['url']
    if url == '' or '.' in url or url[0] != '/' or url[-1] != '/':
        return "error"
    filelist = [url + f for f in os.listdir(BASEDIR + url)]
    return Response(json.dumps(filelist), mimetype='application/json')


@app.route('/UpdateTKfile', methods=['POST'])
def UpdateTKfile():
    diagram = get_diagram(get_request_id())
    if diagram is None:
        logger.warning('no diagram')
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
        logger.warning('downloadfile=%s', fn)
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
        logger.warning('deletefile=%s', fn)
        return "error"
    remove(fn)  # deleting the file
    return "0"


@app.route('/SendLog')
def sse_request():
    '''Set response method to event-stream'''
    return Response(event_stream(), mimetype='text/event-stream')


@app.route('/<path:path>')
def static_file(path):
    set_session()
    return app.send_static_file(path)


@app.route('/version-<version>/webapp/<path:path>')
def versioned_static_file(version, path):
    set_session()
    return app.send_static_file(path)


@app.route('/stop')
def stop():
    '''route to kill scilab on closing of chart'''
    kill_scilab()
    return "done"


@app.route('/endBlock/<fig_id>')
def endBlock(fig_id):
    '''route to end blocks with no Ending parameter'''
    diagram = get_diagram(get_request_id())
    if diagram is None:
        logger.warning('no diagram')
        return

    diagram.figure_list.remove(fig_id)
    return "done"


@app.route('/')
def page():
    set_session()
    version_check()
    return render_template('index.html',
                           example_content='',
                           example_filename='',
                           prerequisite_content='',
                           prerequisite_filename='')


@app.route('/internal/<internal_key>', methods=['POST'])
def internal_fun(internal_key):
    (__, __, __, scifile, __, sessiondir, __) = init_session()

    if internal_key not in config.INTERNAL:
        msg = internal_key + ' not found'
        logger.warning(msg)
        return jsonify({'msg': msg})
    internal_data = config.INTERNAL[internal_key]

    cmd = ""
    for f in internal_data['scriptfiles']:
        scriptfile = join(ROOTDIR, f)
        cmd += "exec('%s');" % scriptfile
    file_name = join(sessiondir, internal_key + ".txt")
    function = internal_data['function']
    parameters = internal_data['parameters']
    if 'num' in parameters:
        p = 's'
        cmd += "%s=poly(0,'%s');" % (p, p)
        p = 'z'
        cmd += "%s=poly(0,'%s');" % (p, p)
    cmd += "%s('%s'" % (function, file_name)
    for parameter in parameters:
        if parameter not in request.form:
            msg = parameter + ' parameter is missing'
            logger.warning(msg)
            return jsonify({'msg': msg})
        value = request.form[parameter]
        if re.search(SYSTEM_COMMANDS, value):
            msg = parameter + ' parameter has unsafe value'
            logger.warning(msg)
            return jsonify({'msg': msg})
        if re.search(SPECIAL_CHARACTERS, value):
            msg = parameter + ' parameter has value with special characters'
            logger.warning(msg)
            return jsonify({'msg': msg})
        if 'num' in parameters:
            cmd += ",%s" % value
        else:
            cmd += ",'%s'" % value
    cmd += ");"

    if scifile.instance is not None:
        msg = 'Cannot execute more than one script at the same time.'
        return jsonify({'msg': msg})

    scifile.instance = run_scilab(cmd, scifile)
    if scifile.instance is None:
        msg = "Resource not available"
        return jsonify({'msg': msg})

    proc = scifile.instance.proc
    (out, err) = proc.communicate()
    out = re.sub(r'^[ !\\-]*\n', r'', out, flags=re.MULTILINE)
    if out:
        logger.info('=== Output from scilab console ===\n%s', out)
    if err:
        logger.info('=== Error from scilab console ===\n%s', err)
    remove_scilab_instance(scifile.instance)
    scifile.instance = None

    if not isfile(file_name):
        msg = "Output file not available"
        logger.warning(msg)
        return jsonify({'msg': msg})

    with open(file_name) as f:
        data = f.read()  # Read the data into a variable

    remove(file_name)

    return data


# example page start ###################

def connection():
    conn = sqlite3.connect(DB_NAME)
    return conn.cursor()


@cache.memoize()
def db_query(query, parameters=None):
    cur = connection()
    try:
        if parameters is not None:
            cur.execute(query, parameters)
        else:
            cur.execute(query)
        return cur.fetchall()
    except Exception as e:
        logger.error('error in db_query: %s %s', query, str(e))
        return None


@app.route('/example')
def example_page():
    set_session()
    version_check()

    try:
        example_file_id = request.args.get('example_file_id')
        example_id = request.args.get('example_id')
        chapter_id = request.args.get('chapter_id')
        book_id = request.args.get('book_id')
        category_id = request.args.get('cat_id')

        if example_file_id is not None:
            result = db_query(config.QUERY_ID_EXAMPLE_FILE, [example_file_id])
            if len(result) > 0:
                (category_id, book_id, chapter_id, example_id) = result[0]
                example_file_id = int(example_file_id)
            else:
                example_file_id = None
        elif example_id is not None:
            result = db_query(config.QUERY_ID_EXAMPLE, [example_id])
            if len(result) > 0:
                (category_id, book_id, chapter_id) = result[0]
                example_id = int(example_id)
            else:
                example_id = None
        elif chapter_id is not None:
            result = db_query(config.QUERY_ID_CHAPTER, [chapter_id])
            if len(result) > 0:
                (category_id, book_id) = result[0]
                chapter_id = int(chapter_id)
            else:
                chapter_id = None
        elif book_id is not None:
            result = db_query(config.QUERY_ID_BOOK, [book_id])
            if len(result) > 0:
                (category_id, ) = result[0]
                book_id = int(book_id)
            else:
                book_id = None
        elif category_id is not None:
            category_id = int(category_id)

        if category_id is not None:
            logger.info("ids = %s %s %s %s %s", category_id, book_id,
                        chapter_id, example_id, example_file_id)

        book = db_query(config.QUERY_BOOK, [category_id]) \
            if category_id is not None else None
        chapter = db_query(config.QUERY_CHAPTER, [book_id]) \
            if book_id is not None else None
        example = db_query(config.QUERY_EXAMPLE, [chapter_id]) \
            if chapter_id is not None else None
        example_file = db_query(config.QUERY_EXAMPLE_FILE, [example_id]) \
            if example_id is not None else None

        count = db_query(config.QUERY_COUNT)[0][0]
        category = db_query(config.QUERY_CATEGORY)
        return render_template('example.html',
                               count=count,
                               category=category,
                               category_id=category_id,
                               book=book,
                               book_id=book_id,
                               chapter=chapter,
                               chapter_id=chapter_id,
                               example=example,
                               example_id=example_id,
                               example_file=example_file,
                               example_file_id=example_file_id)
    except Exception as e:
        return str(e)


@app.route('/ex')
@app.route('/ea<s>')
@app.route('/exa')
@app.route('/exm<s>')
@app.route('/exam')
@app.route('/exam<s>')
@app.route('/exap<s>')
def redirect_to_example_page(s=''):
    set_session()
    url = flask.url_for('example_page')
    qs = request.query_string.decode('utf-8', 'ignore')
    if len(qs) > 0:
        url += '?' + qs
    return flask.redirect(url)


@app.route('/get_book', methods=['GET', 'POST'])
def ajax_get_book():
    set_session()
    category_id = request.args.get('catid')
    try:
        book = db_query(config.QUERY_BOOK, [category_id])
        return jsonify(book)
    except Exception as e:
        return str(e)


@app.route('/get_chapter', methods=['GET', 'POST'])
def ajax_get_chapter():
    set_session()
    book_id = request.args.get('bookid')
    try:
        chapter = db_query(config.QUERY_CHAPTER, [book_id])
        return jsonify(chapter)
    except Exception as e:
        return str(e)


@app.route('/get_example', methods=['GET', 'POST'])
def ajax_get_example():
    set_session()
    chapter_id = request.args.get('chapterid')
    try:
        example = db_query(config.QUERY_EXAMPLE, [chapter_id])
        return jsonify(example)
    except Exception as e:
        return str(e)


@app.route('/get_example_file', methods=['GET', 'POST'])
def ajax_get_example_file():
    set_session()
    example_id = request.args.get('exampleid')
    try:
        example_file = db_query(config.QUERY_EXAMPLE_FILE, [example_id])
        return jsonify(example_file)
    except Exception as e:
        return str(e)


@app.route('/get_contributor_details', methods=['GET', 'POST'])
def ajax_get_contributor_details():
    set_session()
    book_id = request.args.get('book_id')
    try:
        details = db_query(config.QUERY_CONTRIBUTOR_DETAILS, [book_id])
        return jsonify(details)
    except Exception as e:
        return str(e)


def clean_text(s):
    return re.sub(r'[ \t]*[\r\n]+[ \t]*', r'', s)


def get_example_file(example_file_id):
    filename = 'example.xcos'
    filepath = ''
    data = db_query(config.QUERY_EXAMPLE_FILE_BY_ID, [example_file_id])
    for (filename, filepath, example_id) in data:
        pass

    if XCOSSOURCEDIR != '' and filepath != '':
        try:
            logger.info('reading %s from %s', filename, filepath)
            with open(join(XCOSSOURCEDIR, filepath), 'r', encoding='utf-8') as f:
                text = clean_text(f.read())
                return (text, filename, example_id)
        except Exception as e:
            logger.warning('Exception: %s', str(e))

    scilab_url = "https://scilab.in/download/file/" + example_file_id
    logger.info('downloading %s', scilab_url)
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
    data = db_query(config.QUERY_PREREQUISITE_FILE_BY_ID, [file_id])
    for (filename, filepath) in data:
        pass

    return return_prerequisite_file(filename, filepath, file_id, False)


def get_prerequisite_file_by_example_id(example_id):
    filename = ''
    filepath = ''
    file_id = None
    data = db_query(config.QUERY_PREREQUISITE_FILE_BY_EXAMPLE_ID, [example_id])
    for (filename, filepath, file_id) in data:
        pass

    return return_prerequisite_file(filename, filepath, file_id, True)


def return_prerequisite_file(filename, filepath, file_id, forindex):
    if file_id is None:
        return ('', filename)

    if XCOSSOURCEDIR != '' and filepath != '':
        try:
            logger.info('reading %s from %s', filename, filepath)
            with open(join(XCOSSOURCEDIR, filepath), 'r', encoding='utf-8') as f:
                text = clean_text_2(f.read(), forindex)
                return (text, filename)
        except Exception as e:
            logger.warning('Exception: %s', str(e))

    scilab_url = "https://scilab.in/download/file/" + str(file_id)
    logger.info('downloading %s', scilab_url)
    r = requests.get(scilab_url)
    text = clean_text_2(r.text, forindex)
    return (text, filename)


@app.route('/example_file', methods=['GET', 'POST'])
def download_example_file():
    set_session()
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
    set_session()
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
    set_session()
    version_check()
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
    logger.info('starting')
    version_check()
    os.chdir(SESSIONDIR)
    worker = gevent.spawn(prestart_scilab_instances)
    worker.name = 'PreStart'
    reaper = gevent.spawn(reap_scilab_instances)
    reaper.name = 'Reaper'
    cleaner = gevent.spawn(clean_sessions_thread)
    cleaner.name = 'Clean'
    # Set server address from config
    http_server = WSGIServer(
        (config.HTTP_SERVER_HOST, config.HTTP_SERVER_PORT), app,
        log=logger,
        error_log=logger,
        handler_class=MyWSGIHandler)
    logger.info('listening: %s', http_server)
    try:
        http_server.serve_forever()
    except BaseException as e:
        msg = str(e)
        if msg:
            logger.error(msg)
            print(msg)
        gevent.kill(worker)
        gevent.kill(reaper)
        gevent.kill(cleaner)
        clean_sessions(True)
        stop_scilab_instances()
        logger.info('exiting')
