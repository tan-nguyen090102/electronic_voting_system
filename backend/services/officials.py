import datetime
import random

from database.database_functions import execute_stored_proc


def get_all_officials(database, race_id):
    all_officials = execute_stored_proc(
        database,
        "select_some_from_table_with_join_where",
        (
            "officials",
            "candidates",
            "official_id, first_name, last_name, race_id",
            "t.candidate_id = b.candidate_id",
            "race_id = '" + race_id + "'",
        ),
    )
    if all_officials is not None:
        return all_officials
    else:
        return "False"


def create_official(database, official):
    candidate_id = official["candidateID"]
    race_id = official["raceID"]
    all_candidates = execute_stored_proc(
        database,
        "select_all_from_table_with_where",
        (
            "candidates",
            "candidate_id = '" + candidate_id + "'",
        ),
    )

    if all_candidates is None:
        return 404

    candidate = all_candidates[0]
    official_id = candidate[2].upper() + "-" + official["raceID"]

    try:
        execute_stored_proc(
            database,
            "create_official",
            (official_id, official["raceID"], candidate[0], "running"),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400
