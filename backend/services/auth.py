from backend.database.database_functions import execute_stored_proc


def voter_login(db, bcrypt, login_info):
    get_voter = execute_stored_proc(db, "check_voter", (login_info['userID'],))
    if get_voter:
        voter=get_voter[0]
        print(voter[6])
        if bcrypt.check_password_hash(voter[6], login_info['password']):
            return "true"
        else:
            return "false"
    else:
        return "false"
