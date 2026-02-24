import { useEffect, useMemo, useState } from 'react';
import AddReportModal from './components/AddReportModal';
import Header from './components/Header';
import ReportCharts from './components/ReportCharts';
import ReportPanel from './components/ReportPanel';
import SummaryCards from './components/SummaryCards';
import { createReportFromInput, createSampleReports } from './data';
import './styles/dashboard.css';
import { loadReports, saveReports } from './utils/storage';

const REPORTS_PER_PAGE = 12;

export default function App() {
  const [reports, setReports] = useState(() => {
    const stored = loadReports();
    return stored.length ? stored : createSampleReports();
  });
  const [selectedReportId, setSelectedReportId] = useState(reports[0]?.id ?? null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', subtitle: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  const filteredReports = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return reports;
    return reports.filter((report) => report.title.toLowerCase().includes(query));
  }, [reports, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / REPORTS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pagedReports = useMemo(() => {
    const start = (currentPage - 1) * REPORTS_PER_PAGE;
    return filteredReports.slice(start, start + REPORTS_PER_PAGE);
  }, [filteredReports, currentPage]);

  const selectedReport =
    reports.find((report) => report.id === selectedReportId) ??
    reports[0] ??
    createSampleReports()[0];

  useEffect(() => {
    if (reports.length && !reports.some((report) => report.id === selectedReportId)) {
      setSelectedReportId(reports[0].id);
    }
  }, [reports, selectedReportId]);

  const openModal = () => {
    setModalOpen(true);
    setErrors({});
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({ title: '', subtitle: '' });
    setErrors({});
  };

  const handleCreateReport = (event) => {
    event.preventDefault();
    const nextErrors = {};
    const title = form.title.trim();
    const subtitle = form.subtitle.trim();

    if (!title) nextErrors.title = 'Title is required';
    if (!subtitle) nextErrors.subtitle = 'Subtitle is required';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const created = createReportFromInput(title, subtitle, selectedReport);
    setReports((prev) => [created, ...prev]);
    setSelectedReportId(created.id);
    setSearchTerm('');
    setCurrentPage(1);
    closeModal();
  };

  return (
    <div className="dashboard-shell">
      <Header />

      <main className="dashboard-main">
        <div className="section-heading">
          <span className="section-icon">=</span>
          <div>
            <h1>{selectedReport.subtitle}</h1>
          </div>
        </div>

        <SummaryCards report={selectedReport} />

        <section className="workspace-grid">
          <ReportPanel
            reports={pagedReports}
            selectedReportId={selectedReportId}
            searchTerm={searchTerm}
            onSearchChange={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            onSelectReport={setSelectedReportId}
            onOpenAdd={openModal}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          <ReportCharts report={selectedReport} />
        </section>
      </main>

      <AddReportModal
        isOpen={isModalOpen}
        form={form}
        errors={errors}
        onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
        onClose={closeModal}
        onSubmit={handleCreateReport}
      />
    </div>
  );
}
