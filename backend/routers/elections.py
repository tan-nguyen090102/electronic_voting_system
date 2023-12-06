import json

from dependencies import db
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from services.elections import (
    create_election,
    delete_election,
    get_all_elections,
    update_election,
    update_status_election,
)

election_bp = Blueprint("election_bp", __name__)


@election_bp.route("/election", methods=["GET", "POST"])
@cross_origin()
def elections(database=db):
    if request.method == "GET":
        all_elections = get_all_elections(database)
        return json.dumps(all_elections)
    if request.method == "POST":
        json_object = request.json
        response = update_status_election(database, json_object)

        if response == 200:
            return jsonify("true")
        elif response == 400:
            return jsonify("Election cannot be updated")
        else:
            return jsonify("Server Error")


@election_bp.route("/election/add", methods=["GET", "POST"])
@cross_origin()
def elections_add(database=db):
    if request.method == "POST":
        json_object = request.json
        response = create_election(database, json_object)

        if response == 200:
            return jsonify("true")
        elif response == 400:
            return jsonify("Election already exists.")
        else:
            return jsonify("Server Error")


@election_bp.route("/election/edit", methods=["POST"])
@cross_origin()
def elections_edit(database=db):
    if request.method == "POST":
        json_object = request.json
        response = update_election(database, json_object)

        if response == 200:
            return jsonify("true")
        elif response == 400:
            return jsonify("Election cannot be updated")
        else:
            return jsonify("Server Error")


@election_bp.route("/election/delete", methods=["POST"])
@cross_origin()
def elections_delete(database=db):
    if request.method == "POST":
        json_object = request.json
        election_id = json_object["electionID"]
        response = delete_election(database, election_id)

        if response == 200:
            return "Election deleted", 200
        elif response == 400:
            return "Cannot find the selected election", 400
        else:
            return "Server Error", 500
