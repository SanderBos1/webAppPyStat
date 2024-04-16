from flask import Blueprint, render_template, session, request, send_file
import json
import pandas as pd
from models import userDataset

headerBP = Blueprint(
    "headerBP",
    __name__,
    template_folder="templates",
    static_folder="static",
    static_url_path="/header/static",
)


@headerBP.route('/savePystat', methods=["GET", "POST"])
def savePytest():
    """
    Saves the pystat file to the server and returns it to the user
    """
    
    saveDictionary = {
       "dataset": session['dataset'].getDataset().to_json()
   } 
    with open('pystat.pyStat', 'w') as f:
        f.write(json.dumps(saveDictionary))


    return send_file('pystat.pyStat', as_attachment=True)


@headerBP.route('/loadData', methods=["POST"])
def loadPytest():
    """
    Opens a pytest file and loads the data so that the user state can be restored.

    """
    f  = request.files['filename']
    data = json.loads(f.read())
    session['dataset'] = userDataset(pd.read_json(data['dataset']))
  
    return render_template('userCanvas.html', columns = session['dataset'].getColumns())

@headerBP.route('/loadCSV', methods=["POST"])
def loadCSV():
    """
    Converts a csv file to dataframe and sets the dataframe session variable

    """
    f  = request.files['filename']
    df = pd.read_csv(f.stream)
    session['dataset'] = userDataset(df)
  
    return render_template('userCanvas.html', columns = session['dataset'].getColumns())
