import scipy.stats as sc
from flask import session
from matplotlib.figure import Figure
from io import BytesIO
import base64
import numpy as np

def ttest(dataInfo):
    """
    input: Two string containing the column of interests
    Uses: The session dataset object to get the columns
    Output: The ttest of the list
    """
    column1 = session['dataset'].getColumn(dataInfo['column1'])
    column2 = session['dataset'].getColumn(dataInfo['column2'])
    indVariance = dataInfo['selection']
    if indVariance == "True":
        answer = sc.ttest_ind(column1, column2, equal_var = True)
    else:
        answer = sc.ttest_ind(column1, column2, equal_var = False)

    testStatistic = answer.statistic
    pvalue = answer.pvalue

    fig = Figure(figsize=(10, 3))
    ax = fig.subplots()
    ax.boxplot([column1, column2])
    ax.set_title("T Test " + dataInfo['column1'] + " " + dataInfo['column2'] )
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
    answer = sc.kstest(selectedColumn , sc.norm.cdf)
    pvalue = answer.pvalue
    stat = answer.statistic

    mu, sigma = sc.norm.fit(data=selectedColumn)

    fig = Figure(figsize=(10, 3))
    ax = fig.subplots()
    n, bins, patches = ax.hist(selectedColumn, bins=15, density=True, color='orange')
    y = ((1 / (np.sqrt(2 * np.pi) * sigma)) *
     np.exp(-0.5 * (1 / sigma * (bins - mu))**2)) 
    ax.plot(bins, y, '--', color ='black') 

    ax.set_title("normal Test " + column)
    buf = BytesIO()
    fig.savefig(buf, format="jpg")
    imageData = base64.b64encode(buf.getbuffer()).decode("ascii")
    return {
        "pValue": str(round(pvalue, 4)),
        "statistic": str(round(stat, 4)),
        "imageData": imageData  
    }


def statCorrelation(dataInfo):
    """
    """
    column1 = session['dataset'].getColumn(dataInfo['column1'])
    column2 = session['dataset'].getColumn(dataInfo['column2'])
    answer = sc.stats.pearsonr(column1, column2)

    fig = Figure(figsize=(10, 3))
    ax = fig.subplots()
    ax.scatter(column1, column2)
    ax.set_xlabel(dataInfo['column1'])
    ax.set_ylabel(dataInfo['column2'])
    ax.set_title('Scatter Plot')
    buf = BytesIO()
    fig.savefig(buf, format="jpg")
    imageData = base64.b64encode(buf.getbuffer()).decode("ascii")

    return {
        "correlation": str(answer[0]),
        "pValue": str(answer[1]),
        "scatterImage": imageData
    }   