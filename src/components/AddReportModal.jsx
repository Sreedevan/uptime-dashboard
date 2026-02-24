export default function AddReportModal({ isOpen, form, errors, onChange, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-report-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="close-btn" onClick={onClose} aria-label="close">
          x
        </button>
        <h2 id="add-report-title">Add Dashboard Report</h2>

        <form onSubmit={onSubmit}>
          <label htmlFor="report-title">Title</label>
          <input
            id="report-title"
            type="text"
            value={form.title}
            onChange={(event) => onChange('title', event.target.value)}
          />
          {errors.title ? <p className="field-error">{errors.title}</p> : null}

          <label htmlFor="report-subtitle">Subtitle</label>
          <input
            id="report-subtitle"
            type="text"
            value={form.subtitle}
            onChange={(event) => onChange('subtitle', event.target.value)}
          />
          {errors.subtitle ? <p className="field-error">{errors.subtitle}</p> : null}

          <div className="modal-actions">
            <button type="button" className="ghost-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              Create
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
