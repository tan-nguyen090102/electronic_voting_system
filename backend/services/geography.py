from database.database_functions import execute_stored_proc


def get_all_geography(database):
    all_geography = execute_stored_proc(
        database, "select_all_from_table", ("geography",)
    )
    if all_geography is not None:
        return all_geography
    else:
        return "False"
