import random

from database.database_functions import execute_stored_proc


def create_voter(db, bcrypt, voter):
    zip_plus_four = random.randrange(1000, 9999)
    password_hash = bcrypt.generate_password_hash(voter["password"]).decode("utf-8")
    try:
        execute_stored_proc(
            db,
            "create_voter",
            (
                voter["firstName"],
                voter["middleName"],
                voter["lastName"],
                voter["street"],
                voter["zip"] + "-" + str(zip_plus_four),
                voter["city"],
                voter["state"],
                voter["email"],
                password_hash,
                voter["dob"],
                voter["driverID"],
                voter["questionIndex"],
                voter["securityAnswer"],
                voter["passport"],
            ),
        )
        db.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def get_precinct_voter(database, voter):
    all_precincts = execute_stored_proc(
        database,
        "select_precinct_for_voter",
        (
            "precinct_id",
            'v.email = "' + voter["email"] + '"',
        ),
    )
    if all_precincts is not None:
        return all_precincts[0]
    else:
        return "False"


def get_races_voter(database, precinct_id):
    all_races = execute_stored_proc(
        database,
        "select_some_from_table_with_join_where",
        (
            "ballots",
            "races",
            "b.race_id, precinct_id, title, body_type, term, election_id, status, number_candidates",
            "t.race_id = b.race_id",
            "precinct_id = '" + precinct_id + "'",
        ),
    )
    if all_races is not None:
        return all_races
    else:
        return []


def get_candidates_voter(database, race_id):
    all_candidates = execute_stored_proc(
        database,
        "select_some_from_table_with_join_where",
        (
            "officials",
            "candidates",
            "b.race_id, first_name, last_name, b.candidate_id",
            "t.candidate_id = b.candidate_id",
            "race_id = '" + race_id + "'",
        ),
    )
    if all_candidates is not None:
        return all_candidates
    else:
        return "False"
