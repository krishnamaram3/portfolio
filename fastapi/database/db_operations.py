from contextlib import closing

from database.db_connection import db_connection


def insert_skill(skill):
    with db_connection() as connection:
        with closing(connection.cursor()) as cursor:
            cursor.execute(
                "INSERT INTO skills (name, stream) VALUES (%s, %s)",
                (skill["name"], skill["stream"]),
            )


def get_skills():
    with db_connection() as connection:
        with closing(connection.cursor()) as cursor:
            cursor.execute("SELECT name, stream FROM skills")
            return [
                {"name": name, "stream": stream}
                for name, stream in cursor.fetchall()
            ]


def update_skill(skill):
    with db_connection() as connection:
        with closing(connection.cursor()) as cursor:
            cursor.execute(
                "UPDATE skills SET stream = %s WHERE name = %s",
                (skill["stream"], skill["name"]),
            )


def delete_skill(skill):
    with db_connection() as connection:
        with closing(connection.cursor()) as cursor:
            cursor.execute(
                "DELETE FROM skills WHERE name = %s",
                (skill["name"],),
            )
