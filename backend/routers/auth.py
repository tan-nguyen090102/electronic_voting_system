from dependencies import db
from flask import Blueprint, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import cross_origin
from services.auth import admin_login, manager_login, voter_login

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
