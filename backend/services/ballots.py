import random

from database.database_functions import execute_stored_proc


def get_all_ballots(database):
    all_ballots = execute_stored_proc(
        database,
        "select_some_from_table_with_join",
        (
            "ballots",
            "races",
            "ballot_id, b.race_id, precinct_id, status, election_id",
            "t.race_id = b.race_id",
        ),
    )
    if all_ballots is not None:
        return all_ballots
    else:
        return "False"


def delete_ballot(database, ballot_id):
    try:
        execute_stored_proc(
            database,
            "delete_from_table",
            (
                "ballots",
                "ballot_id = '" + ballot_id + "'",
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def create_ballot(database, ballot):
    race_id_list = ballot["raceIDList"]
    precinct_id_list = ballot["precinctIDList"]
    list_ballot_id = []
    list_precinct_id = []
    list_race_id = []

    for precinct_id in precinct_id_list:
        for race_id in race_id_list:
            ballot_id = (
                race_id.split("-")[0] + "-" + race_id.split("-")[1] + "-" + precinct_id
            )

            # Check the existence of any ballot with these list
            get_ballots = execute_stored_proc(database, "check_ballot", (ballot_id,))
            if get_ballots is not None:
                continue
            else:
                list_ballot_id.append(ballot_id)
                list_race_id.append(race_id)
                list_precinct_id.append(precinct_id)

    for index, ballot_id in enumerate(list_ballot_id):
        try:
            execute_stored_proc(
                database,
                "create_ballot",
                (
                    ballot_id,
                    list_race_id[index],
                    list_precinct_id[index],
                    "inactive",
                ),
            )
            database.commit()
        except Exception as e:
            print(e)
            return 400
    return 200
