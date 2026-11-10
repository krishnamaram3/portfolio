import os
import unittest
from unittest.mock import patch

from database.db_connection import db_connection
from main import (
    Create_skill,
    Delete_skill,
    Update_skill,
    create_skill,
    fetch_skills,
    skill_delete,
    skill_update,
)


ENVIRONMENT = {"DB_SERVER": "db", "DB_USR": "user", "DB_PWD": "secret"}


class DatabaseConnectionTests(unittest.TestCase):
    @patch("database.db_connection.psycopg.connect")
    @patch("database.db_connection.mysql.connector.connect")
    def test_default_and_selected_drivers(self, mysql_connect, postgres_connect):
        for selected, driver, unused_driver, port, name_key in (
            (None, mysql_connect, postgres_connect, "3306", "database"),
            ("MySQL", mysql_connect, postgres_connect, "3306", "database"),
            ("PostgreSQL", postgres_connect, mysql_connect, "5432", "dbname"),
            ("postgresql", postgres_connect, mysql_connect, "5432", "dbname"),
        ):
            with self.subTest(selected=selected):
                mysql_connect.reset_mock()
                postgres_connect.reset_mock()
                environment = dict(ENVIRONMENT)
                if selected is not None:
                    environment["DB"] = selected
                with patch.dict(os.environ, environment, clear=True):
                    with db_connection() as connection:
                        self.assertIs(connection, driver.return_value)
                expected = dict(host="db", port=port, user="user", password="secret")
                expected[name_key] = "portfolio"
                driver.assert_called_once_with(**expected)
                unused_driver.assert_not_called()
                driver.return_value.commit.assert_called_once()
                driver.return_value.close.assert_called_once()

    @patch("database.db_connection.psycopg.connect")
    @patch("database.db_connection.mysql.connector.connect")
    def test_connection_overrides(self, mysql_connect, postgres_connect):
        for selected, driver, name_key in (
            ("MySQL", mysql_connect, "database"),
            ("PostgreSQL", postgres_connect, "dbname"),
        ):
            with self.subTest(selected=selected):
                environment = dict(ENVIRONMENT, DB=selected, DB_NAME="other", DB_PORT="1234")
                with patch.dict(os.environ, environment, clear=True):
                    with db_connection():
                        pass
                expected = dict(host="db", port="1234", user="user", password="secret")
                expected[name_key] = "other"
                driver.assert_called_once_with(**expected)

    @patch("database.db_connection.psycopg.connect")
    @patch("database.db_connection.mysql.connector.connect")
    def test_invalid_database_type(self, mysql_connect, postgres_connect):
        with patch.dict(os.environ, {"DB": "unsupported"}, clear=True):
            with self.assertRaisesRegex(ValueError, "DB must be MySQL or PostgreSQL"):
                with db_connection():
                    pass
        mysql_connect.assert_not_called()
        postgres_connect.assert_not_called()


class SkillsTests(unittest.TestCase):
    @patch("database.db_connection.psycopg.connect")
    @patch("database.db_connection.mysql.connector.connect")
    def test_crud_and_error_handling(self, mysql_connect, postgres_connect):
        for selected, driver in (("MySQL", mysql_connect), ("PostgreSQL", postgres_connect)):
            with self.subTest(selected=selected):
                driver.reset_mock(return_value=True)
                connection = driver.return_value
                cursor = connection.cursor.return_value
                environment = dict(ENVIRONMENT, DB=selected)
                with patch.dict(os.environ, environment, clear=True):
                    self.assertEqual(
                        create_skill(Create_skill(name="aws", stream="operations")),
                        {"skill_id": None},
                    )
                    cursor.execute.assert_called_with(
                        "INSERT INTO skills (name, stream) VALUES (%s, %s)",
                        ("aws", "operations"),
                    )

                    cursor.fetchall.return_value = [("aws", "operations")]
                    self.assertEqual(fetch_skills(), {
                        "skills": [{"name": "aws", "stream": "operations"}]
                    })
                    cursor.execute.assert_called_with("SELECT name, stream FROM skills")

                    self.assertEqual(
                        skill_update(Update_skill(name="aws", stream="cloud")),
                        {"skill_id": None},
                    )
                    cursor.execute.assert_called_with(
                        "UPDATE skills SET stream = %s WHERE name = %s", ("cloud", "aws")
                    )

                    self.assertEqual(skill_delete(Delete_skill(name="aws")), {"id": None})
                    cursor.execute.assert_called_with(
                        "DELETE FROM skills WHERE name = %s", ("aws",)
                    )
                    self.assertEqual(connection.commit.call_count, 4)
                    self.assertEqual(connection.close.call_count, 4)
                    self.assertEqual(cursor.close.call_count, 4)

                    cursor.execute.side_effect = RuntimeError("database error")
                    with self.assertRaisesRegex(RuntimeError, "database error"):
                        create_skill(Create_skill(name="aws", stream="operations"))
                    connection.rollback.assert_called_once()
                    self.assertEqual(connection.commit.call_count, 4)
                    self.assertEqual(connection.close.call_count, 5)
                    self.assertEqual(cursor.close.call_count, 5)


if __name__ == "__main__":
    unittest.main()
