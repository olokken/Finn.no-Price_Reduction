from json import JSONEncoder
class Price: 
   def __init__(self, sum, date):   
        self.sum = sum
        self.date = date 

class Car: 
   def __init__(self, code, modelName, yearModel, mileage, price, isSold, picture ):   
        self.code = code
        self.modelName = modelName
        self.yearModel = yearModel
        self.mileage = mileage
        self.prices = price
        self.isSold = isSold
        self.picture = picture 

class CarEncoder(JSONEncoder):
        def default(self, car):
            return car.__dict__
   
