from flask import Flask, request, jsonify
from pathlib import Path

from flask_cors import CORS,cross_origin
from database.database_functions import create_db_connection
from routers.voters import voters_bp
from routers.auth import auth_bp
from config.config import config

current_directory = Path.cwd()
db_connection = create_db_connection("dev_db", current_directory / "database/config_db.json")

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

@app.route('/')
@cross_origin()
def hello_world():
    return 'Hello World'

if __name__ == '__main__':
    try:
        app.register_blueprint(voters_bp, url_prefix='/voters')
        app.register_blueprint(auth_bp)
        app.run()
    finally:
        db_connection.close()
