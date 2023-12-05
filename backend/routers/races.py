import json

from dependencies import db
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from services.districts import get_all_districts
from services.elections import get_all_elections
from services.races import create_race, delete_race, get_all_races
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
