from flask import Flask
from flask_session import Session
from userCanvas import userCanvasBP
from header import headerBP
app = Flask(__name__)

app.register_blueprint(headerBP)
app.register_blueprint(userCanvasBP)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)