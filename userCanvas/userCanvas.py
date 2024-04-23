from flask import Blueprint, render_template, request, session
from statFunctions import mean, median, mode, variance, standardDeviation, statCount, statMin, statMax
from statFunctions import ttest, normalTest, statCorrelation
import json

userCanvasBP = Blueprint(
    "userCanvasBP",
    __name__,
    template_folder="templates",
    static_folder="static",
    static_url_path="/userDashboard/static",
)


@userCanvasBP.route('/', methods=["POST", "GET"])
def startPage():
    if session.get('dataset') is not None:
        return render_template('userCanvas.html', columns = session['dataset'].getColumns())
    return render_template('userCanvas.html')

@userCanvasBP.route('/summaryStatistics/<column>', methods=["POST", "GET"])
def descriptive(column):
    """
    Handles the calculation of all descriptive statistics
    Returns a JSON object with all the statistics
    """
    columnMean = mean(column)
    columnMedian = median(column)
    columnMode = mode(column)
    columnVariance = variance(column)
    columnStandardDeviation = standardDeviation(column)
    columnStatCount = statCount(column)
    columnMin = statMin(column)
    columnMax= statMax(column)

    descriptiveStats = {
        "mean": columnMean,
        "median": columnMedian,
        "columnMode": columnMode,
        "columnVariance": columnVariance,
        "columnStandardDeviation": columnStandardDeviation,
        "columnStatCount": columnStatCount,
        "columnMin": columnMin,
        "columnMax": columnMax
    }

    return json.dumps(descriptiveStats)


@userCanvasBP.route('/normality/<column>', methods=["POST", "GET"])
def normalTestRoute(column):
    """
    Calculates the normality test for the selected column
    returns a json object with the p-value
    """
    answer = normalTest(column)
    return json.dumps(answer)

@userCanvasBP.route('/ttest', methods=["POST", "GET"])
def ttestTestRoute():
    """
    Calculates the normality test for the selected column
    returns a json object with the p-value
    """
    sendInfo = request.json
    answer = ttest(sendInfo)
    return json.dumps(answer)



@userCanvasBP.route('/correlation', methods=["POST", "GET"])
def correlation():
    """
    Calculates the correlation for the selected columns
    """
    sendInfo = request.json
    answer = statCorrelation(sendInfo) 
    return json.dumps(answer)

@userCanvasBP.route('/widgetDictionary', methods=["POST"])
def widgetDictionary():
    """
    Creates a dictionary of all the widgets that are created in the userCanvas if it does not exists.
    it will always add the new widget state info to the dictionary.
    """

    info = request.json


    if session.get('userCanvasState') is  None:    
        session['userCanvasState'] = []
        session['userCanvasState'].append(info)
    else:
        session['userCanvasState'].append(info)
 
    return  json.dumps("success")

@userCanvasBP.route('/getWidgetDictionary', methods=["GET"])
def getWidgetDictionary():
    """
    Returns a dictionary of all the widgets that are created in the userCanvas.
    Returns None if no session data is found.
    """
    if session.get('userCanvasState') is  None:    
        return None
    return session['userCanvasState']


@userCanvasBP.route('/removeWidgetIndex/<index>', methods=["GET"])
def removeWidgetIndex(index):
    """
    Removes the deleted widget from the userCanvasState dictionary
    """
    if session.get('userCanvasState') is  None:    
        return None
    del session['userCanvasState'][int(index)]
    return "deleted"

@userCanvasBP.route('/switchWidgetIndex', methods=["POST"])
def switchWidgetIndex():
    """
    Switches the places of two widgets based on their index
    """
    info = request.json
    if session.get('userCanvasState') is  None:    
        return None
    session['userCanvasState'][info['oldIndex']], session['userCanvasState'][info['newIndex']] = session['userCanvasState'][info['newIndex']], session['userCanvasState'][info['oldIndex']]
    return "switched"
    
    
 