from database.database_functions import execute_stored_proc
import random


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
