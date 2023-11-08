from backend.database.database_functions import execute_stored_proc
def create_voter(db, voter):
    where_clause = f"zips.zip_code ='{voter['zip']}' and zips.city ='{voter['city']}'"
    zip_with_id = execute_stored_proc(db, "select_all_from_table_with_where", ("zips", where_clause,))

    if zip_with_id is None:
        # getting zip info and inserting into zip table
        table_name = "zips"
        table_proto = f"(zip_code, city, state)"
        insert_value = f"('{voter['zip']}', '{voter['city']}', '{voter['state']}')"
        execute_stored_proc(db, "insert_into_table", (table_name, table_proto, insert_value,))
        zip_where_clause = f"zips.zip_code ='{voter['zip']}' and zips.city ='{voter['city']}'"
        zip_with_id = execute_stored_proc(db, "select_all_from_table_with_where", (table_name, zip_where_clause,))

    table_name = "voters"
    voter_where_clause = f"voters.first_name='{voter['firstName']}' and voters.last_name='{voter['lastName']}' and voters.email='{voter['email']}'"
    get_voter = execute_stored_proc(db, "select_all_from_table_with_where", (table_name, voter_where_clause,))

    if get_voter is None:
        table_proto = f"(first_name, middle_name, last_name, street_address, email, password, phone_num, drivers_license, question_index, question_answer, zip)"
        insert_value = f"('{voter['firstName']}', '{voter['middleName']}', '{voter['lastName']}', '{voter['street']}', '{voter['email']}', '{voter['password']}', '{voter['phone']}', '{voter['driverID']}', '{voter['questionIndex']}', '{voter['securityAnswer']}' ,'{zip_with_id[0][0]}')"
        execute_stored_proc(db, "insert_into_table", (table_name, table_proto, insert_value,))
        db.commit()
        return 200
    else:
        return 400





