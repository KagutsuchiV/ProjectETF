const express = require('express');
const router =express.Router();
// const app = express(); 分流伺服器不該再次宣告
const cors = require('cors');
router.use(express.json());
// const { json } = require('body-parser');

// 提取資料庫查詢的函數
const queryDatabase = (req, res, query, params) => {
    const pool = req.app.get('pool');

    pool.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Database query error', error: err.message });
            return;
        }
        console.log(results);
        res.status(200).json({ results });
    });
};


// 提取資料庫查詢的函數-2
const queryDatabaseB = (req, res, query, params) => {
    const pool = req.app.get('pool');

    pool.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Database query error', error: err.message });
            return;
        }
        res.status(200).json({ message: 'Operation successful', data: results });
        console.log(results);
    });
};


router.use(cors({
    origin: 'http://localhost:5173', // 明確指定前端應用程式的來源
    credentials: true// 允許攜帶 Cookie
}));

// 定義一個測試路由
router.get('/test', (req, res) => {
    res.send('Hello from Second Server');
});

// 分析ETF百分比
router.get('/getPercentage', (req,res)=>{
    if (!req.session || !req.session.user || !req.session.user.account) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    const account=req.session.user.account;
    const query=
    `WITH total_buy AS (
    SELECT 
        code,
        SUM(price * number + fee) AS total_buy_price  -- 計算總買入價（含手續費）
    FROM 
        ERA
    WHERE 
        account = ?
    GROUP BY 
        code
),
total_sell AS (
    SELECT 
        code,
        SUM(price * number - fee) AS total_sell_price  -- 計算總賣出價（扣除手續費）
    FROM 
        ERAsale
    WHERE 
        account = ?
    GROUP BY 
        code
),
net_cost AS (
    SELECT 
        b.code,
        GREATEST(b.total_buy_price - COALESCE(s.total_sell_price, 0), 0) AS total_price  -- 計算淨成本，不為負
    FROM 
        total_buy b
    LEFT JOIN 
        total_sell s ON b.code = s.code
),
account_total AS (
    SELECT 
        SUM(total_price) AS account_total_price
    FROM 
        net_cost
)

SELECT 
    tp.code,
    tp.total_price,
    (tp.total_price / at.account_total_price) * 100 AS price_percentage
FROM 
    net_cost tp,
    account_total at;
`;

    queryDatabase(req,res,query, [account, account]);
});


// 接收收益表單
router.post("/revenue",(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({message: 'User not logged in'});
    }

    const {date, price}=req.body;
    const account=req.session.user.account;

    // 將接收到的日期轉換為本地時間
    const adjustedDate = new Date(date);
    adjustedDate.setMinutes(adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset());
    const formattedDate = adjustedDate.toISOString().split('T')[0];    

    const query='insert into Revenue (date, account, price) values (?, ?, ?)';
   
    queryDatabaseB(req,res,query,[formattedDate,account,price]);
});

// 記錄總收益
router.get('/getRevenue',(req,res)=>{
    const account=req.session.user.account;

const today = new Date();

// 轉換為台灣時間 (UTC+8)
const options = { timeZone: 'Asia/Taipei' };
const localTime = new Date(today.toLocaleString('en-US', options));

// 格式化日期為 YYYY-MM-DD
const yyyy = localTime.getFullYear();
const mm = String(localTime.getMonth() + 1).padStart(2, '0'); // 月份是從 0 開始計算的，所以要加 1
const dd = String(localTime.getDate()).padStart(2, '0');
const formattedDate = `${yyyy}-${mm}-${dd}`;

console.log("time: " + formattedDate);


    const query=
    `SELECT
     CONVERT_TZ(
        (SELECT date FROM revenue WHERE account = ? AND date = ? ORDER BY date DESC LIMIT 1),
        '+00:00',  -- 假設日期儲存在 UTC 時區
        '+08:00'   -- 轉換到台灣時間 (UTC+8)
    ) AS Selected_date,
        total_sum,
        total_sum / COALESCE(allcost, 1) AS ratio
    FROM (
        SELECT 
        COALESCE((SELECT SUM(price) FROM dividend WHERE account = ?), 0) +
        COALESCE((SELECT SUM(revenue) FROM ERAsale WHERE account = ?), 0) +
        COALESCE((SELECT price FROM revenue WHERE account = ? AND date = ? ORDER BY id DESC LIMIT 1), 0) AS total_sum,
        (SELECT SUM(price) FROM ERA WHERE account = ?) AS allcost
    ) AS subquery;`;

    const values=[account, formattedDate, account, account, account, formattedDate, account];
    queryDatabaseB(req,res,query,values);
});

module.exports=router;