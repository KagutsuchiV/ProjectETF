from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests

# 設定 Chrome 瀏覽器的選項
chrome_options = Options()
chrome_options.add_argument("--headless")  # 啟用無頭模式（不顯示瀏覽器界面）
chrome_options.add_argument("--disable-gpu")  # 禁用 GPU 渲染，加快執行速度
chrome_options.add_argument("--no-sandbox")

# 這裡要設定 chromedriver 的路徑
chrome_driver_path = "D:/program-2024/ProjectETF/chromedriver-win64/chromedriver.exe"  # 替換為 chromedriver 的實際路徑

service = Service(chrome_driver_path)

# 設定要爬取的網址
urls={
    '0050': 'https://tw.stock.yahoo.com/quote/0050.TW/profile',
    '0056': 'https://tw.stock.yahoo.com/quote/0056.TW/profile',
    '00878': 'https://tw.stock.yahoo.com/quote/00878.TW/profile',
    '00679B': 'https://tw.stock.yahoo.com/quote/00679B.TW/profile',        
    '00929': 'https://tw.stock.yahoo.com/quote/00929.TW/profile',
    '00919': 'https://tw.stock.yahoo.com/quote/00919.TW/profile',
    '00915': 'https://tw.stock.yahoo.com/quote/00915.TW/profile'
}

api_url = 'http://localhost:3000/FourthServer/uploadDataPrice'

def send_data_to_server(code, price_text):  # 修改這裡的參數名稱
    data = {
        'code': code,
        'price_text': price_text  # 這裡也要修改鍵名
    }
    response = requests.post(api_url, json=data)
    if response.status_code == 200:
        print('資料傳送成功:', response.json())
    else:
        print(f'資料傳送失敗，狀態碼: {response.status_code}')

# 啟動 Selenium 的 Chrome 瀏覽器
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    while True:  # 無限循環，直到手動停止程式
        for code, url in urls.items():
            driver.get(url)  # 請求每個 URL
            
            # 等待動態內容加載
            price_element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//*[@id="main-0-QuoteHeader-Proxy"]/div/div[2]/div[1]/div/span[1]'))
            )

            if price_element:
                price_text = price_element.text  # 獲取價格文本
                print(f"{code} 價格: {price_text}")
                send_data_to_server(code, price_text)  # 立即傳送資料
            else:
                print(f"{code} 未找到價格資訊")

        # 每分鐘爬取一次
        time.sleep(60)

except Exception as e:
    print(f"查找元素時發生錯誤: {e}")

finally:
    # 關閉瀏覽器
    driver.quit()