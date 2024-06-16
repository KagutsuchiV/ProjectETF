const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000; // 你可以選擇任何你想要的端口號

// 使用 body-parser 中間軟體來解析 JSON 請求體
app.use(bodyParser.json());

// 建立 MySQL 連接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sql12345678',
  database: 'ETF'
});

// 處理 POST 請求
app.post('/submit', (req, res) => {
  const { username, email } = req.body;

  // 插入資料到 MySQL 資料庫
  const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
  pool.query(query, [username, email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error inserting data' });
      return;
    }
    res.status(200).json({ message: 'Data inserted successfully', data: results });
  });
});

// 當訪問首頁時，返回"Hello World!"訊息
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 啟動伺服器，並讓它開始監聽指定的端口
app.listen(port, () => {
  console.log(`伺服器正在 http://localhost:${port} 上運行`);
});

const cors = require('cors');
app.use(cors());