
const navigationItems = [
  {
    id: "dashboard",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v12h14V9M9 21v-7h6v7" />
      </svg>
    ),
  },
  {
    id: "pos",
    label: "POS",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M7 8h10M7 12h2m3 0h2m3 0h1M7 16h2m3 0h2m3 0h1" />
      </svg>
    ),
  },
  {
    id: "products",
    label: "Products",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h16l-1 14H5L4 7Z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
    ),
  },
  {
    id: "reports",
    label: "Reports",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20V10m5 10V4m5 16v-7m5 7V7" />
      </svg>
    ),
  },
  {
    id: "accounts",
    label: "Accounts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21v-2a7 7 0 0 1 14 0v2M19 8v6m-3-3h6" />
      </svg>
    ),
  },
];

function Sidebar({ activePage, onNavigate, currentUser }) {
  const isAdmin = currentUser?.role?.toLowerCase() === "admin";
  const username = currentUser?.username || "Unknown User";
  const role = currentUser?.role || "Unknown Role";
  const initial = username.charAt(0).toUpperCase();

  const visibleItems = navigationItems.filter(
    (item) => item.id !== "accounts" || isAdmin
  );

  const isActive = (id) => {
    if (id === "reports" && activePage === "transactions") {
      return true;
    }

    return activePage === id;
  };

  const handleLogout = () => {
    onNavigate("login");
  };

  return (
    <>
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h2>Street Beans Café</h2>
        </div>

        <nav className="sidebar-nav">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${
                isActive(item.id) ? "active" : ""
              }`}
              onClick={() => onNavigate(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-account-logout">
          <div className="logged-in-account">
            <div className="account-avatar">{initial}</div>

            <div className="account-details">
              <span className="account-username">{username}</span>
              <span className="account-role">{role}</span>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              width="20"
              height="20"
            >
              <path d="M10 17l5-5-5-5m5 5H3" />
              <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <div className="mobile-account-indicator">
        <div className="mobile-account-avatar">{initial}</div>
        <div className="mobile-account-details">
          <strong>{username}</strong>
          <small>{role}</small>
        </div>
      </div>

      <nav className="bottom-navigation">
        {visibleItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav-item ${
              isActive(item.id) ? "active" : ""
            }`}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}

        <button
          type="button"
          className="bottom-nav-item mobile-logout"
          onClick={handleLogout}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M10 17l5-5-5-5m5 5H3" />
            <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
          </svg>
          <span>Log Out</span>
        </button>
      </nav>
    </>
  );
}

export default Sidebar;
