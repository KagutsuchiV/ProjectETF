const express = require('express');
const router =express.Router();
// const app = express(); 分流伺服器不該再次宣告
const cors = require('cors');
router.use(express.json());
const bcrypt = require('bcrypt');
const multer = require('multer');
// const { json } = require('body-parser');



router.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // 加入 Python 的來源端口
    credentials: true// 允許攜帶 Cookie
}));

// 定義一個測試路由
router.get('/test', (req, res) => {
    res.send('Hello from fourth Server');
});

// 第四分流伺服器中的 router
let sixAsset = [];
let sixDate = [];
let sixStockId = [];

let sixCode = [];
let sixPrice = [];

router.post('/uploadData', (req, res) => {
    const { stock_id, asset_size, found_date} = req.body;

    console.log('Received data:', req.body); // 輸出接收到的資料

    if (!stock_id || !asset_size || !found_date) {
        console.log('資料不完整'); // 當資料不完整時輸出
        return res.status(400).json({ message: '資料不完整' });
    }

    console.log(`Received data: ${JSON.stringify(req.body)}`); // 更改輸出格式
    console.log(`${stock_id} 資產規模: ${asset_size}, 成立日: ${found_date}`); 

    // 清空數據並保持7個條目
    if (sixAsset.size >= 7) {
        sixAsset.shift();
        sixDate.shift(); 
        sixStockId.shift();
    };    

    sixAsset.push(asset_size);
    sixDate.push(found_date);
    sixStockId.push(stock_id);

    // 如果超過7個數據，則刪除最早的數據
    while (sixAsset.size > 7) {
        sixAsset.shift(sixAsset.values().next().value);
        sixDate.shift(sixDate.values().next().value);
        sixStockId.shift(sixStockId.values().next().value);
    };    

    // 正常處理資料
    res.json({ message: 'Data received successfully' });
});


// 動態價格查詢
router.post('/uploadDataPrice', (req,res)=> {
    const { code, price_text }=req.body;

    console.log('Received dataPrice', req.body);

    if (!code || !price_text){
        console.log('Price資料不完整'); // 當資料不完整時輸出
        return res.status(400).json({ message: 'Price資料不完整' });
    }

    console.log(`Received data: ${JSON.stringify(req.body)}`);
    console.log(`${code} 價格: ${price_text}`);

    // 清空數據並保持7個條目
    if (sixPrice.size >= 7) {
        sixPrice.shift(); // 清空所有價格
        sixCode.shift(); // 清空所有代碼
    };

    sixPrice.push(price_text);
    sixCode.push(code);

    // 如果超過7個數據，則刪除最早的數據
    while (sixCode.size > 7) {
        sixCode.shift(sixCode.values().next().value);
        sixPrice.shift(sixPrice.values().next().value);
    };

    // 正常處理資料
    res.json({message: 'Data received successfully'});
});

// sixETF to vue

router.get('/sixETF', (req, res) => {
    const sixETFData = {
        sixAsset: sixAsset,
        sixDate: sixDate,
        sixStockId: sixStockId
    };
    res.json(sixETFData);
})

router.get('/sixETFPrice', (req,res) =>{
    const sixETFDataPrice = {
        sixPrice:sixPrice,
        sixCode: sixCode
    };
    res.json(sixETFDataPrice);
})


module.exports = router;