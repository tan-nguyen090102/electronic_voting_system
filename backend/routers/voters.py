import flask
from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import cross_origin
from dependencies import db
from services.voters import create_voter
from database.database_functions import execute_stored_proc
from services import voters
import json


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
