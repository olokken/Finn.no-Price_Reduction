import pymongo
from pymongo import MongoClient
from models import Price, Car, CarEncoder
import json 

def set_up():
  cluster = MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false")
  db = cluster["finn_price_reduction"]
  return db["Cars"]
  

def get_car(code): 
  collection = set_up()
  return collection.find_one({'code':code})

def post_car(car):  
  collection = set_up()
  collection.insert_one(json.loads(CarEncoder().encode(car)))

def add_price(code, price):
  collection = set_up()
  collection.update_one({'code':code}, {'$push':{'prices':json.dumps(price.__dict__)}})

