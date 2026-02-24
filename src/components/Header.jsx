export default function Header() {
  return (
    <header className="topbar">
      <div className="topbar__title">Dashboard</div>
      <div className="topbar__actions">
        <button className="icon-btn" type="button" aria-label="notifications">
          <span>o</span>
        </button>
        <button className="icon-btn" type="button" aria-label="help">
          <span>?</span>
        </button>
        <button className="profile-btn" type="button" aria-label="profile">
          T
        </button>
      </div>
    </header>
  );
}
