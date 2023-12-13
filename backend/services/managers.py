import random

from database.database_functions import execute_stored_proc


def create_manager(db, bcrypt, manager):
    password_hash = bcrypt.generate_password_hash(manager["password"]).decode("utf-8")
    # Have to retreive admin infomation here.
    all_admins = execute_stored_proc(db, "select_all_from_table", ("admins",))
    size = len(all_admins)
    random_number = random.randrange(0, size - 1)
    admin = all_admins[0]
    try:
        execute_stored_proc(
            db,
            "create_manager",
            (
                manager["firstName"],
                manager["middleName"],
                manager["lastName"],
                manager["email"],
                password_hash,
                admin[random_number],
            ),
        )
        db.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def get_precinct_manager(database, manager):
    manager_email = manager["email"]
    all_precincts = execute_stored_proc(
        database,
        "select_some_from_table_with_join_where",
        (
            "precincts",
            "managers",
            "precinct_id, email",
            "t.id = b.manager_id",
            "email = '" + manager_email + "'",
        ),
    )
    if all_precincts is not None:
        return all_precincts[0]
    else:
        return "False"


def get_races_manager(database, precinct_id):
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
