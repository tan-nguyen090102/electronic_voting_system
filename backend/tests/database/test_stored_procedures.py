import pytest
from pathlib import Path
from backend.database.database_functions import create_db_connection,execute_stored_proc
@pytest.fixture
def create_test_db_connection():
    current_directory = Path.cwd()
    backend_directory = current_directory.parents[1]
    config_db_json_file = backend_directory / "database/config_db.json"

    test_database = "test_db"
    db_connection = create_db_connection(test_database,config_db_json_file)
    db_connection.autocommit(False)

    return db_connection

def test_select_all_stored_proc(create_test_db_connection):
    try:
        info_result_set = execute_stored_proc(create_test_db_connection,"select_all_from_table", ("info",))
        assert info_result_set is not None
        assert len(info_result_set) is 2
    finally:
        create_test_db_connection.close()
def test_select_all_with_where_stored_proc(create_test_db_connection):
    try:
        info_result_set = execute_stored_proc(create_test_db_connection, "select_all_from_table_with_where", ("info", "info.address ='123 Street'",))
        assert info_result_set is not None
        assert len(info_result_set) is 1
        for info_record in info_result_set:
            where_check = "123 Street" in info_record
            assert where_check is True
    finally:
        create_test_db_connection.close()

def test_delete_from_table(create_test_db_connection):
    where_clause = "info.address ='5th Street'"
    try:
        execute_stored_proc(create_test_db_connection, "delete_from_table", ("info", where_clause,))
        info_delete_result_set = execute_stored_proc(create_test_db_connection, "select_all_from_table_with_where",
                                              ("info", where_clause,))
        assert info_delete_result_set is None
    finally:
        create_test_db_connection.close()

def test_insert_into_table_stored_proc(create_test_db_connection):
    table_name = "info"
    table_proto = "(firstname, lastname, address, phone_num, password)"
    insert_values_list = [
            "('Haylen', 'Sewell', '209 9th Street', '(567) 492-4532', 'NoSQLAlchemy')",
            "('Eric', 'Trautsch', '908 2nd Avenue', '(127) 334-8132', 'NoSQLAlchemy')"
        ]
    insert_values_str = ",".join(insert_values_list)
    where_clause = "info.phone_num in ('(567) 492-4532', '(127) 334-8132')"
    try:
        execute_stored_proc(create_test_db_connection,"insert_into_table", (table_name, table_proto, insert_values_str,))
        info_insert_result_set = execute_stored_proc(create_test_db_connection, "select_all_from_table_with_where",
                                                     ("info", where_clause,))
        assert info_insert_result_set is not None

        assert len(info_insert_result_set) is 2

    finally:
        create_test_db_connection.close()

def test_update_table(create_test_db_connection):
    try:
        set_clause = "info.address='5th Street'"
        where_clause = "info.firstname='Ryan'"
        execute_stored_proc(create_test_db_connection, "update_table", ("info", set_clause, where_clause,))
        info_update_result_set = execute_stored_proc(create_test_db_connection, "select_all_from_table_with_where",
                                                     ("info", where_clause,))
        assert info_update_result_set is not None

        assert len(info_update_result_set) is 1
    finally:
        create_test_db_connection.close()





