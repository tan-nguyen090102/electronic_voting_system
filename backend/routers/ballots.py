import json

from dependencies import db
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from services.ballots import create_ballot, delete_ballot, get_all_ballots
from services.precincts import get_all_precincts
from services.races import get_all_races

ballot_bp = Blueprint("ballot_bp", __name__)


@ballot_bp.route("/ballot_admin", methods=["GET", "POST"])
@cross_origin()
def ballots(database=db):
    if request.method == "GET":
        all_ballots = get_all_ballots(database)
        return json.dumps(all_ballots)

    if request.method == "POST":
        json_object = request.json
        ballot_id = json_object["ballotID"]
        response = delete_ballot(database, ballot_id)

        if response == 200:
            return "Ballot deleted", 200
        elif response == 400:
            return "Cannot find the selected precinct", 400
        else:
            return "Server Error", 500


@ballot_bp.route("/ballot_admin/add", methods=["GET", "POST"])
@cross_origin()
def ballots_add(database=db):
    if request.method == "GET":
        all_precincts = get_all_precincts(database)
        all_races = get_all_races(database)
        return json.dumps([all_precincts, all_races])

    if request.method == "POST":
        json_object = request.json
        response = create_ballot(database, json_object)

        if response == 200:
            return jsonify("true")
        elif response == 400:
            return jsonify("Ballot already exists.")
        else:
            return jsonify("Server Error")
