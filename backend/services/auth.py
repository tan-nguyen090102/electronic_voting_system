from database.database_functions import execute_stored_proc


def voter_login(db, bcrypt, login_info):
    get_voter = execute_stored_proc(db, "check_voter", (login_info["userID"],))
    if get_voter:
        voter = get_voter[0]
        if bcrypt.check_password_hash(voter[6], login_info["password"]):
            return "true"
        else:
            return "false"
    else:
        return "false"


def manager_login(db, bcrypt, login_info):
    get_manager = execute_stored_proc(
        db,
        "check_manager",
        (
            login_info["employeeID"],
            login_info["userID"],
        ),
    )
    if get_manager:
        manager = get_manager[0]
        if bcrypt.check_password_hash(manager[5], login_info["password"]):
            return "true"
        else:
            return "false"
    else:
        return "false"


def admin_login(db, bcrypt, login_info):
    # password_hash = bcrypt.generate_password_hash(login_info["password"]).decode(
    #     "utf-8"
    # )
    # execute_stored_proc(
    #     db,
    #     "create_admin",
    #     (
    #         "John",
    #         "Frederick",
    #         "Doe",
    #         login_info["userID"],
    #         password_hash,
    #     ),
    # )
    db.commit()

    get_admin = execute_stored_proc(
        db, "check_admin", (login_info["employeeID"], login_info["userID"])
    )
    if get_admin:
        admin = get_admin[0]
        if bcrypt.check_password_hash(admin[5], login_info["password"]):
            return "true"
        else:
            return "false"
    else:
        return "false"
