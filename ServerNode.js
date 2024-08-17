const express = require('express');
// const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

//設置會話
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

// 設定session中間件
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({
  host: 'localhost',
  user: 'root',
  password: 'sql12345678',
  database: 'ETF'
});

app.use(session({
  name: 'cookiename',
  secret: 'ETF_secret_202407', //自行設定
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {secure: false} // 若在生產環境中，應設置為true
}))
// 引入使用路由
const SecondServer =require('./SecondServer');
app.use('/SecondServer', SecondServer);


const port = 3000; // 你可以選擇任何你想要的端口號

// 使用 express 中間軟體來解析 JSON 請求體
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', //允許前端域名
  credentials: true //允許攜帶cookie
}));
app.use(cookieParser());
app.use(session({
  name: 'cookiename',
  secret: 'ETF_secret_202407', //自行設定
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false} // 若在生產環境中，應設置為true
}));

// 建立 MySQL 連接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sql12345678',
  database: 'ETF'
});

app.set('pool', pool);

// 檢查帳號是否存在
app.post('/checkAccount',(req, res)=>{
  const {account} = req.body;
  const query = 'SELECT COUNT(*) AS count FROM users WHERE account=?';
  pool.query(query, [account], (err, results) => {
    if(err){
      console.error(err);
      res.status(500).json({ message: 'Database query error'});
      return;
    }
    const exists = results[0].count>0;
    res.status(200).json({ exists });
  });
});

// 處理 POST 請求
app.post('/submit', async (req, res) => {
  const { username, account, password } = req.body;

  // 哈希密碼
  try{
    const hashedPassword = await bcrypt.hash(password, 10);
    // 插入資料到 MySQL 資料庫
    const query = 'INSERT INTO users (username, account, password) VALUES (?, ?, ?)';
    pool.query(query, [username, account, hashedPassword], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error inserting data' });
        return;
      }
      res.status(200).json({ message: 'Data inserted successfully', data: results });
    });
  }catch(err){
    console.error(err);
    res.status(500).json({message: 'Error hashing password'});
  }
});


// 檢查帳號與密碼
app.post('/checkAP', (req, res) => {
  const {account, password} = req.body;
  const query ='SELECT username, password FROM users WHERE account=?';
  pool.query(query, [account], (err, results) => {
    if (err){
      console.error(err);
      res.status(500).json({message: 'Database query error'});
      return;
    }
    if (results.length === 0){
      res.status(200).json({exists: false});
    } else {
      const storedPassword = results[0].password;
      bcrypt.compare(password, storedPassword, (err, passwordCorrect) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error comparing passwords' });
          return;
        }
        if (passwordCorrect) {
          // 設置會話
          req.session.user = { 
            username: results[0].username,
            account: account 
          };
          res.status(200).json({ exists: true, passwordCorrect });
        } else {
          res.status(200).json({ exists: true, passwordCorrect: false });
        }
      });
    }
  });
});

//檢查會話
app.get('/session-status', (req,res) => {
  if(req.session.user){
    res.status(200).json({message: 'Session exist', user: req.session.user});
  }else{
    res.status(200).json({message: 'No session found'});
  }
});

//退出會話
app.post('/logout', (req,res) =>{
  req.session.destroy(err =>{
    if(err){
      console.error(err);
      res.status(500).json({message: 'Fail to log out'});
    }else{
      res.status(200).json({message: 'Logged out successfully'});
    }
  });
});

// 買入ETF
app.post('/ERAbuy',(req,res) =>{
  if(!req.session.user){
    return res.status(401).json({message: 'User not logged in'});
  }

  const {date,code, number, price, fee}=req.body;
  const account=req.session.user.account;
  
  const query = 'insert into ERA (account, date, code, number, price, fee) values (?, ?, ?, ?, ?, ?)';
  pool.query(query,[account, date, code, number, price, fee], (err, results) => {
    if(err){
      console.error(err);
      res.status(500).json({message: 'Database insert error'});
      return;
    }
    res.status(200).json({message: 'Data inserted successfully', data: results});
  });
});

// 賣出ETF
app.post('/ERAsale',(req,res)=>{
  if(!req.session.user){
    return res.status(401).json({message: 'User not logged in'});
  }

  const {date, code, number, price, revenue, fee}=req.body;
  const account=req.session.user.account;

  const query='insert into ERAsale (account, date, code, number, price, revenue, fee) values (?, ?, ?, ?, ?, ?, ?)';
  pool.query(query,[account, date, code, number, price, revenue, fee], (err, results)=>{
    if(err){
      console.error(err);
      res.status(500).json({message: 'Database insert error'});
      return;
    }
    res.status(200).json({message: 'Data inserted successfully', data: results});
  });
});

// 顯示購買ETF紀錄
app.get('/getRecords', (req,res)=>{
  const account=req.session.user.account;
  const query=`SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, code, number, price, fee FROM ERA WHERE account=? ORDER BY date ASC`;
  pool.query(query,[account], (err, results)=>{
    if(err){
      console.error(err);
      res.status(500).json({message: 'Database query error'});
      return;
    }
    res.status(200).json({results});
  });
});

// 顯示賣出ETF紀錄
app.get('/getRecordSales', (req,res)=>{
  const account=req.session.user.account;
  const query=`SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, code, number, price, revenue, fee FROM ERAsale WHERE account=? ORDER BY date ASC`;
  pool.query(query,[account], (err, results)=>{
    if(err){
      console.error(err);
      res.status(500).json({message: 'Database query error'});
      return;
    }
    res.status(200).json({results});
  });
});

// 股利清單
app.post('/Dividend', (req,res)=>{
  if(!req.session.user){
    return res.status(401).json({message: 'User not logged in'});
  }
  const {date, code, price}=req.body;
  const account=req.session.user.account;

  const query='insert into Dividend (account,date, code, price) values (?, ?, ?, ?)';
  pool.query(query,[account,date,code,price],(err,results)=>{
    if(err){
      console.error(err);
      res.status(500).json({message: 'Database insert error'});
      return;
    }
    res.status(200).json({message: 'Data deleted successfully', data: results});
  });
});

//顯示股利紀錄
app.get('/getDividends',(req,res)=>{
  const account=req.session.user.account;
  const query=`SELECT DATE_FORMAT(Date, '%Y-%m-%d') as date, code, price From Dividend where account=? order by date asc`;
  pool.query(query,[account], (err,results)=> {
    if(err){
      console.error(err);
      res.status(500).json({message: 'Database query error'});
      return;
    }
    res.status(200).json({results});
  })
})

// 當訪問首頁時，返回"Hello World!"訊息
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 啟動伺服器，並讓它開始監聽指定的端口
app.listen(port, () => {
  console.log(`伺服器正在 http://localhost:${port} 上運行`);
});

// const cors = require('cors');
// app.use(cors());