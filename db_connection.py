import MySQLdb
from config import DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT

def connection():
    conn = MySQLdb.connect(host=DB_HOST,
                           user=DB_USER,
                           passwd=DB_PASS,
                           db=DB_NAME,
                           port=DB_PORT)
    return conn.cursor()
