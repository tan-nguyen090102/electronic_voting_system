import smtplib, ssl
from config.config import config

config.setup()
db = config.db


def setup_email_server():
    email_config = config.settings.email_config
    context = ssl.create_default_context()
    server = smtplib.SMTP(email_config["smtp_server"], email_config["port"])
    server.starttls(context=context)
    server.login(email_config["sender_email"], email_config["password"])

    return server


email_server = setup_email_server()
