import datetime

from database.database_functions import execute_stored_proc


def get_all_elections(database):
    all_elections = execute_stored_proc(
        database, "select_all_from_table", ("elections",)
    )

    list_all_elections = []
    if all_elections is not None:
        for election in all_elections:
            election = list(election)
            election[2] = election[2].strftime("%m/%d/%Y %H:%M:%S")
            election[3] = election[3].strftime("%m/%d/%Y %H:%M:%S")
            list_all_elections.append(election)
        return list_all_elections
    else:
        return "False"
