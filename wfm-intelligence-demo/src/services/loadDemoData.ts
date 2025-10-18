/**
 * Demo data loading service
 * Loads all JSON files in parallel and measures performance
 */

export interface LoadPerformanceMetrics {
  startTime: number;
  endTime: number;
  totalDuration: number; // milliseconds
  fileSizes: {
    agents: number;
    schedules: number;
    cvdForecast: number;
    complianceRules: number;
    total: number;
  };
  itemCounts: {
    agents: number;
    schedules: number;
    cvdForecast: number;
    complianceRules: number;
  };
}

export interface DemoData {
  agents: unknown[];
  schedules: unknown[];
  cvdForecast: unknown[];
  complianceRules: unknown[];
}

/**
 * Loads all demo data files in parallel
 * Returns data and performance metrics
 */
export async function loadAllDemoData(): Promise<{
  data: DemoData;
  metrics: LoadPerformanceMetrics;
}> {
  const startTime = performance.now();

  // Load all files in parallel
  const [agentsRes, schedulesRes, cvdForecastRes, complianceRulesRes] = await Promise.all([
    fetch('/demo-data/agents.json'),
    fetch('/demo-data/schedules.json'),
    fetch('/demo-data/cvd-forecast.json'),
    fetch('/demo-data/compliance-rules.json'),
  ]);

  // Parse JSON in parallel
  const [agents, schedules, cvdForecast, complianceRules] = await Promise.all([
    agentsRes.json(),
    schedulesRes.json(),
    cvdForecastRes.json(),
    complianceRulesRes.json(),
  ]);

  const endTime = performance.now();
  const totalDuration = endTime - startTime;

  // Calculate file sizes from Content-Length header (if available)
  const getContentLength = (res: Response) => {
    const length = res.headers.get('content-length');
    return length ? parseInt(length, 10) : 0;
  };

  const metrics: LoadPerformanceMetrics = {
    startTime,
    endTime,
    totalDuration,
    fileSizes: {
      agents: getContentLength(agentsRes),
      schedules: getContentLength(schedulesRes),
      cvdForecast: getContentLength(cvdForecastRes),
      complianceRules: getContentLength(complianceRulesRes),
      total:
        getContentLength(agentsRes) +
        getContentLength(schedulesRes) +
        getContentLength(cvdForecastRes) +
        getContentLength(complianceRulesRes),
    },
    itemCounts: {
      agents: agents.length,
      schedules: schedules.length,
      cvdForecast: cvdForecast.length,
      complianceRules: complianceRules.length,
    },
  };

  return {
    data: {
      agents,
      schedules,
      cvdForecast,
      complianceRules,
    },
    metrics,
  };
}

/**
 * Formats bytes to human-readable size
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Prints performance metrics to console
 */
export function printPerformanceMetrics(metrics: LoadPerformanceMetrics): void {
  console.log('\n========== DEMO DATA LOAD PERFORMANCE ==========');
  console.log(`\n⏱️  Total Load Time: ${metrics.totalDuration.toFixed(2)}ms`);
  console.log(`\n📦 File Sizes:`);
  console.log(`   agents.json:          ${formatBytes(metrics.fileSizes.agents)}`);
  console.log(`   schedules.json:       ${formatBytes(metrics.fileSizes.schedules)}`);
  console.log(`   cvd-forecast.json:    ${formatBytes(metrics.fileSizes.cvdForecast)}`);
  console.log(`   compliance-rules.json: ${formatBytes(metrics.fileSizes.complianceRules)}`);
  console.log(`   TOTAL:                ${formatBytes(metrics.fileSizes.total)}`);
  console.log(`\n📊 Item Counts:`);
  console.log(`   Agents:         ${metrics.itemCounts.agents}`);
  console.log(`   Schedules:      ${metrics.itemCounts.schedules}`);
  console.log(`   CvD Intervals:  ${metrics.itemCounts.cvdForecast}`);
  console.log(`   Compliance Rules: ${metrics.itemCounts.complianceRules}`);
  console.log(`\n✅ Load Target: < 2000ms (FR20)`);

  if (metrics.totalDuration < 2000) {
    console.log(`✅ PASSED: Load completed in ${metrics.totalDuration.toFixed(2)}ms`);
  } else {
    console.log(`❌ FAILED: Load took ${metrics.totalDuration.toFixed(2)}ms (exceeds 2000ms target)`);
  }

  console.log('\n================================================\n');
}
