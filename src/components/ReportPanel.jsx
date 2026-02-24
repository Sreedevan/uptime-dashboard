import Pagination from './Pagination';

export default function ReportPanel({
  reports,
  selectedReportId,
  searchTerm,
  onSearchChange,
  onSelectReport,
  onOpenAdd,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <aside className="left-panel card">
      <h3>Select Report Dashboard</h3>
      <div className="panel-controls">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <button type="button" className="primary-btn" onClick={onOpenAdd}>
          ADD
        </button>
      </div>

      <div className="report-list">
        {reports.length === 0 ? (
          <p className="empty-state">No reports found.</p>
        ) : (
          reports.map((report) => (
            <button
              key={report.id}
              type="button"
              className={`report-item ${selectedReportId === report.id ? 'is-selected' : ''}`}
              onClick={() => onSelectReport(report.id)}
            >
              <span>{report.title}</span>
              <input type="checkbox" readOnly checked={selectedReportId === report.id} />
            </button>
          ))
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onChange={onPageChange} />
    </aside>
  );
}
