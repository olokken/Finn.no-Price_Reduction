import json
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from models import Price, Car
import datetime

def handleCar(car): 
  json_string = json.dumps(car.__dict__)
  print(json_string)

def handleInfo(title, info, picture): 
  year_model = int(info[0])
  mileage = int(info[1].split("k")[0].replace(" ", ""))
  car_price = int(info[2].split("k")[0].replace(" ", ""))
  prices = [Price(car_price, datetime.datetime.now())]
  handleCar(Car(title.get_attribute("id"), title.text, year_model, mileage, prices, picture))

def scrape_cars():
  PATH = "/Users/olelokken/DEV/Finn.no-Price_Reduction/scraping/chromedriver"
  driver = webdriver.Chrome(PATH)
  driver.get("https://www.finn.no/car/used/search.html?engine_fuel=0%2F2&location=20016&page=12&price_to=70000&sort=PUBLISHED_DESC")
  while True:
    element_div = WebDriverWait(driver, 5).until(
          EC.presence_of_element_located((By.XPATH, '//*[@id="page-results"]/div[2]'))
      )
    articles = element_div.find_elements_by_tag_name('article')
    for article in articles:
      picture = article.find_element_by_tag_name('img').screenshot_as_base64
      title = article.find_element_by_tag_name('a')
      info = article.find_element_by_class_name('ads__unit__content__keys').text.split('\n')
      handleInfo(title, info, picture)
    try:
      element = WebDriverWait(driver, 5).until(
          EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/main/div[3]/div/nav[1]/a[3]"))
      )
      element.click()
    except Exception:
      break
  driver.quit()

if __name__ == "__main__":
  scrape_cars()