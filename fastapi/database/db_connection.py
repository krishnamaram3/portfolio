import mysql.connector
import datetime
import time
import os

class DBConnection:
    def __init__(self):
        self._db_con = None
        self._db_session = None

    def mysql_connect(self):
       self.__enter__()

    def __enter__(self):
        self._db_con = mysql.connector.connect(
        host=os.environ['DB_SERVER'],
        user=os.environ['DB_USR'],
        password=os.environ['DB_PWD'])
        self._db_session = self._db_con.cursor()
        return self._db_session
    
    def mysql_close(self):
        self.__exit__()

    def __exit__(self, exception_type=None, exception_value=None, traceback=None):
        if self._db_session:
            self._db_session.close()
        if self._db_con:
            self._db_con.close()