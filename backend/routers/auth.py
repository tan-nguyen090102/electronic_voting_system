from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from backend.dependencies import db
from backend.services.auth import verify_voter

auth_bp = Blueprint('auth_bp', __name__)
@auth_bp.route('/login', methods=["POST"])
@cross_origin()
def login(db=db):
    json_object = request.json

    verification = False
    if json_object["role"] == "voter":
        verification = verify_voter(db, json_object)

    return jsonify(verification)





