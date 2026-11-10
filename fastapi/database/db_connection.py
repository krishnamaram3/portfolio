import os
from contextlib import closing, contextmanager

import psycopg


@contextmanager
def db_connection():
    if os.environ.get("DB", "PostgreSQL").strip().lower() != "postgresql":
        raise ValueError("DB must be PostgreSQL")

    connection = psycopg.connect(
        host=os.environ["DB_SERVER"],
        port=os.environ.get("DB_PORT", "5432"),
        dbname=os.environ.get("DB_NAME", "portfolio"),
        user=os.environ["DB_USR"],
        password=os.environ["DB_PWD"],
    )

    with closing(connection):
        try:
            yield connection
            connection.commit()
        except Exception:
            connection.rollback()
            raise
