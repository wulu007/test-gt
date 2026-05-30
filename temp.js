const fs = require('fs');
const path = require('path');

// 1. 这里是你原本的“正则提取+DJB2哈希计算”逻辑
// ...... 假设最后算出了结果
const newBiht = "calculated_biht_666888"; 

// 2. 定位项目里的配置文件路径
const configPath = path.join(process.cwd(), 'config.json');

// 3. 初始化配置对象
let config = {};

// 4. 判断文件是否存在
if (fs.existsSync(configPath)) {
    try {
        // 如果存在，读取原有内容，防止覆盖掉配置里的其他重要字段
        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        console.log("成功读取已有的 config.json");
    } catch (e) {
        // 如果文件存在但格式损坏（空文件或非法JSON），容错处理，重置为空对象
        console.warn("读取或解析已有 config.json 失败，将重新创建：", e.message);
        config = {};
    }
} else {
    console.log("未找到 config.json，正在自动创建新文件...");
}

// 5. 统一更新或写入 biht 字段及时间戳
config.biht = newBiht; 
config.last_updated = new Date().toISOString(); 

// 6. 写回（或创建）文件
fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
console.log("成功写入/创建本地 config.json！");
