from database.database_functions import execute_stored_proc


def get_all_districts(database):
    all_districts = execute_stored_proc(
        database, "select_all_from_table", ("districts",)
    )
    if all_districts is not None:
        return all_districts
    else:
        return "False"


def delete_district(database, district_id):
    try:
        execute_stored_proc(
            database,
            "delete_from_table",
            (
                "districts",
                "district_id = '" + district_id + "'",
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def create_district(database, district):
    try:
        execute_stored_proc(
            database,
            "create_district",
            (
                district["districtID"],
                district["title"],
                district["officialName"],
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def update_district(database, district):
    try:
        execute_stored_proc(
            database,
            "update_table",
            (
                "districts",
                "title = '" + district["title"] + "'",
                "district_id = '" + district["districtID"] + "'",
            ),
        )
        execute_stored_proc(
            database,
            "update_table",
            (
                "districts",
                "head_official = '" + district["officialName"] + "'",
                "district_id = '" + district["districtID"] + "'",
            ),
        )
        database.commit()
        return 200
    except Exception as e:
        print(e)
        return 400
