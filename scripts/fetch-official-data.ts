#!/usr/bin/env tsx
/**
 * 北京公交站点数据获取脚本
 * 数据源: 北京市公共数据开放平台
 * 数据量: 76,283条记录
 * 接口文档: https://data.beijing.gov.cn/cms/web/bjdata/api/dataDoc.jsp?contentID=17453
 */

import fs from 'fs';
import path from 'path';

const BEIJING_DATA_ID = 'a12812ba8132448184fc5c2599bc3b7d35261';
const API_URL = 'https://data.beijing.gov.cn/cms/web/bjdata/api/userApply.jsp';

interface BeijingBusStation {
  线路名称: string;
  方向: string;
  站点序号: number;
  站点名称: string;
}

interface BusLine {
  name: string;
  city: string;
  stations: {
    up: string[];
    down: string[];
  };
  source: string;
  lastUpdate: string;
  quality: string;
}

async function fetchBeijingBusData() {
  console.log('=====================================');
  console.log('北京公交站点数据获取脚本');
  console.log('=====================================\n');

  // 检查环境变量
  const userKey = process.env.BEIJING_DATA_KEY;
  if (!userKey) {
    console.error('❌ 错误: 未配置 BEIJING_DATA_KEY');
    console.log('\n请按以下步骤操作:');
    console.log('1. 访问 https://data.beijing.gov.cn');
    console.log('2. 注册账号并登录');
    console.log('3. 用户中心 → 获取唯一标识码');
    console.log('4. 在 .env.local 中添加: BEIJING_DATA_KEY=你的标识码\n');
    process.exit(1);
  }

  console.log('📥 正在下载北京公交站点数据...');
  console.log(`   API: ${API_URL}?id=${BEIJING_DATA_ID}&key=***\n`);

  try {
    // 调用API获取数据
    const response = await fetch(
      `${API_URL}?id=${BEIJING_DATA_ID}&key=${userKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: BeijingBusStation[] = await response.json();

    console.log(`✅ 成功获取 ${data.length} 条记录\n`);

    if (data.length === 0) {
      console.error('❌ 错误: API返回空数据');
      console.log('可能原因:');
      console.log('1. 用户标识码错误');
      console.log('2. 数据ID已失效');
      console.log('3. 需要在数据平台申请数据访问权限\n');
      process.exit(1);
    }

    // 展示数据样例
    console.log('📋 数据样例（前5条）:');
    data.slice(0, 5).forEach((item, idx) => {
      console.log(`   ${idx + 1}. ${item['线路名称']} - ${item['方向']} - 第${item['站点序号']}站 - ${item['站点名称']}`);
    });
    console.log();

    // 按线路分组
    console.log('📊 正在按线路分组...');
    const lineMap = new Map<string, BeijingBusStation[]>();

    data.forEach((item) => {
      const lineName = item['线路名称'];
      if (!lineMap.has(lineName)) {
        lineMap.set(lineName, []);
      }
      lineMap.get(lineName)!.push(item);
    });

    console.log(`   ✅ 找到 ${lineMap.size} 条线路\n`);

    // 转换为我们的数据格式
    console.log('🔄 正在转换数据格式...');
    const lines: BusLine[] = Array.from(lineMap.entries()).map(([name, stations]) => ({
      name,
      city: '北京',
      stations: {
        up: stations
          .filter((s) => s['方向'] === '上行')
          .sort((a, b) => a['站点序号'] - b['站点序号'])
          .map((s) => s['站点名称']),
        down: stations
          .filter((s) => s['方向'] === '下行')
          .sort((a, b) => a['站点序号'] - b['站点序号'])
          .map((s) => s['站点名称']),
      },
      source: 'official',
      lastUpdate: new Date().toISOString(),
      quality: 'trusted',
    }));

    // 统计信息
    const stats = {
      totalLines: lines.length,
      totalStations: data.length,
      linesWithBothDirections: lines.filter(
        (l) => l.stations.up.length > 0 && l.stations.down.length > 0
      ).length,
      avgStationsPerLine: Math.round(data.length / lines.length),
    };

    console.log('\n📈 数据统计:');
    console.log(`   总线路数: ${stats.totalLines}`);
    console.log(`   总站点数: ${stats.totalStations}`);
    console.log(`   双向线路: ${stats.linesWithBothDirections} (${Math.round((stats.linesWithBothDirections / stats.totalLines) * 100)}%)`);
    console.log(`   平均每线站点: ${stats.avgStationsPerLine}\n`);

    // 创建输出目录
    const outputDir = path.join(process.cwd(), 'src/lib/bus-data-official/beijing');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入文件
    console.log('💾 正在保存数据...');

    // 1. 原始站点数据
    const stationsPath = path.join(outputDir, 'stations.json');
    fs.writeFileSync(stationsPath, JSON.stringify(data, null, 2));
    console.log(`   ✅ 已保存原始数据: ${stationsPath}`);

    // 2. 线路汇总数据
    const linesPath = path.join(outputDir, 'lines.json');
    fs.writeFileSync(linesPath, JSON.stringify(lines, null, 2));
    console.log(`   ✅ 已保存线路数据: ${linesPath}`);

    // 3. 元数据
    const metadata = {
      city: '北京',
      source: '北京市公共数据开放平台',
      sourceUrl: 'https://data.beijing.gov.cn',
      lastUpdate: new Date().toISOString(),
      totalLines: stats.totalLines,
      totalStations: stats.totalStations,
      quality: 'trusted',
      format: 'JSON',
      fields: ['线路名称', '方向', '站点序号', '站点名称'],
    };
    const metadataPath = path.join(outputDir, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`   ✅ 已保存元数据: ${metadataPath}\n`);

    console.log('=====================================');
    console.log('✅ 数据获取完成!');
    console.log('=====================================\n');
    console.log('下一步操作:');
    console.log('1. 查看数据: cat src/lib/bus-data-official/beijing/lines.json');
    console.log('2. 更新前端展示: 导入真实数据到 LineMarquee 组件');
    console.log('3. 获取其他城市数据: 运行 batch-fetch-official.ts\n');

    // 展示线路样例
    console.log('📋 线路样例（前10条）:');
    lines.slice(0, 10).forEach((line, idx) => {
      console.log(
        `   ${idx + 1}. ${line.name} - ${line.stations.up.length}站(上行) / ${line.stations.down.length}站(下行)`
      );
    });

  } catch (error) {
    console.error('\n❌ 获取数据失败:', error);
    console.log('\n可能的原因:');
    console.log('1. 网络连接失败');
    console.log('2. 用户标识码无效');
    console.log('3. API接口变更\n');
    console.log('请检查后重试。\n');
    process.exit(1);
  }
}

// 执行
fetchBeijingBusData();