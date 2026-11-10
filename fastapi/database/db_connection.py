import os
from contextlib import closing, contextmanager

import mysql.connector
import psycopg


@contextmanager
def db_connection():
    database_type = os.environ.get("DB", "MySQL").strip().lower()
    if database_type not in ("mysql", "postgresql"):
        raise ValueError("DB must be MySQL or PostgreSQL")

    settings = {
        "host": os.environ["DB_SERVER"],
        "port": os.environ.get("DB_PORT", "3306" if database_type == "mysql" else "5432"),
        "user": os.environ["DB_USR"],
        "password": os.environ["DB_PWD"],
    }
    database_name = os.environ.get("DB_NAME", "portfolio")
    if database_type == "mysql":
        connection = mysql.connector.connect(database=database_name, **settings)
    else:
        connection = psycopg.connect(dbname=database_name, **settings)

    with closing(connection):
        try:
            yield connection
            connection.commit()
        except Exception:
            connection.rollback()
            raise
