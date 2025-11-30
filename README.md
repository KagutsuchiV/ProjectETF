# ProjectETF 
**這是一個專為ETF新手設計的記錄與分析專案，使用Vue.js作為前端框架，Node.js和Python作為後端服務，並將數據存儲於MySQL資料庫中。**
**本網站提供以下功能：**
1. 會員制度：用戶可以註冊帳戶，填寫個人檔案並上傳大頭貼，享受專屬的使用體驗。
2. 安全性保障：會員密碼採用哈希加密技術，顯著降低資料外洩的風險，確保用戶資訊安全。
3. ETF紀錄與分析：用戶登錄後，將進入ETF-ERA分頁，方便地記錄ETF交易，並進行簡單的數據分析，例如計算存股百分比 (成本)。
4. 即時更新的ETF資訊：首頁展示的ETF價格、資產規模及成立日等資訊，透過爬蟲技術自動抓取，確保資訊的即時性和準確性。


## 前置準備 (確認程式版本與套件/ SQL設定database與table)
1. vue (若執行異常，可在CMD使用npm install)
版本: @vue/cli 5.0.8
套件: 
+-- @vitejs/plugin-vue@5.0.5
+-- axios@1.7.2
+-- chart.js@4.4.4
+-- echarts@5.5.0
+-- express-mysql-session@3.0.3
+-- multer@1.4.5-lts.1
+-- vite@5.3.1
+-- vue-axios@3.5.2
+-- vue-router@4.0.13
+-- vue@3.4.29
`-- yahoo-finance2@2.11.3

2. node.JS
版本: v20.14.0
全域套件:
+-- @vue/cli@5.0.8
`-- ejs@3.1.10 

專案套件:
+-- axios@1.7.7
+-- bcrypt@5.1.1
+-- body-parser@1.20.2
+-- cookie-parser@1.4.6
+-- cors@2.8.5
+-- express-mysql-session@3.0.3
+-- express-session@1.18.0
+-- express@4.19.2
+-- multer@1.4.5-lts.1
`-- mysql2@3.10.3

3. python
版本: Python 3.12.4
套件:
Package            Version
------------------ -----------
annotated-types    0.7.0
anyio              4.4.0
attrs              24.2.0
beautifulsoup4     4.12.3
certifi            2024.7.4
cffi               1.17.1
charset-normalizer 3.3.2
click              8.1.7
colorama           0.4.6
dnspython          2.6.1
email_validator    2.2.0
fastapi            0.111.0
fastapi-cli        0.0.4
h11                0.14.0
httpcore           1.0.5
httptools          0.6.1
httpx              0.27.0
idna               3.7
Jinja2             3.1.4
markdown-it-py     3.0.0
MarkupSafe         2.1.5
mdurl              0.1.2
orjson             3.10.6
outcome            1.3.0.post0
pip                24.0
pycparser          2.22
pydantic           2.8.2
pydantic_core      2.20.1
Pygments           2.18.0
PySocks            1.7.1
python-dotenv      1.0.1
python-multipart   0.0.9
PyYAML             6.0.1
requests           2.32.3
rich               13.7.1
selenium           4.25.0
shellingham        1.5.4
sniffio            1.3.1
sortedcontainers   2.4.0
soupsieve          2.6
starlette          0.37.2
trio               0.26.2
trio-websocket     0.11.1
typer              0.12.3
typing_extensions  4.12.2
ujson              5.10.0
urllib3            2.2.3
uvicorn            0.30.1
watchfiles         0.22.0
websocket-client   1.8.0
websockets         12.0
wsproto            1.2.0

4. MySQL
版本: version8.3.0
user: root
password: sql12345678

(0) 下載mySQL (若無)
https://dev.mysql.com/downloads/mysql/8.0.html
可參考此網站: https://www.youtube.com/watch?v=3zzszKQ8Kk4

(1) 創建ETF database
(2) 建立以下table
a. 帳戶table (管理會員的帳密)
create table users(
id int primary key  auto_increment,
username varchar(255) not null,
account varchar(255) not null,
password varchar(255) not null
);

b. ETF買入table (管理會員的ETF買入紀錄)
CREATE TABLE ERA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    code VARCHAR(10) NOT NULL,
    number INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    fee DECIMAL(10, 2) NOT NULL,
    INDEX idx_account (account),
    INDEX idx_code (code)
);

c. ETF賣出table (管理會員的ETF賣出紀錄)
CREATE TABLE ERAsale (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    code VARCHAR(10) NOT NULL,
    number INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
	revenue DECIMAL(10, 2) NOT NULL,
    fee DECIMAL(10, 2) NOT NULL,
    INDEX idx_account (account),
    INDEX idx_code (code)
);

d. ETF股利table (管理會員的ETF股利紀錄)
CREATE TABLE Dividend (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    code VARCHAR(10) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    INDEX idx_account (account),
    INDEX idx_code (code)
);

e. ETF價差  (管理會員的ETF的價差)
create table Revenue(
	id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    account VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

(3) 設定時區
SET time_zone = '+08:00';


## 啟動網頁
1. 開啟後端伺服器 node ServerNode.js (site: ETFProject)
2. 開啟python爬蟲-1 python bugtestDyna.py (site: ETFProject)
**確認chromedriver.exe檔的路徑是否為"D:/program 2024/ETFProject/chromedriver-win64/chromedriver.exe"，若非此路徑，請至bugtestDyna.py檔中的第17行進行修改**
3. 開啟python爬蟲-2 python bugtest.py (site: ETFProject)
4. 開啟前端伺服器npm run dev (site: ETFProject/vue-project)
**※ 若畫面排版異常，請使用「crl + 與 crl - 」來調整畫面縮放比例**

**目錄結構** 

可參考TreeStructureOutput.txt (site: ETFProject)

