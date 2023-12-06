import json

from dependencies import db
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from services.districts import get_all_districts
from services.elections import get_all_elections
from services.officials import create_official, get_all_officials
from services.races import (
    add_candidate_number_to_race,
    create_race,
    delete_official,
    delete_race,
    get_all_races,
)
from services.types import get_all_types

race_bp = Blueprint("race_bp", __name__)


@race_bp.route("/race", methods=["GET", "POST"])
@cross_origin()
def races(database=db):
    if request.method == "GET":
        all_races = get_all_races(database)
        return json.dumps(all_races)

    if request.method == "POST":
        json_object = request.json
        race_id = json_object["raceID"]
        response = delete_race(database, race_id)

        if response == 200:
            return "Electoral race deleted", 200
        elif response == 400:
            return "Cannot find the selected electoral race", 400
        else:
            return "Server Error", 500


@race_bp.route("/race/add", methods=["GET", "POST"])
@cross_origin()
def races_add(database=db):
    if request.method == "GET":
        all_types = get_all_types(database)
        all_districts = get_all_districts(database)
        all_elections = get_all_elections(database)
        return json.dumps([all_districts, all_elections, all_types])

    if request.method == "POST":
        json_object = request.json
        response = create_race(database, json_object)

        if response == 200:
            return jsonify("true")
        elif response == 400:
            return jsonify("Electoral race already exists.")
        else:
            return jsonify("Server Error")


@race_bp.route("/race/view_candidate", methods=["POST"])
@cross_origin()
def candidate_race_view(database=db):
    if request.method == "POST":
        json_object = request.json
        race_id = json_object["raceID"]

        all_officials = get_all_officials(database, race_id)
        return json.dumps(all_officials)


@race_bp.route("/race/add_candidate", methods=["POST"])
@cross_origin()
def candidate_race_add(database=db):
    if request.method == "POST":
        json_object = request.json
        response = create_official(database, json_object)

        if response == 200:
            add_candidate_number_to_race(database, json_object["raceID"])

            return jsonify("true")
        elif response == 400:
            return jsonify("Candidate for this Electoral Race already exists.")
        elif response == 404:
            return jsonify("Candidate not found in the system.")
        else:
            return jsonify("Server Error")


@race_bp.route("/race/delete_candidate", methods=["POST"])
@cross_origin()
def candidate_race_delete(database=db):
    if request.method == "POST":
        json_object = request.json
        official_id = json_object["officialID"]
        race_id = json_object["raceID"]
        response = delete_official(database, official_id, race_id)

        if response == 200:
            return "Candidate deleted", 200
        elif response == 400:
            return "Cannot find the selected candidate", 400
        else:
            return "Server Error", 500
