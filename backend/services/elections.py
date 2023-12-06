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


def delete_election(database, election_id):
    try:
        execute_stored_proc(
            database,
            "delete_from_table",
            (
                "elections",
                "election_id = '" + election_id + "'",
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def create_election(database, election):
    try:
        execute_stored_proc(
            database,
            "create_election",
            (
                election["electionID"],
                election["title"],
                election["startTime"],
                election["endTime"],
                election["status"],
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def update_election(database, election):
    try:
        execute_stored_proc(
            database,
            "update_table",
            (
                "elections",
                "title = '" + election["title"] + "'",
                "election_id = '" + election["electionID"] + "'",
            ),
        )
        execute_stored_proc(
            database,
            "update_table",
            (
                "elections",
                "start_time = '" + election["startTime"] + "'",
                "election_id = '" + election["electionID"] + "'",
            ),
        )
        execute_stored_proc(
            database,
            "update_table",
            (
                "elections",
                "end_time = '" + election["endTime"] + "'",
                "election_id = '" + election["electionID"] + "'",
            ),
        )
        execute_stored_proc(
            database,
            "update_table",
            (
                "elections",
                "status = '" + election["status"] + "'",
                "election_id = '" + election["electionID"] + "'",
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def update_status_election(database, election):
    try:
        execute_stored_proc(
            database,
            "update_table",
            (
                "elections",
                "status = '" + election["status"] + "'",
                "election_id = '" + election["electionID"] + "'",
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400
