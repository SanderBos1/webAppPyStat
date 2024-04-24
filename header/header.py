from flask import Blueprint, render_template, session, request, send_file, flash, redirect
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
       "dataset": session['dataset'].getDataset().to_json(),
        "state": json.dumps(session['userCanvasState'])

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
    session['userCanvasState'] = json.loads(data['state'])
    return redirect("/")

@headerBP.route('/loadCSV', methods=["POST"])
def loadCSV():
    """
    Converts a csv file to dataframe and sets the dataframe session variable

    """
    if 'filename' not in request.files:
        flash('No file part')
        return render_template('userCanvas.html')
    
    file = request.files['filename']
    if file.filename == '':
            flash('No selected file')
            return render_template('userCanvas.html')
    
    if session.get('userCanvasState') is  not None:    
        session['userCanvasState'] = []
    f  = request.files['filename']
    df = pd.read_csv(f.stream)
    session['dataset'] = userDataset(df)
  
    return redirect("/")


@headerBP.route('/documentation', methods=["GET"])
def documentation():
    return render_template('documentation.html')


@headerBP.route('/showDataset', methods=["GET"])
def showDataset():
    if session['dataset'] is None:
        return render_template('dataset.html')
    else:
        dataSet = session['dataset'].getDataset()
        return render_template('dataset.html', dataset=dataSet.to_html(max_rows = 100, classes="table table-hover thead-light table-striped"))