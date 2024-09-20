const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// 设置静态文件目录
app.use(express.static(path.join(__dirname)));

// 创建根路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在运行：http://localhost:${PORT}`);
});
