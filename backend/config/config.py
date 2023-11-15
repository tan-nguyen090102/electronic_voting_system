import pymysql
from pymysql.constants import CLIENT

from .settings import Settings


class Config:
    def __init__(self):
        self._settings = None
        self._db = None

    def setup(self):
        self.__setup_setting()
        self.__setup_database(self.settings.my_sql_config_dict)

    def __setup_setting(self):
        self._settings = Settings()

        print(f"Running in app_env: {self.settings.app_env}")
        print(f"Running with my_sql_server: {self.settings.my_sql_config_dict['server']}")
        print(f"Running with my_sql_db: {self.settings.my_sql_config_dict['db']}")

        return self.settings

    def __setup_database(self, my_sql_config_dict: dict):
        if self._settings:
            db_connection = pymysql.connect(
                user=my_sql_config_dict['user'],
                password=my_sql_config_dict['password'],
                host=my_sql_config_dict["server"],
                port=my_sql_config_dict["port"],
                database=my_sql_config_dict["db"],
                client_flag=CLIENT.MULTI_STATEMENTS,
            )
            self._db = db_connection
        return self._db

    @property
    def settings(self):
        if not self._settings:
            raise Exception(
                "config - Settings not set up. Call config.setup() to set up settings"
            )
        return self._settings

    @property
    def db(self):
        if not self._db:
            raise Exception(
                "config - Database not set up. Call config.setup() to set up db"
            )
        return self._db


config = Config()
