const express = require('express');
const cors = require('cors'); // 引入 cors
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// 使用 cors 中间件
app.use(cors()); // 默认允许所有来源，或可以配置特定来源

// 设置请求配置
const config = {
    method: 'post',
    url: 'http://iotn.developlink.cloud/prod-api/iot/data/forward',
    headers: {
        'Accept': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyaWQiOjUwNzk4LCJsb2dpbl91c2VyX2tleSI6IjFiMzE4MzE1LTliMjUtNDYzMS1hNWE4LTU2MzA1YzI5Y2E3MiJ9.89MwTcGPch0yg1AsiHSzkODkwDaLLHwe-jdS81IMn1NpwqLVN6HybUchoZjJIK_l0abhLQHxG2fntn1v0Mwe4g",
        'Cookie': 'username=yuxinxuexiao; password=ELNaBB1tWY/sndGe80GotSRGNhAdiwTolXZ+Vmj1thZo69hCO8P8YHjzhipHM47H+aUASAJ7aa8D5rXcuaEWwA==; rememberMe=true; formType=2; usePwd=[object%20Object]; sidebarStatus=0',
        "Content-Type": "application/json;charset=UTF-8",
        "Accept-Encoding": "gzip, deflate",
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    }
};

// 分页 API
app.get('/api/data', async (req, res) => {
    try {
        // 获取分页参数
        const { pageNum = 1, pageSize = 1000 } = req.query; 

        const updatedConfig = {
            ...config,
            data: {
                "method": "get",
                "path": "api/v1/product/device/property/list",
                "params": {
                    "id": 1872,
                    "subId": "",
                    "propertyKey": "liuliang",
                    "interval": "",
                    "dateRange": [],
                    "orderBy": "",
                    "pageNum": parseInt(pageNum), // 当前页数
                    "pageSize": parseInt(pageSize) // 每页的数据量
                }
            }
        };

        const response = await axios(updatedConfig);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
