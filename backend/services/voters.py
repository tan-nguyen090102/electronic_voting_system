import random
import uuid
from database.database_functions import execute_stored_proc
from dependencies import email_server
from config.config import config
from email.mime.text import MIMEText


def create_voter(db, bcrypt, voter):
    zip_plus_four = random.randrange(1000, 9999)
    password_hash = bcrypt.generate_password_hash(voter["password"]).decode("utf-8")
    try:
        execute_stored_proc(
            db,
            "create_voter",
            (
                voter["firstName"],
                voter["middleName"],
                voter["lastName"],
                voter["street"],
                voter["zip"] + "-" + str(zip_plus_four),
                voter["city"],
                voter["state"],
                voter["email"],
                password_hash,
                voter["dob"],
                voter["driverID"],
                voter["questionIndex"],
                voter["securityAnswer"],
                voter["passport"],
            ),
        )
        db.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def get_precinct_voter(database, voter):
    all_precincts = execute_stored_proc(
        database,
        "select_precinct_for_voter",
        (
            "precinct_id",
            'v.email = "' + voter["email"] + '"',
        ),
    )
    if all_precincts is not None:
        return all_precincts[0]


def get_all_voters(db):
    all_voters = execute_stored_proc(db, "select_all_from_table", ("voters",))
    if all_voters:
        json_voters = []
        for voter in all_voters:
            json_voter = {
                "userID": uuid.UUID(bytes=bytes(voter[0])),
                "firstName": voter[1],
                "middleName": voter[2],
                "lastName": voter[3],
                "streetAddress": voter[4],
                "email": voter[5],
                "dob": voter[7].strftime("%m/%d/%Y"),
                "driverID": voter[8],
                "approvalStatus": voter[9],
                "zip": voter[13],
                "city": voter[14],
            }
            zip = execute_stored_proc(
                db,
                "get_zip",
                (
                    voter[13],
                    voter[14],
                ),
            )
            json_voter["state"] = zip[0][2]
            json_voters.append(json_voter)
        return json_voters
    else:
        return "False"


def get_races_voter(database, precinct_id):
    all_races = execute_stored_proc(
        database,
        "select_some_from_table_with_join_where",
        (
            "ballots",
            "races",
            "b.race_id, precinct_id, title, body_type, term, election_id, status, number_candidates",
            "t.race_id = b.race_id",
            "precinct_id = '" + precinct_id + "'",
        ),
    )
    if all_races is not None:
        return all_races
    else:
        return []


def get_candidates_voter(database, race_id):
    all_candidates = execute_stored_proc(
        database,
        "select_some_from_table_with_join_where",
        (
            "officials",
            "candidates",
            "b.race_id, first_name, last_name, b.candidate_id",
            "t.candidate_id = b.candidate_id",
            "race_id = '" + race_id + "'",
        ),
    )
    if all_candidates is not None:
        return all_candidates
    else:
        return "False"


def change_voter_status(db, status_info):
    try:
        execute_stored_proc(
            db,
            "update_voter_status",
            (
                status_info["email"],
                status_info["approvalStatus"],
            ),
        )
        db.commit()
        return 200
    except Exception as e:
        print(e)
        return 400


def send_status_email(db, status_info):
    subject = "Voter Request Status"

    voter_status_response = execute_stored_proc(
        db, "get_voter_status", (status_info["email"],)
    )
    voter_status = voter_status_response[0][0]

    if status_info["approvalStatus"] == "approved":
        body = "Congratulations, your voting request has been approved"
    elif status_info["approvalStatus"] == "declined" and voter_status == "approved":
        body = "After some review, your voting request has been revoked"
    else:
        body = "We regret to info you that your voting request has been denied"

    sender_email = config.settings.email_config_dict["sender_email"]

    message = MIMEText(body, "plain")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = status_info["email"]

    email_server.sendmail(sender_email, status_info["email"], message.as_string())
