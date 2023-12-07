import json

from dependencies import db
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from services.districts import (
    create_district,
    delete_district,
    get_all_districts,
    update_district,
)

district_bp = Blueprint("district_bp", __name__)


@district_bp.route("/district", methods=["GET", "POST"])
@cross_origin()
def districts(database=db):
    if request.method == "GET":
        all_districts = get_all_districts(database)
        return json.dumps(all_districts)

    if request.method == "POST":
        json_object = request.json
        district_id = json_object["districtID"]
        response = delete_district(database, district_id)

        if response == 200:
            return "district deleted", 200
        elif response == 400:
            return "Cannot find the selected district", 400
        else:
            return "Server Error", 500


@district_bp.route("/district/add", methods=["POST"])
@cross_origin()
def districts_add(database=db):
    if request.method == "POST":
        json_object = request.json
        response = create_district(database, json_object)

        if response == 200:
            return jsonify("true")
        elif response == 400:
            return jsonify("District already exists")
        else:
            return jsonify("Server Error")


@district_bp.route("/district/edit", methods=["POST"])
@cross_origin()
def districts_edit(database=db):
    if request.method == "POST":
        json_object = request.json
        response = update_district(database, json_object)

        if response == 200:
            return jsonify("true")
        elif response == 400:
            return jsonify("District cannot be updated")
        else:
            return jsonify("Server Error")
