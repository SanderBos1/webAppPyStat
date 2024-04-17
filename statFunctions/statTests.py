import scipy.stats as sc
from flask import session

def ttest( column1, column2, indVariance):
    """
    input: Two string containing the column of interests
    Uses: The session dataset object to get the columns
    Output: The ttest of the list
    """
    answer = sc.ttest_ind(session['dataset'].getColumn(column1), session['dataset'].getColumn(column2), equal_var = indVariance)
    testStatistic = answer.statistic
    pvalue = answer.pvalue

    return {
        "pValue": str(pvalue),
        "testStatistic": str(testStatistic)
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
    return {
        "pValue": str(pvalue),
    }