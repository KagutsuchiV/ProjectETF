const express = require('express');
const router =express.Router();
// const app = express(); 分流伺服器不該再次宣告
const cors = require('cors');
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
    `WITH total_prices AS (
        SELECT 
            code,
            SUM(price * number + fee) AS total_price
        FROM 
            ERA
        WHERE 
            account = ?
        GROUP BY 
            code
    ),
    account_total AS (
        SELECT 
            SUM(total_price) AS account_total_price
        FROM 
            total_prices
    )
        SELECT 
            tp.code,
            tp.total_price,
            (tp.total_price / at.account_total_price) * 100 AS price_percentage
        FROM 
            total_prices tp
    CROSS JOIN 
        account_total at;`;

    // 使用主伺服器的pool
    const pool =req.app.get('pool');

    pool.query(query,[account], (err,results)=>{
        if(err){
            console.error(err);
            res.status(500).json({message: 'Database query error'});
            return;
        }
        res.status(200).json({results});
    });
});


module.exports=router;