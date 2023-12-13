import json

from dependencies import db
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from services.voters import get_all_voter_search

search_bp = Blueprint("search_bp", __name__)


@search_bp.route("/search", methods=["GET", "POST"])
@cross_origin()
def searches(database=db):
    if request.method == "POST":
        json_object = request.json
        all_searches = get_all_voter_search(database, json_object)
        return json.dumps(all_searches)
