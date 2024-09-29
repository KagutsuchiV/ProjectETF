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

// 定義爬蟲變數
let sixAsset;
let sixDate;
let sixPrice;



// 第四分流伺服器中的 router
router.post('/uploadData', (req, res) => {
    const { asset_size, found_date, price } = req.body;

    console.log('Received data:', req.body); // 輸出接收到的資料

    if (!asset_size || !found_date || !price) {
        console.log('資料不完整'); // 當資料不完整時輸出
        return res.status(400).json({ message: '資料不完整' });
    }

    // 正常處理資料
    sixAsset=asset_size;
    sixDate=found_date;
    sixPrice=price;
    console.log(`00919資產規模: ${asset_size}, 成立日: ${found_date}, 價格: ${price}`);
    res.json({ message: 'Data received successfully' });
});

// sixETF to vue

router.get('/sixETF', (req, res) => {
    const sixETFData = {
        sixAsset: sixAsset,
        sixDate: sixDate,
        sixPrice: sixPrice
    };
    res.json(sixETFData);
})


module.exports = router;