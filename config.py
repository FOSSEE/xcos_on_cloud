# The location of the extracted scilab_for_xcos_on_cloud. This can be either
# relative to SendLog.py or an absolute path.
SCILAB_DIR = '../scilab_for_xcos_on_cloud'

# The location to keep the flask session data on server.
FLASKSESSIONDIR = '/tmp/flask-sessiondir'

# The scilab branch
BRANCH = 'master'

# The location to keep the session data on server.
SESSIONDIR = '/tmp/sessiondir'
SESSIONTIMEOUT = 21600

SESSION_COOKIE_SAMESITE = 'Strict'
SESSION_COOKIE_SECURE = False

# The location to keep the flask caching data on server.
FLASKCACHINGDEFAULTTIMEOUT = 900
FLASKCACHINGDIR = '/tmp/flask-caching-dir'

# The location of the logs on server.
LOGDIR = '/tmp/xcos-on-cloud-logs'
LOGFILE = 'xcos.log'
LOGBACKUPCOUNT = 10

# The location of the xcos files on server.
XCOSSOURCEDIR = 'uploads'

# the http server settings

HTTP_SERVER_HOST = '127.0.0.1'
HTTP_SERVER_PORT = 8001

# the database server settings

DB_NAME = 'scilab.sqlite3'

# the instances

SCILAB_MIN_INSTANCES = 2
SCILAB_START_INSTANCES = 4
SCILAB_MAX_INSTANCES = 8
SCILAB_INSTANCE_RETRY_INTERVAL = 3

# the delay

TKSCALE_START_DELAY = 1.5
SCILAB_INSTANCE_TIMEOUT_INTERVAL = 300
MAX_LOG_SIZE = 512 * 1024

# the versioned files

VERSIONED_FILES = [
    "chart.js",
    "combined.js",
    "custom.js",
    "dependencies.js",
    "details.js",
    "example.html",
    "finalmodsheet.xsl",
    "importparameters.js",
    "indexfunctions.js",
    "LOOKUP_CURV.js",
    "only_scifunc_code.js",
    "orientation.js",
    "prerequisitefile.js",
    "setup.js",
    "Sigbuilder-graph.js",
]
VERSIONED_CHECK_INTERVAL = 15

# the database queries

QUERY_ID_EXAMPLE_FILE = (
    "SELECT loc.id, pe.id, tcc.id, tce.id "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "tcef.xcos_cloud_example_file_error_status = 0 AND "
    "pe.approval_status = 1 AND "
    "tcef.id = ? "
    "LIMIT 1")

QUERY_ID_EXAMPLE = (
    "SELECT loc.id, pe.id, tcc.id "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "tcef.xcos_cloud_example_file_error_status = 0 AND "
    "pe.approval_status = 1 AND "
    "tce.id = ? "
    "LIMIT 1")

QUERY_ID_CHAPTER = (
    "SELECT loc.id, pe.id "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "tcef.xcos_cloud_example_file_error_status = 0 AND "
    "pe.approval_status = 1 AND "
    "tcc.id = ? "
    "LIMIT 1")

QUERY_ID_BOOK = (
    "SELECT loc.id "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "tcef.xcos_cloud_example_file_error_status = 0 AND "
    "pe.approval_status = 1 AND "
    "pe.id = ? "
    "LIMIT 1")

QUERY_COUNT = (
    "SELECT COUNT(*), COUNT(DISTINCT(pe.id)) "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "tcef.xcos_cloud_example_file_error_status = 0 AND "
    "pe.approval_status = 1")

QUERY_CATEGORY = (
    "SELECT loc.id, loc.category_name, COUNT(*), COUNT(DISTINCT(pe.id)) "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "tcef.xcos_cloud_example_file_error_status = 0 AND "
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
    "tcef.xcos_cloud_example_file_error_status = 0 AND "
    "pe.approval_status = 1 AND "
    "pe.category = ? "
    "GROUP BY 1 "
    "ORDER BY 2 ASC")

QUERY_CHAPTER = (
    "SELECT tcc.id, tcc.number, tcc.name, COUNT(*) "
    "FROM textbook_companion_preference pe "
    "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
    "JOIN list_of_category loc ON pe.category = loc.id "
    "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
    "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
    "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
    "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
    "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND "
    "tcef.xcos_cloud_example_file_error_status = 0 AND "
    "pe.approval_status = 1 AND "
    "tcc.preference_id = ? "
    "GROUP BY 1 "
    "ORDER BY 2 ASC")

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
    "tcef.xcos_cloud_example_file_error_status = 0 AND "
    "pe.approval_status = 1 AND "
    "tce.chapter_id = ? "
    "ORDER BY tce.number ASC")

QUERY_EXAMPLE_FILE = (
    "SELECT id as example_file_id, filename, filetype "
    "FROM textbook_companion_example_files "
    "WHERE filetype IN ('X', 'S') AND "
    "xcos_cloud_example_file_error_status = 0 AND example_id = ? "
    "ORDER BY filetype DESC")

QUERY_EXAMPLE_FILE_BY_ID = (
    "SELECT filename, filepath, example_id "
    "FROM textbook_companion_example_files "
    "WHERE filetype = 'X' AND id = ?"
)

QUERY_PREREQUISITE_FILE_BY_ID = (
    "SELECT filename, filepath "
    "FROM textbook_companion_example_files "
    "WHERE filetype = 'S' AND id = ?"
)

QUERY_PREREQUISITE_FILE_BY_EXAMPLE_ID = (
    "SELECT filename, filepath, id as prerequisite_file_id "
    "FROM textbook_companion_example_files "
    "WHERE filetype = 'S' AND example_id = ?"
)

QUERY_CONTRIBUTOR_DETAILS = (
    "SELECT pe.id, pe.book, pe.author, pe.isbn, pe.publisher, "
    "po.full_name as proposal_full_name, po.branch as proposal_branch, "
    "po.university as proposal_university "
    "FROM textbook_companion_proposal po "
    "LEFT JOIN textbook_companion_preference pe ON po.id = pe.proposal_id "
    "WHERE pe.id = ?")

# Following are system command which are not permitted in sci files
# (Reference scilab-on-cloud project)
SYSTEM_COMMANDS = (
    r'unix\(.*\)|unix_g\(.*\)|unix_w\(.*\)|unix_x\(.*\)|unix_s\(.*\)|host'
    r'|newfun|execstr|ascii|mputl|dir\(\)'
)
SPECIAL_CHARACTERS = r'["\'\\]'

# The directory where images are created
IMAGEDIR = 'res_imgs'

# Set CREATEIMAGE to True to create img_test.jpg in IMAGEDIR
CREATEIMAGE = False

REMOVEFILE = True


SCILAB_CURVE_C_SCI = "macros/Sources/CURVE_c.sci"
SCILAB_EXPRESSION_SCI = "macros/Misc/EXPRESSION.sci"

CONT_FRM_WRITE = "ajax-scilab/cont_frm_write.sci"
CLEANDATA_SCI_FUNC_WRITE = "ajax-scilab/scifunc-cleandata-do_spline.sci"
EXP_SCI_FUNC_WRITE = "ajax-scilab/expression-sci-function.sci"
GET_COLORMAP_VALUES_SCI_FUNC_WRITE = "ajax-scilab/get_colormap_values.sci"
RANDFUNC = "ajax-scilab/randfunc.sci"


INTERNAL = {
    'getOutput': {
        'scriptfiles': [CONT_FRM_WRITE],
        'function': 'calculate_cont_frm',
        'parameters': ['num', 'den'],
    },
    'getExpressionOutput': {
        'scriptfiles': [SCILAB_EXPRESSION_SCI, EXP_SCI_FUNC_WRITE],
        'function': 'callFunctionAcctoMethod',
        'parameters': ['head', 'exx'],
    },
    'cleandata': {
        'scriptfiles': [SCILAB_CURVE_C_SCI, CLEANDATA_SCI_FUNC_WRITE],
        'function': 'callFunctioncleandata',
        'parameters': ['xye'],
    },
    'do_Spline': {
        'scriptfiles': [SCILAB_CURVE_C_SCI, CLEANDATA_SCI_FUNC_WRITE],
        'function': 'callFunction_do_Spline',
        'parameters': ['N', 'order', 'x', 'y'],
    },
    'get_colormap_values': {
        'scriptfiles': [GET_COLORMAP_VALUES_SCI_FUNC_WRITE],
        'function': 'getvaluesfromcolormap',
        'parameters': ['colormapString'],
    },
    'randfunc': {
        'scriptfiles': [RANDFUNC],
        'function': 'randfunc',
        'parameters': ['inputvalue'],
    }
}
