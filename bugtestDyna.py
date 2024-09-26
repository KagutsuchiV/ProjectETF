from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

# 設定 Chrome 瀏覽器的選項
chrome_options = Options()
chrome_options.add_argument("--headless")  # 啟用無頭模式（不顯示瀏覽器界面）
chrome_options.add_argument("--disable-gpu")  # 禁用 GPU 渲染，加快執行速度
chrome_options.add_argument("--no-sandbox")

# 這裡要設定 chromedriver 的路徑
chrome_driver_path = "D:/program 2024/ETFProject/chromedriver-win64/chromedriver.exe"  # 替換為 chromedriver 的實際路徑

service = Service(chrome_driver_path)

# 啟動 Selenium 的 Chrome 瀏覽器
driver = webdriver.Chrome(service=service, options=chrome_options)

# 請求網頁
url = 'https://tw.stock.yahoo.com/quote/00919.TW/profile'
driver.get(url)

# 等待動態內容加載
time.sleep(5)  # 等待幾秒讓頁面完全載入，你可以用更高級的等待方式，如 WebDriverWait

# 使用 Selenium 查找元素
try:
    # 透過 class 屬性查找目標元素
    price_element = driver.find_element(By.CSS_SELECTOR, "span.Fz\\(32px\\).Fw\\(b\\).Lh\\(1\\).Mend\\(16px\\).D\\(f\\).Ai\\(c\\).C\\(\\$c-trend-up\\)")

    if price_element:
        print(f"價格: {price_element.text}")
    else:
        print("未找到價格資訊")

finally:
    # 關閉瀏覽器
    driver.quit()
