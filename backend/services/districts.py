from database.database_functions import execute_stored_proc


def get_all_districts(database):
    all_districts = execute_stored_proc(
        database, "select_all_from_table", ("districts",)
    )
    if all_districts is not None:
        return all_districts
    else:
        return "False"
