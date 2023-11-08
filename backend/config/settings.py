class Settings:
    project_name: str = "voting_system"
    project_version: str = "0.0.1"
    app_env = "development"

    my_sql_config_dict = {
        "user": "root",
        "password": "ff4_Rydia",
        "server": "localhost",
        "port": 3306,
        "db": "dev_db"
    }

    @property
    def database_config(self):
        return self.my_sql_config_dict


