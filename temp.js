const fs = require('fs');
const path = require('path');

const newBiht = "calculated_biht_666888"; 
const configPath = path.join(process.cwd(), 'config.json');
if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    config.biht = newBiht; 
    config.last_updated = new Date().toISOString(); 
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    console.log("成功写入本地 config.json！");
} else {
    console.error("未找到 config.json 文件");
}
