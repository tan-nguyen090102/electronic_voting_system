import json

from dependencies import db
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from services.districts import get_all_districts
from services.precincts import create_precinct, delete_precinct, get_all_precincts

precinct_bp = Blueprint("precinct_bp", __name__)


@precinct_bp.route("/precinct", methods=["GET", "POST"])
@cross_origin()
def precincts(database=db):
    if request.method == "GET":
        all_precincts = get_all_precincts(database)
        return json.dumps(all_precincts)

    if request.method == "POST":
        json_object = request.json
        precinct_id = json_object["precinctID"]
        response = delete_precinct(database, precinct_id)

        if response == 200:
            return "Precinct deleted", 200
        elif response == 400:
            return "Cannot find the selected precinct", 400
        else:
            return "Server Error", 500


@precinct_bp.route("/precinct/add", methods=["GET", "POST"])
@cross_origin()
def precincts_add(database=db):
    if request.method == "GET":
        all_district = get_all_districts(database)
        print(all_district)
        return json.dumps(all_district)

    if request.method == "POST":
        json_object = request.json
        response = create_precinct(database, json_object)

        if response == 200:
            return "Precinct created", 200
        elif response == 400:
            return "Precinct already existed!", 400
        else:
            return "Server Error", 500
