const PAGE_WINDOW = 5;

export default function Pagination({ currentPage, totalPages, onChange }) {
  const start = Math.max(1, currentPage - Math.floor(PAGE_WINDOW / 2));
  const end = Math.min(totalPages, start + PAGE_WINDOW - 1);
  const normalizedStart = Math.max(1, end - PAGE_WINDOW + 1);
  const pages = [];

  for (let page = normalizedStart; page <= end; page += 1) {
    pages.push(page);
  }

  return (
    <div className="pagination">
      <button type="button" onClick={() => onChange(currentPage - 1)} disabled={currentPage === 1}>
        {'<'}
      </button>
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          className={page === currentPage ? 'is-active' : ''}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
}
