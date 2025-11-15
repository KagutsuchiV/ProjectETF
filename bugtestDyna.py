# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# from selenium.webdriver.chrome.options import Options
# import time
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# import requests

# # 設定 Chrome 瀏覽器的選項
# chrome_options = Options()
# chrome_options.add_argument("--headless")  # 啟用無頭模式（不顯示瀏覽器界面）
# chrome_options.add_argument("--disable-gpu")  # 禁用 GPU 渲染，加快執行速度
# chrome_options.add_argument("--no-sandbox")

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import requests

# -------------------------------
#   Chrome Options 設定（新版）
# -------------------------------
chrome_options = Options()
chrome_options.add_argument("--headless=new")    # 新版 headless（避免閃退）
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
chrome_options.add_argument("--window-size=1920,1080")


# -------------------------------
#   ❗ 使用 Selenium Manager
#   自動下載正確版本 ChromeDriver
# -------------------------------
driver = webdriver.Chrome(options=chrome_options)


# -------------------------------
#   爬取網址
# -------------------------------
urls = {
    '0050': 'https://tw.stock.yahoo.com/quote/0050.TW/profile',
    '0056': 'https://tw.stock.yahoo.com/quote/0056.TW/profile',
    '00878': 'https://tw.stock.yahoo.com/quote/00878.TW/profile',
    '00679B': 'https://tw.stock.yahoo.com/quote/00679B.TW/profile',
    '00929': 'https://tw.stock.yahoo.com/quote/00929.TW/profile',
    '00919': 'https://tw.stock.yahoo.com/quote/00919.TW/profile',
    '00915': 'https://tw.stock.yahoo.com/quote/00915.TW/profile'
}

api_url = 'http://localhost:3000/FourthServer/uploadDataPrice'


# -------------------------------
#   傳送資料到後端 API
# -------------------------------
def send_data_to_server(code, price_text):
    data = {
        'code': code,
        'price_text': price_text
    }
    response = requests.post(api_url, json=data)

    if response.status_code == 200:
        print('資料傳送成功:', response.json())
    else:
        print(f'資料傳送失敗，狀態碼: {response.status_code}')


# -------------------------------
#   主程式：每分鐘爬一次
# -------------------------------
try:
    while True:
        for code, url in urls.items():
            driver.get(url)

            # 等動態資料載入
            price_element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located(
                    (By.XPATH, '//*[@id="main-0-QuoteHeader-Proxy"]/div/div[2]/div[1]/div/span[1]')
                )
            )

            if price_element:
                price_text = price_element.text
                print(f"{code} 價格: {price_text}")
                send_data_to_server(code, price_text)
            else:
                print(f"{code} 未找到價格資訊")

        # 每分鐘執行一次
        time.sleep(60)

except Exception as e:
    print(f"錯誤發生: {e}")

finally:
    driver.quit()
