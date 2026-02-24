const UNIT_LABELS = ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6'];

const DISTRIBUTION_COLORS = ['#4157f6', '#8a9cf8', '#7f69e9', '#b298ef'];

function buildReport(index) {
  const openAlerts = 72 + ((index * 7) % 35);
  const closingRate = (38 + ((index * 3.4) % 24)).toFixed(1);
  const oldestUnackDays = 95 + ((index * 11) % 52);
  const progress = 42 + ((index * 7) % 48);

  const baseSeries = [3, 5, 2, 6, 7, 4].map((value, unitIndex) => value + ((index + unitIndex) % 3));
  const midSeries = [6, 4, 5, 4, 3, 4].map((value, unitIndex) => value + ((index + unitIndex) % 2));
  const lowSeries = [4, 2, 3, 3, 2, 3].map((value, unitIndex) => value + ((index + unitIndex + 1) % 2));

  const openPct = 30 + (index % 6);
  const inProcessPct = 20 + ((index * 2) % 8);
  const acknowledgedPct = 18 + ((index * 3) % 7);
  const onWatchPct = 100 - openPct - inProcessPct - acknowledgedPct;

  return {
    id: `report-${index + 1}`,
    title: `Report ${index + 1} - Site ${String.fromCharCode(65 + (index % 6))}`,
    subtitle: index % 2 === 0 ? 'Take-Home' : 'Plant Operations',
    last7DaysProgress: progress,
    metrics: {
      openAlerts,
      closingRate,
      oldestUnackDays,
    },
    unitLabels: UNIT_LABELS,
    unitSeries: {
      inProcess: baseSeries,
      unacknowledged: midSeries,
      onWatch: lowSeries,
    },
    alertDistribution: [
      { label: 'Open', value: openPct, color: DISTRIBUTION_COLORS[0] },
      { label: 'In Process', value: inProcessPct, color: DISTRIBUTION_COLORS[1] },
      { label: 'Acknowledged', value: acknowledgedPct, color: DISTRIBUTION_COLORS[2] },
      { label: 'On Watch', value: onWatchPct, color: DISTRIBUTION_COLORS[3] },
    ],
  };
}

export function createSampleReports(count = 30) {
  return Array.from({ length: count }, (_, index) => buildReport(index));
}

export function createReportFromInput(title, subtitle, templateReport) {
  const base = templateReport ?? createSampleReports(1)[0];
  const seed = Date.now() % 10;
  const nextDistribution = base.alertDistribution.map((item, index) => ({
    ...item,
    value: index === 0 ? Math.max(25, item.value - 2) : item.value + (seed % 2),
  }));

  const distributionTotal = nextDistribution.reduce((sum, item) => sum + item.value, 0);
  nextDistribution[nextDistribution.length - 1].value += 100 - distributionTotal;

  return {
    ...base,
    id: `report-${Date.now()}`,
    title,
    subtitle,
    last7DaysProgress: Math.min(95, base.last7DaysProgress + 3),
    metrics: {
      openAlerts: base.metrics.openAlerts + 1 + (seed % 5),
      closingRate: (Number(base.metrics.closingRate) + 0.4).toFixed(1),
      oldestUnackDays: base.metrics.oldestUnackDays + 2,
    },
    unitSeries: {
      inProcess: base.unitSeries.inProcess.map((value, index) => value + ((seed + index) % 2)),
      unacknowledged: base.unitSeries.unacknowledged.map((value, index) => value + ((seed + index + 1) % 2)),
      onWatch: base.unitSeries.onWatch.map((value, index) => value + ((seed + index) % 2)),
    },
    alertDistribution: nextDistribution,
  };
}
