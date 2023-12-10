from dependencies import db
from flask import Blueprint, request, redirect
from flask_cors import cross_origin
from services.voters import change_voter_status, get_all_voters, send_status_email


requests_bp = Blueprint("requests_bp", __name__)


@requests_bp.route("/", methods=["GET"])
@cross_origin()
def requests():
    return redirect("/voters")


@requests_bp.route("/update", methods=["PATCH"])
@cross_origin()
def requests_update(database=db):
    status_info = request.json
    send_status_email(db, status_info)
    change_voter_status(database, status_info)
    voters = get_all_voters(database)
    if voters:
        return voters
    else:
        return "Could not retrive voters", 404
