import random

from database.database_functions import execute_stored_proc


def get_all_races(database):
    all_races = execute_stored_proc(database, "select_all_from_table", ("races",))
    if all_races is not None:
        return all_races
    else:
        return "False"


def delete_race(database, race_id):
    try:
        execute_stored_proc(
            database,
            "delete_from_table",
            (
                "races",
                "race_id = '" + race_id + "'",
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def create_race(database, race):
    body_type = race["type"]
    district_id = race["districtID"]
    race_id = body_type + "-" + district_id + "-" + str(random.randrange(1000, 9999))
    try:
        execute_stored_proc(
            database,
            "create_race",
            (
                race_id,
                race["type"],
                race["title"],
                race["term"],
                race["numberCandidates"],
                race["districtID"],
                race["electionID"],
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def add_candidate_to_race():
    pass
