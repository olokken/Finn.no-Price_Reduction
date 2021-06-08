from car_service import post_car, get_car, add_price, set_sold
from models import Price, Car
import time

pris = Price(10000, time.time())

set_sold('220793710')