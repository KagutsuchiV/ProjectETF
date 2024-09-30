import requests
from bs4 import BeautifulSoup
import random
import time

urls={
    '0050': 'https://tw.stock.yahoo.com/quote/0050.TW/profile',
    '00878': 'https://tw.stock.yahoo.com/quote/00878.TW/profile',
    '0056': 'https://tw.stock.yahoo.com/quote/0056.TW/profile',
    '00679B': 'https://tw.stock.yahoo.com/quote/00679B.TW/profile',        
    '00929': 'https://tw.stock.yahoo.com/quote/00929.TW/profile',
    '00919': 'https://tw.stock.yahoo.com/quote/00919.TW/profile',
    '00915': 'https://tw.stock.yahoo.com/quote/00915.TW/profile'
}

api_url = 'http://localhost:3000/FourthServer/uploadData'

user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Safari/605.1.15',
    # 添加更多的 User-Agent
]

def fetch_asset_size(urls):
    headers = {'User-Agent': random.choice(user_agents)}
    asset_sizes = {}

    for code, url in urls.items():
        for _ in range(3):  # 重試三次
            response = requests.get(url, headers=headers)

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                # 使用 :-soup-contains 來代替 :contains
                asset_size_label = soup.select_one("span:-soup-contains('資產規模（百萬）')")

                if asset_size_label:
                    asset_size_value = asset_size_label.find_parent('div').find('div', class_='etf-total-asset')

                    if asset_size_value:
                        asset_sizes[code] = asset_size_value.text.strip()
                        break # 成功跳出循環                       
            time.sleep(2)  # 等待 2 秒再重試

    return asset_sizes

# def fetch_all_name():
#     headers = {'User-Agent': random.choice(user_agents)}

#     for _ in range(3):  # 重試三次
#         response = requests.get(url, headers=headers)

#         if response.status_code == 200:
#             soup = BeautifulSoup(response.text, 'html.parser')
#             # 使用 :-soup-contains 來代替 :contains
#             all_name_label = soup.select_one("span:-soup-contains('全名')")

#             if all_name_label:
#                 all_name_value = all_name_label.find_parent('div').find('div', class_='etf-full-name')

#                 if all_name_value:
#                     return all_name_value.text.strip()
#         time.sleep(2)  # 等待 2 秒再重試

#     return None

def fetch_found_date(urls):
    headers = {'User-Agent': random.choice(user_agents)}
    found_dates = {}

    for code, url in urls.items():
        for _ in range(3):  # 重試三次
            response = requests.get(url, headers=headers)

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                # 使用 :-soup-contains 來代替 :contains
                found_date_label = soup.select_one("span:-soup-contains('成立日')")

                if found_date_label:
                    found_date_value = found_date_label.find_parent('div').find('div', class_='etf-inception-date')

                    if found_date_value:
                        found_dates[code] = found_date_value.text.strip()
                        break # 成功跳出循環 
            time.sleep(2)  # 等待 2 秒再重試

    return found_dates

# def fetch_price():
#     headers = {'User-Agent': random.choice(user_agents)}

#     for _ in range(3):  # 重試三次
#         response = requests.get(url, headers=headers)

#         if response.status_code == 200:
#             soup = BeautifulSoup(response.text, 'html.parser')
            
#             # 使用 class 來查找數值 23.95 的元素
#             price_span = soup.find('span', class_="Fz(32px) Fw(b) Lh(1) Mend(16px) D(f) Ai(c)")
            
#             if price_span:
#                 return price_span.text.strip()  # 返回數值
            
#         time.sleep(2)  # 等待 2 秒再重試

#     return None

def send_data_to_server(stock_id,asset_size, found_date):
    data = {
        'stock_id': stock_id,
        'asset_size':asset_size,
        'found_date': found_date,
    }
    response = requests.post(api_url, json=data)
    if response.status_code == 200:
        print(f'資料傳送成功: {stock_id}', response.json())
    else:
        print(f'資料傳送失敗 {stock_id}，狀態碼: {response.status_code}')

asset_sizes = fetch_asset_size(urls)

if asset_sizes:
    for stock_id, asset_size in asset_sizes.items():
        if asset_size:
            print(f"{stock_id} 資產規模（百萬）: {asset_size}")
        else:
            print(f"{stock_id} 未找到資產規模（百萬）的資訊")
else:
    print("未找到任何資產規模（百萬）的資訊")


# all_name = fetch_all_name()
# if all_name:
#     print(f"全名: {all_name}")
# else:
#     print("未找到全名的資訊")

found_dates = fetch_found_date(urls)
for stock_id, found_date in found_dates.items():
    if found_dates:
        print(f"{stock_id} 成立日: {found_dates}")
    else:
        print(f"{stock_id} 未找到成立日的資訊")

# price = fetch_price()
# if price:
#     print(f"價格: {price}")
# else:
#     print("未找到價格資訊")



# 確認所有資料都已獲取，然後傳送資料
if asset_sizes and found_dates:
    for stock_id in asset_sizes:
        asset_size = asset_sizes.get(stock_id)
        found_date = found_dates.get(stock_id)

        if asset_size and found_date:
            send_data_to_server(stock_id, asset_size, found_date)
        else:
            print(f"股票 {stock_id} 的資料不完整")
else:
    print("未獲取到所有必要的數據")




# 重複抓取資料
if __name__ == '__main__':
    while True:  # 無窮迴圈
        print("正在爬取資料...")

        # 爬取資產規模
        asset_sizes = fetch_asset_size(urls)
        if asset_sizes:
            print(f"資產規模: {asset_sizes}")
        else:
            print("未找到資產規模的資訊")

        # 爬取成立日
        found_dates = fetch_found_date(urls)
        if found_dates:
            print(f"成立日: {found_dates}")
        else:
            print("未找到成立日的資訊")

        # 爬取價格
        # price = fetch_price()
        # if price:
        #     print(f"價格: {price}")
        # else:
        #     print("未找到價格資訊")

        # 資料按照字典的形式傳送給伺服器
        for stock_id in asset_sizes:
            asset_size = asset_sizes.get(stock_id)
            found_date = found_dates.get(stock_id)

            if asset_size and found_date:
                send_data_to_server(stock_id, asset_size, found_date)
            else:
                print(f"股票 {stock_id} 的資料不完整")

        print("等待 120 秒後再次爬取資料...\n")
        time.sleep(120)  # 暫停 120 秒