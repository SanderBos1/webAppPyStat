from flask import Flask
from flask_session import Session
from userDashboard import userDashboardBp
from header import headerBP
app = Flask(__name__)

app.register_blueprint(headerBP)
app.register_blueprint(userDashboardBp)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)