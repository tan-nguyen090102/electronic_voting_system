import json
from database.database_functions import execute_stored_proc

from dependencies import db
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from services.candidates import create_candidate, delete_candidate, get_all_candidates
from services.geography import get_all_geography

candidate_bp = Blueprint("candidate_bp", __name__)


@candidate_bp.route("/candidate", methods=["GET", "POST"])
@cross_origin()
def candidates(database=db):
    if request.method == "GET":
        all_candidates = get_all_candidates(database)
        return json.dumps(all_candidates)

    if request.method == "POST":
        json_object = request.json
        candidate_id = json_object["candidateID"]
        response = delete_candidate(database, candidate_id)

        if response == 200:
            return "Candidate deleted", 200
        elif response == 400:
            return "Cannot find the selected candidate", 400
        else:
            return "Server Error", 500


@candidate_bp.route("/candidate/add", methods=["GET", "POST"])
@cross_origin()
def candidates_add(database=db):
    if request.method == "GET":
        all_geography = get_all_geography(database)
        return json.dumps(all_geography)

    if request.method == "POST":
        json_object = request.json
        response = create_candidate(database, json_object)

        if response == 200:
            return jsonify("true")
        elif response == 400:
            return jsonify("candidate already exists")
        else:
            return jsonify("Server Error")

@candidate_bp.route("/candidate_voter", methods=["POST"])
@cross_origin()
def candidate_voter(database=db):
    json_object = request.json
    print ("hello '" + json_object["candidate"] + "'")
    get_candidate = execute_stored_proc(database, "select_all_from_table_with_where", ("candidates", "candidate_id = '" + json_object["candidate"] + "'"))
    candidate = get_candidate[0]
    candidate = list(candidate)
    print (candidate)
    candidate[3] = candidate[3].strftime("%m-%d-%Y")
    print (candidate)
    return jsonify(candidate)

