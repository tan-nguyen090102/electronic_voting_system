import flask
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from backend.dependencies import db
from backend.services.voters import create_voter
from backend.database.database_functions import execute_stored_proc
from backend.services import voters
import json


voters_bp = Blueprint('voters_bp', __name__)


@voters_bp.route('/', methods=["POST"])
@cross_origin()
def voters(database=db):

    json_object = request.json
    response = create_voter(database, json_object)

    if response == 200:
        return "Voter Created", 200
    elif response == 400:
        return "Voter Already Exists", 400
    else:
        return "Server Error", 500



        # #getting zip info and inserting into zip table
        # table_name = "zips"
        # table_proto = f"(zip_code, city, state)"
        # insert_value = f"('{json_object['zip']}', '{json_object['city']}', '{json_object['state']}')"
        # execute_stored_proc(database,"insert_into_table", (table_name, table_proto, insert_value,))
        #
        # where_clause = f"zips.zip_code ='{json_object['zip']}' and zips.city ='{json_object['city']}'"
        # print(where_clause)
        # print(request)
        # zip_with_id = execute_stored_proc(db, "select_all_from_table_with_where", ("zips",where_clause,))
        # print(zip_with_id)
        #
        # table_name ="voters"
        # table_proto = f"(first_name, middle_name, last_name, street_address, email, password, phone_num, drivers_license, question_index, question_answer, zip)"
        # insert_value = f"('{json_object['firstName']}', '{json_object['middleName']}', '{json_object['lastName']}', '{json_object['street']}', '{json_object['email']}', '{json_object['password']}', '{json_object['phone']}', '{json_object['driverID']}', '{json_object['questionIndex']}', '{json_object['securityAnswer']}' ,'{zip_with_id[0][0]}')"
        # execute_stored_proc(database,"insert_into_table", (table_name, table_proto, insert_value,))


        #
        # with open("data.json", "w") as outputFile:
        #     outputFile.write(json_object["firstName"])
        #     # json.dump(json_object, outputFile, indent=4)
