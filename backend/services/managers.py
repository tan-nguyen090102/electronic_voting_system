from database.database_functions import execute_stored_proc


def create_manager(db, bcrypt, manager):
    password_hash = bcrypt.generate_password_hash(manager["password"]).decode("utf-8")
    # Have to retreive admin infomation here.
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
            ),
        )
        db.commit()
        return 200
    except Exception as e:
        print(e)
        return 400
