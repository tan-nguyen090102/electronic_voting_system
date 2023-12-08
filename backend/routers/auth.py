from database.database_functions import execute_stored_proc
from dependencies import db
from flask import Blueprint, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import cross_origin
from services.auth import admin_login, manager_login, voter_login
import random

auth_bp = Blueprint("auth_bp", __name__)
bcrypt = Bcrypt()


@auth_bp.route("/login", methods=["POST"])
@cross_origin()
def login(db=db, input_bcrypt=bcrypt):
    json_object = request.json
    login_check = False
    if json_object["role"] == "voter":
        login_check = voter_login(db, input_bcrypt, json_object)
    elif json_object["role"] == "admin":
        login_check = admin_login(db, input_bcrypt, json_object)
    elif json_object["role"] == "manager":
        login_check = manager_login(db, input_bcrypt, json_object)
    else:
        login_check = "false"
    return jsonify(login_check)

@auth_bp.route("/user_profile", methods=["POST"])
@cross_origin()
def user_profile(database=db):
    json_object = request.json
    get_voter = execute_stored_proc(database, "check_voter_with_join", (json_object["user"], "voters", "zips", ("first_name, middle_name, last_name, street_address, email, drivers_license, passport, b.zip_code, b.city, state"), "b.zip_code = t.zip_code"))
    print (get_voter[0])
    return jsonify(get_voter[0])

@auth_bp.route("/user_profile/update", methods=["POST"])
@cross_origin()
def user_profile_update(database=db):
    json_object = request.json
    print (json_object["zip"])
    execute_stored_proc(database, "update_table", ("voters", "email = '" + json_object["email"] + "'", "email = '" + json_object["oldEmail"] + "'"))
    execute_stored_proc(database, "update_table", ("voters", "first_name = '" + json_object["firstName"] + "'", "email = '" + json_object["email"] + "'"))
    execute_stored_proc(database, "update_table", ("voters", "middle_name = '" + json_object["middleName"] + "'", "email = '" + json_object["email"] + "'"))
    execute_stored_proc(database, "update_table", ("voters", "last_name = '" + json_object["lastName"] + "'", "email = '" + json_object["email"] + "'"))
    execute_stored_proc(database, "update_table", ("voters", "street_address = '" + json_object["street"] + "'", "email = '" + json_object["email"] + "'"))
    if (json_object["zip"] != json_object["oldZip"]):
        zip_plus_four = json_object["zip"] + "-" + str(random.randrange(1000, 9999))
        execute_stored_proc(database, "create_zip", (zip_plus_four, json_object["city"], json_object["state"]))
        database.commit()
        allZip = execute_stored_proc(database, "select_all_from_table_with_where", ("zips", "zip_code = '" + zip_plus_four + "'"))
        print (allZip)
        execute_stored_proc(database, "update_table", ("voters", "zip_code = '" + allZip[0][0] + "'", "email = '" + json_object["email"] + "'"))
        database.commit()
    get_voter = execute_stored_proc(database, "check_voter_with_join", (json_object["email"], "voters", "zips", ("first_name, middle_name, last_name, street_address, email, drivers_license, passport, b.zip_code, b.city, state"), "b.zip_code = t.zip_code"))
    print (get_voter[0])
    database.commit()
    return jsonify(get_voter[0])
