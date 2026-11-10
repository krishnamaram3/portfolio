import mysql.connector
import datetime
import time
import os

def mysql_connect():
    # Establish a connection to the MySQL database
    db_con = mysql.connector.connect(
        host=os.environ['DB_SERVER'],
        user=os.environ['DB_USR'],
        password=os.environ['DB_PWD'],
    )
    return db_con

def insert_skill(skill):
    """
	Method to insert a skill into the database
	"""
    try:
        db_con = mysql_connect()
        # Create a cursor to interact with the database
        db_session = db_con.cursor()
        insert_query = "INSERT INTO portfolio.skills (name, stream) VALUES (%s, %s);"
        res = db_session.execute(insert_query, (skill['name'], skill['stream']))
        db_con.commit()
        print("res", res)
        return res

    except Exception as err:
        print(str(err))
        raise

def get_skills():
    db_con = mysql_connect()
    # Create a cursor to interact with the database
    db_session = db_con.cursor()
    # Execute a SELECT query
    query = "SELECT * FROM portfolio.skills"
    db_session.execute(query)
    # Fetch all records from the result set
    all_skills = db_session.fetchall()
    skills = []
    for skill in all_skills:
        skill_dict = {
            "name" : skill[1],
            'stream': skill[2]
            }
        skills.append(skill_dict)
    print(skills)
    return skills


def update_skill(skill):
    db_con = mysql_connect()
    # Create a cursor to interact with the database
    db_session = db_con.cursor()
    update_query = "UPDATE portfolio.skills SET stream = %s WHERE name = %s;"
    print(update_query)
    db_session.execute(update_query, (skill['stream'], skill['name']))
    db_con.commit()

def delete_skill(skill):
    db_con = mysql_connect()
    # Create a cursor to interact with the database
    db_session = db_con.cursor()
    delete_query = "DELETE FROM portfolio.skills WHERE name = %s;"
    print(delete_query)
    db_session.execute(delete_query, (skill['name'],))
    db_con.commit()
