import random

from database.database_functions import execute_stored_proc
from services.officials import get_all_officials


def get_all_races(database):
    all_races = execute_stored_proc(database, "select_all_from_table", ("races",))
    if all_races is not None:
        return all_races
    else:
        return "False"


def get_specific_race(database, race_id):
    race = execute_stored_proc(
        database,
        "select_all_from_table_with_where",
        ("races", "race_id = '" + race_id + "'"),
    )
    if race is not None:
        return race[0]
    else:
        return "False"


def delete_race(database, race_id):
    # Get all officials that associate with this race
    all_officials = get_all_officials(database, race_id)

    if all_officials is not None:
        for official in all_officials:
            response = delete_official(database, official[0], "None")

            if response == 400:
                return response

    # Try to delete the race
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


def delete_official(database, official_id, race_id):
    # Update the races number of candidate
    if race_id != "None":
        response = subtract_candidate_number_to_race(database, race_id)

        if response == 400:
            return 400

    try:
        execute_stored_proc(
            database,
            "delete_from_table",
            (
                "officials",
                "official_id = '" + official_id + "'",
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


def add_candidate_number_to_race(database, race_id):
    # Get the specific race
    race = get_specific_race(database, race_id)

    if race != "False":
        # Add one more candidate
        number_candidates = race[4] + 1

        try:
            execute_stored_proc(
                database,
                "update_table",
                (
                    "races",
                    "number_candidates = '" + str(number_candidates) + "'",
                    "race_id = '" + race_id + "'",
                ),
            )
            database.commit()
            return 200
        except Exception as e:
            print(e)
            return 400
    else:
        return 400


def subtract_candidate_number_to_race(database, race_id):
    # Get the specific race
    race = get_specific_race(database, race_id)

    if race != "False":
        # Subtract one candidate
        number_candidates = race[4] - 1

        try:
            execute_stored_proc(
                database,
                "update_table",
                (
                    "races",
                    "number_candidates = '" + str(number_candidates) + "'",
                    "race_id = '" + race_id + "'",
                ),
            )
            database.commit()
            return 200
        except Exception as e:
            print(e)
            return 400
    else:
        return 400
