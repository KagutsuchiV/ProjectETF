const express = require('express');
const router =express.Router();
// const app = express(); 分流伺服器不該再次宣告
const cors = require('cors');
router.use(express.json());
const bcrypt = require('bcrypt');
// const { json } = require('body-parser');

router.use(cors({
    origin: 'http://localhost:5173', // 明確指定前端應用程式的來源
    credentials: true// 允許攜帶 Cookie
}));

// 定義一個測試路由
router.get('/test', (req, res) => {
    res.send('Hello from Third Server');
});

// 接收更改密碼表單

module.exports = (pool) => {
    router.use(express.json());
    router.post("/changepassword", (req, res) => {
        if (!req.session.user) {
            return res.status(401).json({ message: "User not logged in" });
        }

        const { password, newpassword } = req.body;
        const account = req.session.user.account;

        const query = `SELECT password FROM users WHERE account = ?`;
        pool.query(query, [account], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error' });
                return;
            }
            const passwordDatabase = results[0].password;
            
            bcrypt.compare(password, passwordDatabase, (err, isMatch) => {
                if (!isMatch) {
                    res.status(401).json({ message: '原密碼輸入錯誤，請重新輸入' });
                    return;
                } else {
                    // 在這裡可以更新新密碼
                    const hashedPassword = bcrypt.hashSync(newpassword, 10);
                    const updateQuery = `UPDATE users SET password = ? WHERE account = ?`;
                    pool.query(updateQuery, [hashedPassword, account], (err, results) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ message: 'Error updating password' });
                            return;
                        }
                        
                        // 成功後銷毀 session 並回傳狀態
                        req.session.destroy((err) => {
                            if (err) {
                                return res.status(500).json({ message: 'Error logging out' });
                            }
                            res.clearCookie('connect.sid');  // 清除 session cookie
                            res.status(200).json({ message: 'Password updated successfully. You have been logged out.' });
                        }); 
                    });
                }
            });
        });
    });

    return router;
};
