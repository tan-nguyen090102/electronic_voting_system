from flask import Flask
from pathlib import Path
from database.database_functions import create_db_connection

current_directory = Path.cwd()
db_connection = create_db_connection("dev_db", current_directory / "database/config_db.json")

app = Flask(__name__)
@app.route('/')
def hello_world():
    return 'Hello World'
# main driver function
if __name__ == '__main__':
    try:
        app.run()
    finally:
        db_connection.close()
