from flask import Blueprint, render_template, request
from statFunctions import mean, median, mode, variance, standardDeviation, statCount
from statFunctions import ttest, normalTest
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

    descriptiveStats = {
        "mean": columnMean,
        "median": columnMedian,
        "columnMode": columnMode,
        "columnVariance": columnVariance,
        "columnStandardDeviation": columnStandardDeviation,
        "columnStatCount": columnStatCount
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