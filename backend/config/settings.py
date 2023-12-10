class Settings:
    project_name: str = "voting_system"
    project_version: str = "0.0.1"
    app_env = "development"

    my_sql_config_dict = {
        "user": "root",
        "password": "your_password",
        "server": "localhost",
        "port": 3306,
        "db": "dev_db",
    }

    email_config_dict = {
        "port": 587,
        "smtp_server": "smtp.gmail.com",
        "sender_email": "voting.system.team.02.dev@gmail.com",
        "password": "your_password",
    }

    @property
    def database_config(self):
        return self.my_sql_config_dict

    @property
    def email_config(self):
        return self.email_config_dict
