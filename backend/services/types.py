from database.database_functions import execute_stored_proc


def get_all_types(database):
    all_types = execute_stored_proc(database, "select_all_from_table", ("body_types",))
    if all_types is not None:
        return all_types
    else:
        return "False"
