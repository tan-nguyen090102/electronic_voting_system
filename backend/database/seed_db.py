from database_functions import create_db_connection, exec_db_query, exec_sql_file, execute_stored_proc
from pathlib import Path
DEV_DATABASE = "dev_db"


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

VALUES = [
    {
        "table_name": "info",
        "insert_proto": "(firstname, lastname, address, phone_num, password)",
        "insert_values":
        [
            "('Ryan', 'Edwall', '123 Street', '(827) 392-8654', 'NoSQLAlchemy')",
            "('Tan', 'Nguyen', '123 Street', '(827) 392-8654', 'NoSQLAlchemy')"
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
def create_database(connection):
    exec_db_query(connection, f"DROP DATABASE IF EXISTS {DEV_DATABASE}; CREATE DATABASE {DEV_DATABASE}; USE {DEV_DATABASE};")

def insert_values(connection):
    for values in VALUES:
        insert_values = ",".join(values["insert_values"])
        execute_stored_proc(connection, "insert_into_table",(values["table_name"], values["insert_proto"], insert_values,))
# def select_all_from_table(connection):
#     results = execute_stored_proc(connection, "select_all_from_table", ("info",))
#     for result in results:
#         print(result)
# def select_all_from_table_with_where(connection):
#     results = execute_stored_proc(connection, "select_all_from_table_with_where", ("info","info.address ='123 Street'",))
#     for result in results:
#         print(result)
# def delete_from_table(connection):
#     execute_stored_proc(connection, "delete_from_table", ("info","info.id ='1'",))
#
# def update_table(connection):
#     execute_stored_proc(connection,"update_table", ("info", "info.address='5th street'","info.id ='1'", ))

if __name__ == "__main__":
    connection = create_db_connection()
    try:
        create_database(connection)
        set_stored_procedures(connection)
        create_tables(connection)
        insert_values(connection)
    finally:
        connection.close()