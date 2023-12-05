from pathlib import Path

from database.database_functions import create_db_connection
from dependencies import db
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from routers.auth import auth_bp
from routers.candidates import candidate_bp
from routers.managers import managers_bp
from routers.precincts import precinct_bp
from routers.races import race_bp
from routers.voters import voters_bp

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True


@app.route("/")
@cross_origin()
def hello_world():
    return "Hello World"


if __name__ == "__main__":
    try:
        app.register_blueprint(voters_bp, url_prefix="/voters")
        app.register_blueprint(managers_bp, url_prefix="/managers")
        app.register_blueprint(auth_bp)
        app.register_blueprint(precinct_bp)
        app.register_blueprint(candidate_bp)
        app.register_blueprint(race_bp)
        app.run()
    finally:
        db.close()
