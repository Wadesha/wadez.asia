export interface ForecastPoint {
  year: number;
  value: number;
  lowerBound: number;
  upperBound: number;
}

export interface ForecastResult {
  historical: Array<{ year: number; value: number }>;
  forecast: ForecastPoint[];
  slope: number;
  intercept: number;
  rSquared: number;
  yearsAhead: number;
}

function mean(values: number[]): number {
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function linearRegression(x: number[], y: number[]): { slope: number; intercept: number; rSquared: number } {
  const n = x.length;
  if (n < 2) return { slope: 0, intercept: y[0] || 0, rSquared: 0 };

  const xMean = mean(x);
  const yMean = mean(y);

  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < n; i++) {
    numerator += (x[i] - xMean) * (y[i] - yMean);
    denominator += (x[i] - xMean) ** 2;
  }

  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = yMean - slope * xMean;

  // R-squared
  const ssTot = y.reduce((s, yi) => s + (yi - yMean) ** 2, 0);
  const ssRes = y.reduce((s, yi, i) => s + (yi - (slope * x[i] + intercept)) ** 2, 0);
  const rSquared = ssTot === 0 ? 1 : 1 - ssRes / ssTot;

  return { slope, intercept, rSquared };
}

export function forecastTrend(
  historical: Array<{ year: number; value: number }>,
  yearsAhead: number = 5
): ForecastResult {
  if (historical.length < 2) {
    return {
      historical,
      forecast: [],
      slope: 0,
      intercept: historical[0]?.value || 0,
      rSquared: 0,
      yearsAhead,
    };
  }

  const x = historical.map((h) => h.year);
  const y = historical.map((h) => h.value);
  const { slope, intercept, rSquared } = linearRegression(x, y);

  // Calculate standard error for confidence interval
  const predictions = x.map((xi) => slope * xi + intercept);
  const residuals = y.map((yi, i) => yi - predictions[i]);
  const residualStd = Math.sqrt(
    residuals.reduce((s, r) => s + r * r, 0) / Math.max(1, residuals.length - 2)
  );

  const lastYear = Math.max(...x);
  const forecast: ForecastPoint[] = [];

  for (let i = 1; i <= yearsAhead; i++) {
    const year = lastYear + i;
    const predicted = slope * year + intercept;
    // Wider interval as we forecast further
    const margin = residualStd * (1 + i * 0.3) * 1.96;
    forecast.push({
      year,
      value: Math.round(predicted * 100) / 100,
      lowerBound: Math.round((predicted - margin) * 100) / 100,
      upperBound: Math.round((predicted + margin) * 100) / 100,
    });
  }

  return {
    historical,
    forecast,
    slope: Math.round(slope * 10000) / 10000,
    intercept: Math.round(intercept * 100) / 100,
    rSquared: Math.round(rSquared * 1000) / 1000,
    yearsAhead,
  };
}

export function generateHistoricalFromCurrent(
  currentValue: number,
  yearsBack: number = 5,
  volatility: number = 0.05,
  seed?: number
): Array<{ year: number; value: number }> {
  const now = new Date().getFullYear();
  const historical: Array<{ year: number; value: number }> = [];

  // Generate a plausible backward trend using seeded-like randomness
  let value = currentValue;
  for (let i = 0; i < yearsBack; i++) {
    const year = now - yearsBack + i + 1;
    const change = (Math.sin((seed || year) * 7.3) * 0.5 + 0.5) * volatility * value;
    const direction = Math.sin((seed || year) * 3.1) > 0 ? 1 : -1;
    value = Math.max(0, value + direction * change);
    historical.push({ year, value: Math.round(value * 100) / 100 });
  }

  return historical;
}
