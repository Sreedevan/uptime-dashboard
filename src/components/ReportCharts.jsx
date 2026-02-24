import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip);

export default function ReportCharts({ report }) {
  const barData = {
    labels: report.unitLabels,
    datasets: [
      {
        label: 'In Process',
        data: report.unitSeries.inProcess,
        backgroundColor: '#b28bf4',
        borderRadius: 6,
      },
      {
        label: 'Unacknowledged',
        data: report.unitSeries.unacknowledged,
        backgroundColor: '#d9c8fb',
        borderRadius: 6,
      },
      {
        label: 'On Watch',
        data: report.unitSeries.onWatch,
        backgroundColor: '#4c62f4',
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
          padding: 20,
        },
      },
      tooltip: { intersect: false },
    },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: { color: '#e8e4f8' },
        ticks: { stepSize: 2 },
      },
    },
  };

  const doughnutData = {
    labels: report.alertDistribution.map((item) => item.label),
    datasets: [
      {
        data: report.alertDistribution.map((item) => item.value),
        backgroundColor: report.alertDistribution.map((item) => item.color),
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '48%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
          padding: 18,
        },
      },
    },
  };

  return (
    <section className="charts-area card">
      <div className="stats-row">
        <div>
          <p>Number of Open Alerts</p>
          <strong>{report.metrics.openAlerts}</strong>
        </div>
        <div>
          <p>Closing Rate %</p>
          <strong>{report.metrics.closingRate}%</strong>
        </div>
        <div>
          <p>Oldest Unacknowledged Alert</p>
          <strong>{report.metrics.oldestUnackDays} Days</strong>
        </div>
      </div>

      <div className="chart-grid">
        <article className="chart-card">
          <h3>Best Unit Operations with Latest Number of Alerts</h3>
          <div className="chart-wrap">
            <Bar data={barData} options={barOptions} />
          </div>
        </article>
        <article className="chart-card">
          <h3>Alert Rates Distribution</h3>
          <div className="chart-wrap">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </article>
      </div>
    </section>
  );
}
