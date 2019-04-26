# The location of the extracted scilab_for_xcos_on_cloud. This can be either
# relative to SendLog.py or an absolute path.
SCILAB_DIR = '../scilab_for_xcos_on_cloud'

# The location to keep the flask session data on server.
FLASKSESSIONDIR = '/tmp/flask-sessiondir'

# The location to keep the session data on server.
SESSIONDIR = '/tmp/sessiondir'

# The location to keep the flask caching data on server.
FLASKCACHINGDEFAULTTIMEOUT = 900
FLASKCACHINGDIR = '/tmp/flask-caching-dir'

# The location of the logs on server.
LOGDIR = '/tmp/xcos-on-cloud-logs'
LOGFILE = 'xcos.log'
LOGBACKUPCOUNT = 10

# The location of the xcos files on server.
XCOSSOURCEDIR = ''

# the http server settings

HTTP_SERVER_HOST = '127.0.0.1'
HTTP_SERVER_PORT = 8001

# the database server settings

DB_HOST = '127.0.0.1'
DB_USER = 'scilab'
DB_PASS = ''
DB_NAME = 'scilab'
DB_PORT = 3306

# the instances

SCILAB_MIN_INSTANCES = 2
SCILAB_START_INSTANCES = 4
SCILAB_MAX_INSTANCES = 8

# the delay

TKSCALE_START_DELAY = 1.5
SCILAB_INSTANCE_TIMEOUT_INTERVAL = 300

# the versioned files

VERSIONED_FILES = [
    "chart.js",
    "combined.js",
    "custom.js",
    "dependencies.js",
    "details.js",
    "importparameters.js",
    "indexfunctions.js",
    "LOOKUP_CURV.js",
    "only_scifunc_code.js",
    "orientation.js",
    "prerequisitefile.js",
    "setup.js",
]
VERSIONED_CHECK_INTERVAL = 15

# the database queries

QUERY_COUNT = (
    "SELECT COUNT(*) "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "pe.approval_status = 1")

QUERY_CATEGORY = (
    "SELECT loc.id, loc.category_name, COUNT(*) "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "pe.approval_status = 1 "
    "GROUP BY 1 "
    "ORDER BY 2 ASC")

QUERY_BOOK = (
    "SELECT pe.id, pe.book, pe.author, COUNT(*) "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "pe.approval_status = 1 AND pe.category = %s "
    "GROUP BY 1 "
    "ORDER BY 2 ASC")

QUERY_CHAPTER = (
    "SELECT DISTINCT(tcc.id), tcc.number, tcc.name "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "pe.approval_status = 1 AND tcc.preference_id = %s "
    "ORDER BY tcc.number ASC")

QUERY_EXAMPLE = (
    "SELECT DISTINCT(tce.id), tce.number, tce.caption "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "pe.approval_status = 1 AND tce.chapter_id = %s "
    "ORDER BY tce.number ASC")

QUERY_EXAMPLE_FILE = (
    "SELECT id as example_file_id, filename, filetype "
    "FROM textbook_companion_example_files "
    "WHERE filetype IN ('X', 'S') AND example_id = %s "
    "ORDER BY filetype DESC")

QUERY_EXAMPLE_FILE_BY_ID = (
    "SELECT filename, filepath, example_id "
    "FROM textbook_companion_example_files "
    "WHERE filetype = 'X' AND id = %s"
)

QUERY_PREREQUISITE_FILE_BY_ID = (
    "SELECT filename, filepath "
    "FROM textbook_companion_example_files "
    "WHERE filetype = 'S' AND id = %s"
)

QUERY_PREREQUISITE_FILE_BY_EXAMPLE_ID = (
    "SELECT filename, filepath, id as prerequisite_file_id "
    "FROM textbook_companion_example_files "
    "WHERE filetype = 'S' AND example_id = %s"
)

QUERY_CONTRIBUTOR_DETAILS = (
    "SELECT pe.id, pe.book as preference_book, pe.author as preference_author, "
    "pe.isbn as preference_isbn, pe.publisher as preference_publisher, "
    "po.full_name as proposal_full_name, po.branch as proposal_branch, "
    "po.university as proposal_university "
    "FROM textbook_companion_proposal po "
    "LEFT JOIN textbook_companion_preference pe ON po.id = pe.proposal_id "
    "WHERE pe.id=%s")

# Following are system command which are not permitted in sci files
# (Reference scilab-on-cloud project)
SYSTEM_COMMANDS = (
    r'unix\(.*\)|unix_g\(.*\)|unix_w\(.*\)|unix_x\(.*\)|unix_s\(.*\)|host'
    r'|newfun|execstr|ascii|mputl|dir\(\)'
)

REMOVEFILE = True
