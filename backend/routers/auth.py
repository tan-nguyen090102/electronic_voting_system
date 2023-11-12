from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import cross_origin
from backend.dependencies import db
from backend.services.auth import voter_login


auth_bp = Blueprint('auth_bp', __name__)
bcrypt = Bcrypt()
@auth_bp.route('/login', methods=["POST"])
@cross_origin()
def login(db=db,input_bcrypt=bcrypt):
    json_object = request.json
    login_check = False
    if json_object["role"] == "voter":
        login_check = voter_login(db, input_bcrypt,json_object)
    return jsonify(login_check)





