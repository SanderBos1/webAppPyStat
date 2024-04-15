from flask import Blueprint, render_template, session, request
import pandas as pd
from models import userDataset


userDashboardBp = Blueprint(
    "userDashboardBp",
    __name__,
    template_folder="templates",
    static_folder="static",
    static_url_path="/userDashboard/static",
)

@userDashboardBp.route('/', methods=["POST", "GET"])
def hello_world():
    session['dataset'] = "test"
    return render_template('userCanvas.html')

@userDashboardBp.route('/load_csv', methods=["POST"])
def load_csv():
    """
    Converts a csv file to dataframe and sets the dataframe session variable

    """
    f  = request.files['filename']
    session['dataset'] = userDataset(f)
    print(session['dataset'].getColumns())

    return "session dataset has been created"
