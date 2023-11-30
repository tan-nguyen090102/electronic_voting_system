import random

from database.database_functions import execute_stored_proc


def get_all_precincts(database):
    all_precincts = execute_stored_proc(
        database, "select_all_from_table", ("precincts",)
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
                "precinct_id = " + precinct_id,
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def create_precinct(database, precinct):
    precinct_id = precinct["geographyID"][2] + str(random.randrange(1000, 9999))
    try:
        execute_stored_proc(
            database,
            "create_precinct",
            (
                precinct_id,
                precinct["head"],
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
