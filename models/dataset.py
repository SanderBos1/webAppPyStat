from pandas.api.types import is_numeric_dtype



class userDataset:
    """
    Defines a class that describes the dataset that is used by the user
    
    """
    def __init__(self, dataset):
        self.dataset = dataset

    def getColumn(self, column):
        return self.dataset[column]
    
    def getColumns(self):
        """
        Gets all the numerical columns of the dataset
        """
        numerical_columns = []
        for column in self.dataset.columns:
            if is_numeric_dtype(self.dataset[column]):
                numerical_columns.append(column)
        return numerical_columns
    
    def getDataset(self):
        return self.dataset

    