const express = require('express');
const router =express.Router();
// const app = express(); 分流伺服器不該再次宣告
const cors = require('cors');
router.use(express.json());
const bcrypt = require('bcrypt');
const multer = require('multer');
// const { json } = require('body-parser');

const path = require('path'); // 引入 path 模組
const fs = require('fs'); // 引入檔案模組

// 設定靜態檔案路徑
const avatarDir = path.join(__dirname, 'uploads');
router.use('/uploads', express.static(avatarDir));

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



// 上傳大頭貼

// 設定multer儲存上傳檔案
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'vue-project/uploads'); //儲存大頭貼之資料夾
    },
    filename: (req, file, cb)=>{
        const account =req.session.user.account;
        const ext =path.extname(file.originalname); //取得檔案副檔名
        cb(null, `${account}${ext}`); //檔名預設帳號+副檔名
    }
});

// 設定上傳中介軟體
const upload = multer({storage: storage});

module.exports = (pool)=>{
    router.post('/uploadAvatar', upload.single('avatar'), (req,res)=>{
        if(!req.session.user){
            return res.status(401).json({message: "User not logged in"});
        }

        //上傳成功可做其他處理
        res.status(200).json({message: "Avatar upload successfully"});
    });

    return router;
}


// 提供大頭貼路由
router.get('/getAvatar', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "User not logged in" });
    }

    const account = req.session.user.account;
    const avatarDir = path.join(__dirname, 'vue-project/uploads');
    const defaultAvatar = 'user.png'; // 預設大頭貼名稱，不需要 '/uploads'

    // 支援圖片格式
    const extensions = ['.png', '.jpeg', '.jpg'];

    // 檢查是否上傳大頭貼
    let avatarUrl = defaultAvatar;
    for (const ext of extensions) {
        const avatarPath = path.join(avatarDir, `${account}${ext}`);
        if (fs.existsSync(avatarPath)) {
            avatarUrl = `${account}${ext}`; // 找到大頭貼，設置Url，不加 '/uploads'
            break;
        }
    }

    res.status(200).json({ avatarUrl });
});
