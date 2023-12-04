import random

from database.database_functions import execute_stored_proc


def get_all_precincts(database):
    all_precincts = execute_stored_proc(
        database,
        "select_some_from_table_with_join",
        (
            "precincts",
            "managers",
            "precinct_id, address, district_id, first_name, last_name",
            "t.id = b.manager_id",
        ),
    )
    if all_precincts is not None:
        return all_precincts
    else:
        return "False"


def delete_precinct(database, precinct_id):
    try:
        execute_stored_proc(
            database,
            "delete_from_table",
            (
                "precincts",
                "precinct_id = '" + precinct_id + "'",
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def create_precinct(database, precinct):
    state = precinct["geographyID"].split("-")[2]
    precinct_id = state + "-" + str(random.randrange(1000, 9999))
    # Get the head manager from input
    head_email = precinct["headEmail"]
    all_managers = execute_stored_proc(
        database,
        "select_all_from_table_with_where",
        (
            "managers",
            "email = '" + head_email + "'",
        ),
    )

    if all_managers is None:
        return 404

    manager = all_managers[0]
    try:
        execute_stored_proc(
            database,
            "create_precinct",
            (
                precinct_id,
                manager[0],
                precinct["address"],
                precinct["districtID"],
                precinct["geographyID"],
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400
