import scipy.stats as sc
from flask import session
from matplotlib.figure import Figure
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import numpy as np
from scipy.stats import norm

def ttest( column1, column2, indVariance):
    """
    input: Two string containing the column of interests
    Uses: The session dataset object to get the columns
    Output: The ttest of the list
    """
    answer = sc.ttest_ind(session['dataset'].getColumn(column1), session['dataset'].getColumn(column2), equal_var = indVariance)
    testStatistic = answer.statistic
    pvalue = answer.pvalue

    fig = Figure(figsize=(10, 3))
    ax = fig.subplots()
    ax.boxplot([session['dataset'].getColumn(column1), session['dataset'].getColumn(column2)])
    ax.set_title("T Test" + column1)
    buf = BytesIO()
    fig.savefig(buf, format="jpg")
    imageData = base64.b64encode(buf.getbuffer()).decode("ascii")


    return {
        "pValue": str(pvalue),
        "statistic": str(testStatistic),
        "imageData": imageData 
    }
    

def normalTest(column):
    """
    input: A string containing the column of interest
    Uses: The session dataset object to get the columns
    Output: The normality test of the list
    """
    selectedColumn = session['dataset'].getColumn(column)
    answer = sc.normaltest(selectedColumn)
    pvalue = answer.pvalue
    stat = answer.statistic

    mu, sigma = norm.fit(selectedColumn)

    fig = Figure(figsize=(10, 3))
    ax = fig.subplots()
    n, bins, patches = ax.hist(selectedColumn, bins=15, density=True, color='orange')
    y = ((1 / (np.sqrt(2 * np.pi) * sigma)) *
     np.exp(-0.5 * (1 / sigma * (bins - mu))**2)) 
    ax.plot(bins, y, '--', color ='black') 

    ax.set_title("normal Test" + column)
    buf = BytesIO()
    fig.savefig(buf, format="jpg")
    imageData = base64.b64encode(buf.getbuffer()).decode("ascii")
    return {
        "pValue": str(round(pvalue, 4)),
        "statistic": str(round(stat, 4)),
        "imageData": imageData  
    }