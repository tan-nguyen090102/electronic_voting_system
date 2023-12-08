import json

from dependencies import db
from flask import Blueprint, request
from flask_bcrypt import Bcrypt
from flask_cors import cross_origin
from services.voters import (
    create_voter,
    get_candidates_voter,
    get_precinct_voter,
    get_races_voter,
)

voters_bp = Blueprint("voters_bp", __name__)
bcrypt = Bcrypt()


@voters_bp.route("/", methods=["POST"])
@cross_origin()
def voters(database=db, bcrypt_input=bcrypt):
    json_object = request.json
    response = create_voter(database, bcrypt_input, json_object)

    if response == 200:
        return "Voter Created", 200
    elif response == 400:
        return "Voter Already Exists", 400
    else:
        return "Server Error", 500


@voters_bp.route("/ballot_voter", methods=["POST"])
@cross_origin()
def ballots_voter(database=db):
    json_object = request.json
    precinct = get_precinct_voter(database, json_object)
    all_races = get_races_voter(database, precinct[0])
    list_of_candidate = []

    for race in all_races:
        list_of_candidate.append(get_candidates_voter(database, race[0]))

    return json.dumps([precinct, all_races, list_of_candidate])


@voters_bp.route("/ballot_voter/race", methods=["POST"])
@cross_origin()
def races_voter(database=db):
    json_object = request.json
    all_candidates = get_candidates_voter(database, json_object)

    return json.dumps(all_candidates)
