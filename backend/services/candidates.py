import datetime
import random

from database.database_functions import execute_stored_proc


def get_all_candidates(database):
    all_candidates = execute_stored_proc(
        database,
        "select_some_from_table_with_join",
        (
            "candidates",
            "geography",
            "candidate_id, first_name, last_name, dob, b.geography_id",
            "t.geography_id = b.geography_id",
        ),
    )

    list_all_candidates = []
    if all_candidates is not None:
        for candidate in all_candidates:
            candidate = list(candidate)
            candidate[3] = candidate[3].strftime("%m/%d/%Y")
            list_all_candidates.append(candidate)
        return list_all_candidates
    else:
        return "False"


def delete_candidate(database, candidate_id):
    try:
        execute_stored_proc(
            database,
            "delete_from_table",
            (
                "candidates",
                "candidate_id = '" + candidate_id + "'",
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def create_candidate(database, candidate):
    list_geography = candidate["geographyID"].split("-")
    candidate_id = (
        list_geography[0]
        + "-"
        + list_geography[2]
        + "-"
        + str(random.randrange(1000, 9999))
    )

    try:
        execute_stored_proc(
            database,
            "create_candidate",
            (
                candidate_id,
                candidate["firstName"],
                candidate["lastName"],
                candidate["dob"],
                candidate["geographyID"],
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400
