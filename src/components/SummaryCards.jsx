export default function SummaryCards({ report }) {
  return (
    <section className="summary-grid">
      <article className="card card--period">
        <div className="card__title">Last 7 Days</div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${report.last7DaysProgress}%` }} />
        </div>
      </article>
      <article className="card">
        <div className="metric-value">{report.metrics.openAlerts}</div>
        <div className="metric-label">Open Alerts</div>
      </article>
      <article className="card">
        <div className="metric-value">{report.metrics.closingRate}%</div>
        <div className="metric-label">Closing Rate %</div>
      </article>
      <article className="card">
        <div className="metric-value">
          {report.metrics.oldestUnackDays} <span>Days</span>
        </div>
        <div className="metric-label">Oldest Unacknowledged Alert</div>
      </article>
    </section>
  );
}
