#!/usr/bin/env node
/**
 * 解析city-vein差分坐标数据，转换为可用的公交线路数据
 * city-vein数据格式：[[start_time, end_time, x0, y0, dx1, dy1, dx2, dy2, ...], ...]
 * 坐标为差分编码，需累加还原
 */

const fs = require('fs');
const path = require('path');

const CITY_MAP = {
  tianjin: '天津',
  shanghai: '上海',
  guangzhou: '广州',
  shenzhen: '深圳',
  hangzhou: '杭州',
  nanjing: '南京',
  wuhan: '武汉',
  chengdu: '成都',
  xian: '西安',
  chongqing: '重庆',
  suzhou: '苏州',
  changsha: '长沙',
  zhengzhou: '郑州',
  jinan: '济南',
  qingdao: '青岛',
};

const inputDir = path.join(__dirname, '..', 'src', 'lib', 'bus-data-cityvein');
const outputDir = path.join(__dirname, '..', 'public', 'bus-data-cityvein');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const stats = {};

for (const [cityEn, cityZh] of Object.entries(CITY_MAP)) {
  const inputFile = path.join(inputDir, `${cityEn}.data`);

  if (!fs.existsSync(inputFile)) {
    console.log(`⚠️ ${cityZh}(${cityEn}): 文件不存在`);
    continue;
  }

  try {
    const raw = fs.readFileSync(inputFile, 'utf-8');
    // city-vein数据是Python风格的数组字符串，需要处理
    // 格式: [[500, 2300, 117.1732, 39.162, 0.0003, 0.0, ...], [...], ...]
    const cleaned = raw.replace(/'/g, '"').replace(/None/g, 'null').replace(/True/g, 'true').replace(/False/g, 'false');
    let lines;
    try {
      lines = JSON.parse(cleaned);
    } catch {
      // 尝试eval方式（city-vein数据是Python str格式）
      lines = eval(cleaned);
    }

    const processedLines = [];
    let totalPoints = 0;

    for (let idx = 0; idx < lines.length; idx++) {
      const line = lines[idx];
      if (!Array.isArray(line) || line.length < 4) continue;

      const startTime = line[0];
      const endTime = line[1];
      const x0 = line[2];
      const y0 = line[3];

      // 还原差分坐标
      const coordinates = [[x0, y0]];
      let currentX = x0;
      let currentY = y0;

      for (let i = 4; i < line.length - 1; i += 2) {
        currentX += line[i];
        currentY += line[i + 1];
        coordinates.push([currentX, currentY]);
      }

      totalPoints += coordinates.length;

      // 格式化首末班时间
      const formatTime = (t) => {
        if (!t || t === 0) return null;
        const s = String(t);
        if (s.length === 4) return `${s.slice(0, 2)}:${s.slice(2)}`;
        if (s.length === 3) return `0${s.slice(0, 1)}:${s.slice(1)}`;
        return null;
      };

      processedLines.push({
        id: `${cityEn}-${idx}`,
        name: `${cityZh}公交${idx + 1}路`, // 临时名称，待8684.cn补全
        city: cityZh,
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
        coordinates,
        pointCount: coordinates.length,
        source: 'city-vein',
      });
    }

    const output = {
      city: cityZh,
      cityEn,
      totalLines: processedLines.length,
      totalPoints,
      source: 'city-vein (GitHub antct/city-vein)',
      sourceUrl: 'https://github.com/antct/city-vein',
      lastUpdate: new Date().toISOString(),
      lines: processedLines,
    };

    const outputFile = path.join(outputDir, `${cityEn}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(output));

    stats[cityZh] = {
      lines: processedLines.length,
      points: totalPoints,
      size: (fs.statSync(outputFile).size / 1024 / 1024).toFixed(2) + 'MB',
    };

    console.log(`✅ ${cityZh}(${cityEn}): ${processedLines.length}条线路, ${totalPoints}个坐标点`);
  } catch (err) {
    console.log(`❌ ${cityZh}(${cityEn}): 解析失败 - ${err.message}`);
  }
}

// 保存汇总统计
const summaryFile = path.join(outputDir, 'summary.json');
fs.writeFileSync(summaryFile, JSON.stringify({
  totalCities: Object.keys(stats).length,
  totalLines: Object.values(stats).reduce((s, c) => s + c.lines, 0),
  totalPoints: Object.values(stats).reduce((s, c) => s + c.points, 0),
  cities: stats,
  lastUpdate: new Date().toISOString(),
}, null, 2));

console.log('\n=== 汇总 ===');
console.log(`总城市数: ${Object.keys(stats).length}`);
console.log(`总线路数: ${Object.values(stats).reduce((s, c) => s + c.lines, 0)}`);
console.log(`总坐标点: ${Object.values(stats).reduce((s, c) => s + c.points, 0)}`);
console.log(`\n汇总文件: ${summaryFile}`);
