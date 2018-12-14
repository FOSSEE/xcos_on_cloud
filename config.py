# The location of the extracted scilab_for_xcos_on_cloud. This can be either
# relative to SendLog.py or an absolute path.
SCILAB_DIR = '../scilab_for_xcos_on_cloud'

# The location to keep the flask session data on server.
FLASKSESSIONDIR = '/tmp/flask-sessiondir'

# The location to keep the session data on server.
SESSIONDIR = '/tmp/sessiondir'

# the http server settings

HTTP_SERVER_HOST = '127.0.0.1'
HTTP_SERVER_PORT = 8001

# the database server settings

DB_HOST = '127.0.0.1'
DB_USER = 'scilab'
DB_PASS = ''
DB_NAME = 'scilab'
DB_PORT = 3306

# the database queries

QUERY_CATEGORY = (
        "SELECT DISTINCT(loc.id), loc.category_name "
        "FROM textbook_companion_preference pe "
        "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
        "JOIN list_of_category loc ON pe.category = loc.id "
        "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
        "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
        "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
        "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
        "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND pe.approval_status = 1 "
        "ORDER BY loc.id ASC"
        )

QUERY_BOOK = (
        "SELECT DISTINCT(pe.id), pe.book, pe.author "
        "FROM textbook_companion_preference pe "
        "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
        "JOIN list_of_category loc ON pe.category = loc.id "
        "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
        "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
        "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
        "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
        "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND pe.approval_status = 1 AND pe.category = %s "
        "ORDER BY pe.book ASC"
        )

QUERY_CHAPTER = (
        "SELECT DISTINCT(tcc.id), tcc.number, tcc.name "
        "FROM textbook_companion_preference pe "
        "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
        "JOIN list_of_category loc ON pe.category = loc.id "
        "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
        "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
        "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
        "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
        "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND pe.approval_status = 1 AND tcc.preference_id = %s "
        "ORDER BY tcc.number ASC"
        )

QUERY_EXAMPLE = (
        "SELECT DISTINCT(tce.id), tce.number, tce.caption "
        "FROM textbook_companion_preference pe "
        "JOIN textbook_companion_proposal po ON pe.proposal_id = po.id "
        "JOIN list_of_category loc ON pe.category = loc.id "
        "JOIN textbook_companion_chapter tcc ON pe.id = tcc.preference_id "
        "JOIN xcos_on_cloud_enable_book xceb ON pe.id = xceb.book_id "
        "JOIN textbook_companion_example tce ON tcc.id = tce.chapter_id "
        "JOIN textbook_companion_example_files tcef ON tce.id = tcef.example_id "
        "WHERE tcef.filetype = 'X' AND po.proposal_status = 3 AND pe.approval_status = 1 AND tce.chapter_id = %s "
        "ORDER BY tce.number"
        )

QUERY_EXAMPLE_FILE = (
        "SELECT id as example_file_id, filename "
        "FROM textbook_companion_example_files "
        "WHERE filetype = 'X' AND example_id = %s"
        )
