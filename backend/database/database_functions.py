import pymysql
import json

from pymysql.constants import CLIENT


def create_db_connection():
    with open('dev_config_db.json') as config_file:
        config = json.load(config_file)

    connection = pymysql.connect(
        host=config['host'],
        user=config['user'],
        password=config['password'],
        database=config['database'],
        client_flag=CLIENT.MULTI_STATEMENTS
    )
    return connection

def execute_stored_proc(connection, proc_name, parameters):
    cursor = connection.cursor()
    try:
        cursor.callproc(proc_name, parameters)
        db_response = cursor.fetchall()
        connection.commit()
        print("SUCCESS: Stored procedure executed")
        if (db_response):
            return db_response
    except Exception as e:
        print(f"ERROR: Stored procedure failed with the following error: {e}")
def exec_db_query(connection, sql_query):
    cursor = connection.cursor()
    try:
        cursor.execute(sql_query)
        db_response = cursor.fetchall()
        cursor.close()
        print("SUCCESS: Query executed")
        if db_response:
            return db_response
    except Exception as e:
        print(f"ERROR: Query failed with the following error: {e}")

def exec_sql_file(connection,sql_file):
    with open(sql_file, 'r') as file:
        sql_script = file.read()
    cursor = connection.cursor()
    try:
        cursor.execute(sql_script)
        connection.commit()
        print("SUCCESS: SQL script executed")
    except Exception as e:
        print(f"ERROR: SQL script execution failed with the following error: {e}")