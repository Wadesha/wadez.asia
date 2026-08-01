/**
 * 数据导出工具 (v2.1.13)
 * 支持 CSV / GeoJSON / PNG 导出
 */

// 简化的 GeoJSON 类型（避免依赖 @types/geojson）
interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
  properties: Record<string, any> | null;
}

interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

/**
 * 导出 CSV 文件
 */
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: { key: keyof T; label: string }[]
): void {
  if (data.length === 0) {
    alert("无数据可导出");
    return;
  }

  const cols = headers || Object.keys(data[0]).map((k) => ({ key: k as keyof T, label: k }));
  const headerRow = cols.map((c) => `"${c.label}"`).join(",");
  const rows = data.map((item) =>
    cols.map((c) => {
      const val = item[c.key];
      const str = val === null || val === undefined ? "" : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    }).join(",")
  );

  const csv = "\uFEFF" + [headerRow, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `${filename}.csv`);
}

/**
 * 导出 GeoJSON 文件
 */
export function exportToGeoJSON(
  features: GeoJSONFeature[],
  filename: string
): void {
  const geojson: GeoJSONFeatureCollection = {
    type: "FeatureCollection",
    features,
  };
  const json = JSON.stringify(geojson, null, 2);
  const blob = new Blob([json], { type: "application/geo+json;charset=utf-8;" });
  downloadBlob(blob, `${filename}.geojson`);
}

/**
 * 将点数据数组转换为 GeoJSON Feature 数组
 */
export function pointsToGeoJSONFeatures<T extends { lng: number; lat: number; id?: string }>(
  data: T[],
  propertyMapper?: (item: T) => Record<string, any>
): GeoJSONFeature[] {
  return data.map((item) => ({
    type: "Feature" as const,
    geometry: {
      type: "Point" as const,
      coordinates: [item.lng, item.lat],
    },
    properties: {
      id: item.id,
      ...((propertyMapper ? propertyMapper(item) : {}) as any),
    },
  }));
}

/**
 * 导出地图截图 PNG
 * @param mapContainer 地图容器元素
 * @param filename 文件名
 */
export async function exportMapToPNG(
  mapContainer: HTMLElement,
  filename: string
): Promise<void> {
  // 使用 html2canvas 或简单的 canvas 截图
  // 由于高德地图使用 canvas 渲染，直接截图 canvas
  const canvas = mapContainer.querySelector("canvas");
  if (!canvas) {
    alert("无法获取地图画布");
    return;
  }

  try {
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if (blob) {
      downloadBlob(blob, `${filename}.png`);
    } else {
      alert("截图生成失败");
    }
  } catch {
    alert("截图导出失败");
  }
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * 将 SVG 元素导出为 PNG
 * 适用于 SchematicMap / ChoroplethMap / BubbleMap / FlowMap 等基于 SVG 的地图
 */
export async function exportSvgToPNG(svgEl: SVGSVGElement, filename: string, scale: number = 2): Promise<void> {
  try {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgEl);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.crossOrigin = "anonymous";

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("SVG加载失败"));
      img.src = svgUrl;
    });

    const width = svgEl.viewBox.baseVal.width || svgEl.clientWidth || 800;
    const height = svgEl.viewBox.baseVal.height || svgEl.clientHeight || 600;

    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      URL.revokeObjectURL(svgUrl);
      alert("无法创建Canvas");
      return;
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(svgUrl);

    canvas.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, `${filename}.png`);
      } else {
        alert("PNG生成失败");
      }
    }, "image/png");
  } catch (err) {
    alert("SVG截图导出失败: " + (err as Error).message);
  }
}

/**
 * 查找最近的 SVG 元素（从触发元素向上查找）
 */
export function findClosestSvg(el: HTMLElement | null): SVGSVGElement | null {
  let current = el;
  while (current && current.tagName !== "SVG") {
    current = current.parentElement;
  }
  return current as SVGSVGElement | null;
}

/**
 * 生成区域分析报告（Markdown 格式）
 */
export function generateRegionReport(options: {
  title: string;
  totalLabel: string;
  totalValue: string;
  unit: string;
  ranking: Array<{ name: string; value: number }>;
  insights?: string[];
}): string {
  const { title, totalLabel, totalValue, unit, ranking, insights = [] } = options;
  const top5 = ranking.slice(0, 5);
  const bottom5 = ranking.slice(-5).reverse();
  const maxValue = ranking[0]?.value || 0;
  const minValue = ranking[ranking.length - 1]?.value || 0;
  const avgValue = ranking.length > 0 ? ranking.reduce((s, r) => s + r.value, 0) / ranking.length : 0;

  const lines: string[] = [];
  lines.push(`# ${title}`);
  lines.push("");
  lines.push(`> 本报告由 Wadez.asia 全国地图自动生成 | 数据性质：示例数据`);
  lines.push("");
  lines.push(`## 一、总体概况`);
  lines.push("");
  lines.push(`- **${totalLabel}**：${totalValue}`);
  lines.push(`- **最高值**：${top5[0]?.name || "-"} ${maxValue.toFixed(2)}${unit}`);
  lines.push(`- **最低值**：${bottom5[0]?.name || "-"} ${minValue.toFixed(2)}${unit}`);
  lines.push(`- **平均值**：${avgValue.toFixed(2)}${unit}`);
  lines.push(`- **极差**：${(maxValue - minValue).toFixed(2)}${unit}`);
  lines.push(`- **变异系数**：${avgValue > 0 ? ((maxValue - minValue) / avgValue * 100).toFixed(1) : 0}%`);
  lines.push("");
  lines.push(`## 二、Top 5 排名`);
  lines.push("");
  lines.push(`| 排名 | 区域 | 数值 |`);
  lines.push(`|------|------|------|`);
  top5.forEach((r, i) => {
    lines.push(`| ${i + 1} | ${r.name} | ${r.value.toFixed(2)}${unit} |`);
  });
  lines.push("");
  lines.push(`## 三、Bottom 5 排名`);
  lines.push("");
  lines.push(`| 排名 | 区域 | 数值 |`);
  lines.push(`|------|------|------|`);
  bottom5.forEach((r, i) => {
    lines.push(`| ${ranking.length - 4 + i} | ${r.name} | ${r.value.toFixed(2)}${unit} |`);
  });
  lines.push("");
  if (insights.length > 0) {
    lines.push(`## 四、分析洞察`);
    lines.push("");
    insights.forEach((ins) => lines.push(`- ${ins}`));
    lines.push("");
  }
  lines.push(`## 五、数据说明`);
  lines.push("");
  lines.push(`- 数据来源：公开统计年鉴趋势模拟生成`);
  lines.push(`- 数据性质：示例数据，仅供可视化展示`);
  lines.push(`- 生成时间：${new Date().toLocaleString("zh-CN")}`);
  lines.push("");
  return lines.join("\n");
}

/**
 * 下载 Markdown 文本
 */
export function downloadMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
  downloadBlob(blob, `${filename}.md`);
}
