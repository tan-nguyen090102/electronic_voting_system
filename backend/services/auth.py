from backend.database.database_functions import execute_stored_proc
def verify_voter(db, login_info):
    table_name = "voters"
    voter_where_clause = f"voters.email='{login_info['userID']}' and voters.password='{login_info['password']}'"
    get_voter = execute_stored_proc(db, "select_all_from_table_with_where", (table_name, voter_where_clause,))
    if get_voter is None:
        return "false"
    else:
        return "true"