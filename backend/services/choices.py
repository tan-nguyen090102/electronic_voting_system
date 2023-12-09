import datetime
import random
import uuid

from database.database_functions import execute_stored_proc


def get_all_choices(database, voter_email):
    all_choices = execute_stored_proc(
        database,
        "select_some_from_table_with_join_where",
        (
            "choices",
            "ballots",
            "choice_id, race_id, email, b.ballot_id, b.candidate_id, first_name, last_name",
            "t.ballot_id = b.ballot_id INNER JOIN candidates c ON b.candidate_id = c.candidate_id",
            "email = '" + voter_email["email"] + "'",
        ),
    )
    if all_choices is not None:
        return all_choices
    else:
        return "False"


def create_choice(database, choice):
    email = choice["email"]
    race_id = choice["raceID"]
    precinct_id = choice["precinctID"]
    candidate_id = choice["candidateID"]

    # Get the binary voter id
    get_voter = execute_stored_proc(database, "check_voter", (email,))
    if get_voter:
        voter = get_voter[0]
        voter_bin_id = voter[0]
        voter_id = str(uuid.UUID(int=int.from_bytes(voter_bin_id, "big")))
    else:
        return 404

    # Get the ballot id
    get_ballot = execute_stored_proc(
        database,
        "select_all_from_table_with_where",
        (
            "ballots",
            "race_id = '" + race_id + "' AND precinct_id = '" + precinct_id + "'",
        ),
    )
    if get_ballot:
        ballot = get_ballot[0]
        ballot_id = ballot[0]
    else:
        return 404

    choice_id = ballot_id + ":" + candidate_id + ":" + voter_id

    try:
        execute_stored_proc(
            database,
            "create_choice",
            (choice_id, voter_bin_id, ballot_id, candidate_id, email),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400
