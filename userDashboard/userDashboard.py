from flask import Blueprint, render_template, session, request, send_file
from statFunctions import mean, median, mode, variance, standardDeviation, statCount
import json

userDashboardBp = Blueprint(
    "userDashboardBp",
    __name__,
    template_folder="templates",
    static_folder="static",
    static_url_path="/userDashboard/static",
)


@userDashboardBp.route('/', methods=["POST", "GET"])
def startPage():
    return render_template('userCanvas.html')

@userDashboardBp.route('/descriptive/<column>', methods=["POST", "GET"])
def descriptive(column):
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
    print(descriptiveStats)

    return json.dumps(descriptiveStats)
