/**
 * 分析报告生成器 (v2.1.14)
 * 为各子网站生成结构化分析报告
 */

export interface ReportSection {
  title: string;
  content: string;
  data?: Record<string, any>[];
}

export interface AnalysisReport {
  title: string;
  subtitle: string;
  generatedAt: string;
  dataSource: string;
  sections: ReportSection[];
}

/**
 * 生成报告为 Markdown 格式
 */
export function reportToMarkdown(report: AnalysisReport): string {
  let md = `# ${report.title}\n\n`;
  md += `> ${report.subtitle}\n\n`;
  md += `**生成时间**: ${report.generatedAt}  \n`;
  md += `**数据来源**: ${report.dataSource}\n\n`;
  md += `---\n\n`;

  for (const section of report.sections) {
    md += `## ${section.title}\n\n`;
    md += `${section.content}\n\n`;

    if (section.data && section.data.length > 0) {
      // 表格
      const keys = Object.keys(section.data[0]);
      md += `| ${keys.join(" | ")} |\n`;
      md += `| ${keys.map(() => "---").join(" | ")} |\n`;
      for (const row of section.data.slice(0, 20)) {
        md += `| ${keys.map((k) => String(row[k] ?? "")).join(" | ")} |\n`;
      }
      if (section.data.length > 20) {
        md += `\n*...共 ${section.data.length} 条数据，仅显示前20条*\n`;
      }
      md += "\n";
    }
  }

  md += `---\n\n*由 Wadez.asia 自动生成*\n`;
  return md;
}

/**
 * 导出报告为 Markdown 文件
 */
export function exportReportAsMarkdown(report: AnalysisReport): void {
  const md = reportToMarkdown(report);
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.title.replace(/\s+/g, "-")}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * 通用统计计算
 */
export function calculateStats(values: number[]) {
  if (values.length === 0) {
    return { min: 0, max: 0, avg: 0, sum: 0, count: 0 };
  }
  const sum = values.reduce((a, b) => a + b, 0);
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    avg: Math.round((sum / values.length) * 100) / 100,
    sum: Math.round(sum * 100) / 100,
    count: values.length,
  };
}

/**
 * 分布分析
 */
export function calculateDistribution<T extends string>(
  items: { category: T }[],
  categories: T[]
): Record<T, number> {
  const dist = {} as Record<T, number>;
  for (const cat of categories) {
    dist[cat] = 0;
  }
  for (const item of items) {
    if (item.category in dist) {
      dist[item.category]++;
    }
  }
  return dist;
}
