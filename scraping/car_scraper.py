import json
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from models import Price, Car
from car_service import post_car, get_car, add_price, set_sold
import time

def handle_car(car): 
  db_car = get_car(car.code)
  if(db_car):
    if(car.isSold):
      set_sold(car.code)
    else: 
      lastPrice = db_car['prices'][-1]['sum']
      currentSum = car.prices[0].sum
      if(lastPrice != currentSum):
        add_price(car.code, car.prices[0])
  else:
    post_car(car)



def handle_info(title, info, picture): 
  year_model = int(info[0])
  mileage = int(info[1].split("k")[0].replace(" ", ""))
  try: 
    car_price = int(info[2].split("k")[0].replace(" ", ""))
    isSold = False
  except Exception: 
    car_price = 0
    isSold = True
  prices = [Price(car_price, time.time())]
  handle_car(Car(title.get_attribute("id"), title.text, year_model, mileage, prices, isSold, picture))


def scrape_cars():
  PATH = "/Users/olelokken/DEV/Finn.no-Price_Reduction/scraping/chromedriver"
  driver = webdriver.Chrome(PATH)
  driver.get("https://www.finn.no/car/used/search.html?engine_fuel=0%2F2&location=20016&price_to=70000&sort=PUBLISHED_DESC")
  while True:
    time.sleep(3)
    element_div = WebDriverWait(driver, 5).until(
          EC.presence_of_element_located((By.XPATH, '//*[@id="page-results"]/div[2]'))
      )
    articles = element_div.find_elements_by_tag_name('article')
    for article in articles:
      try:  
        picture = article.find_element_by_tag_name('img').screenshot_as_base64
        title = article.find_element_by_tag_name('a')
        info = article.find_element_by_class_name('ads__unit__content__keys').text.split('\n')
        handle_info(title, info, picture)
      except Exception:
        print('En feil skjedde, men fortsetter')
    try:
      element = WebDriverWait(driver, 5).until(
          EC.presence_of_element_located((By.XPATH, '//*[@id="__next"]/main/div[3]/div/nav[1]/a/span'))
      )
      element.click()
    except Exception:
      break
  driver.quit()

if __name__ == "__main__":
  scrape_cars()