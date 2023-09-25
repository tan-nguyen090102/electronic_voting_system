import pymysql
from pymysql.constants import CLIENT

from database_functions import create_db_connection, exec_db_query, exec_sql_file, execute_stored_proc
from pathlib import Path
TABLES = [
    {
        "table_name": "info",
        "columns_definition":
        [
            "id SERIAL PRIMARY KEY",
            "firstname VARCHAR(60)",
            "lastname VARCHAR(60)",
            "address text",
            "phone_num VARCHAR(20)",
            "password text"
        ]

    },
    {
        "table_name": "voters",
        "columns_definition":
        [
            "id SERIAL PRIMARY KEY",
            "firstname VARCHAR(60)",
            "lastname VARCHAR(60)",
            "address text",
            "phone_num VARCHAR(20)",
            "password text"
        ]


    }
]


def set_stored_procedures(connection):
    cwd = Path.cwd()
    stored_proc_sql_files = list(cwd.rglob("stored_proc_functions/*.sql"))
    for stored_proc_sql_file in stored_proc_sql_files:
        stored_proc_sql_file_str = str(stored_proc_sql_file)
        exec_sql_file(connection, stored_proc_sql_file_str)

def create_tables(connection):
    for table in TABLES:
        columns_definition = ",".join(table["columns_definition"])
        execute_stored_proc(connection,"create_new_table", (table["table_name"], columns_definition, ))

if __name__ == "__main__":
    connection = create_db_connection()
    try:
        set_stored_procedures(connection)
        create_tables(connection)
    finally:
        connection.close()