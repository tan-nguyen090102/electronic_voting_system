import json

from dependencies import db
from flask import Blueprint, request
from flask_bcrypt import Bcrypt
from flask_cors import cross_origin
from services.managers import create_manager, get_precinct_manager, get_races_manager

managers_bp = Blueprint("managers_bp", __name__)
bcrypt = Bcrypt()


@managers_bp.route("/", methods=["POST"])
@cross_origin()
def managers(database=db, bcrypt_input=bcrypt):
    json_object = request.json
    response = create_manager(database, bcrypt_input, json_object)

    if response == 200:
        return "Manager Created", 200
    elif response == 400:
        return "Manager Already Exists", 400
    else:
        return "Server Error", 500


@managers_bp.route("/ballot_manager", methods=["POST"])
@cross_origin()
def ballots_voter(database=db):
    json_object = request.json
    precinct = get_precinct_manager(database, json_object)
    all_races = get_races_manager(database, precinct[0])

    return json.dumps([precinct, all_races])
