import json

import pymysql
from pymysql.constants import CLIENT


def create_db_connection(database_name, config_file_path):
    with open(str(config_file_path)) as config_file:
        config = json.load(config_file)

    connection = pymysql.connect(
        host=config["host"],
        user=config["user"],
        password=config["password"],
        client_flag=CLIENT.MULTI_STATEMENTS,
        database=database_name,
    )
    return connection


def execute_stored_proc(connection, proc_name, parameters):
    cursor = connection.cursor()
    connection.ping()
    try:
        db_response = None
        cursor.callproc(proc_name, parameters)
        if "select" in proc_name or "check" in proc_name:
            db_response = cursor.fetchall()
        print(f"SUCCESS: {proc_name} stored procedure executed")
        if db_response:
            return db_response
    except Exception as e:
        raise Exception(
            f"ERROR: {proc_name} Stored procedure failed with the following error: {e}"
        )

    finally:
        cursor.close()


def exec_db_query(connection, sql_query):
    cursor = connection.cursor()
    try:
        db_response = None
        cursor.execute(sql_query)
        if "select" in sql_query:
            db_response = cursor.fetchall()
        print("SUCCESS: Query executed")
        if db_response:
            return db_response
    except Exception as e:
        print(f"ERROR: Query failed with the following error: {e}")
    finally:
        cursor.close()


def exec_sql_file(connection, sql_file):
    with open(sql_file, "r") as file:
        sql_script = file.read()
    cursor = connection.cursor()
    try:
        cursor.execute(sql_script)
        print(f"SUCCESS: {sql_script} SQL script executed")
    except Exception as e:
        print(f"ERROR: SQL script execution failed with the following error: {e}")
    finally:
        cursor.close()
