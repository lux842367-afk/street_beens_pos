import Card from "../components/card";

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 12H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10.5L12 3L21 10.5V20H14V14H10V20H3V10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 5H6L8 17H19L21 8H7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1.5" fill="currentColor" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7H20V20H4V7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M3 4H21V7H3V4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 20V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 20V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 20V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Dashboard({ onNavigate }) {
  return (
    <div className="dashboard-page">

      {/* =========================
          DESKTOP SIDEBAR
      ========================= */}

      <aside className="dashboard-sidebar">

        <div className="sidebar-brand">
          <h2>Street Beans Café</h2>
        </div>

        <nav className="sidebar-nav">

          <button
            className="sidebar-nav-item active"
            onClick={() => onNavigate("dashboard")}
          >
            <HomeIcon />
            <span>Home</span>
          </button>

          <button
            className="sidebar-nav-item"
            onClick={() => onNavigate("pos")}
          >
            <CartIcon />
            <span>POS</span>
          </button>

          <button
            className="sidebar-nav-item"
            onClick={() => onNavigate("transactions")}
          >
            <ArchiveIcon />
            <span>Transactions</span>
          </button>

          <button
            className="sidebar-nav-item"
            onClick={() => onNavigate("reports")}
          >
            <StatsIcon />
            <span>Reports</span>
          </button>

        </nav>

        <button
          className="sidebar-logout"
          onClick={() => onNavigate("login")}
        >
          Log Out
        </button>

      </aside>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="dashboard-main">

        <header className="dashboard-header">

          <button
            className="menu-button"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          <h1>Dashboard</h1>

        </header>


        <section className="dashboard-content">

          {/* TODAY'S SALES */}

          <Card
            title="Today's Sales"
            className="dashboard-card sales-card"
          >
            <div className="dashboard-value">
              ₱0.00
            </div>
          </Card>


          {/* TOTAL TRANSACTIONS */}

          <Card
            title="Total Transactions"
            className="dashboard-card"
          >
            <div className="dashboard-value">
              0
            </div>
          </Card>


          {/* BEST SELLER */}

          <Card
            title="Best Seller"
            className="dashboard-card"
          >
            <div className="best-seller">
              <strong>No sales yet</strong>
              <span>0 items sold</span>
            </div>
          </Card>


          {/* SALES CHART */}

          <Card
            title="Sales Chart"
            className="dashboard-card chart-card"
          >
            <div className="chart">

              <div className="chart-y-axis">
                <span>₱500</span>
                <span>₱400</span>
                <span>₱300</span>
                <span>₱200</span>
                <span>₱100</span>
                <span>₱0</span>
              </div>

              <div className="chart-area">

                <div className="chart-line"></div>

                <div className="chart-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>

              </div>

            </div>
          </Card>

        </section>

      </main>


      {/* =========================
          MOBILE BOTTOM NAVIGATION
      ========================= */}

      <nav className="bottom-navigation">

        <button
          className="bottom-nav-item active"
          onClick={() => onNavigate("dashboard")}
        >
          <HomeIcon />
          <span>Home</span>
        </button>

        <button
          className="bottom-nav-item"
          onClick={() => onNavigate("pos")}
        >
          <CartIcon />
          <span>POS</span>
        </button>

        <button
          className="bottom-nav-item"
          onClick={() => onNavigate("transactions")}
        >
          <ArchiveIcon />
          <span>Archive</span>
        </button>

        <button
          className="bottom-nav-item"
          onClick={() => onNavigate("reports")}
        >
          <StatsIcon />
          <span>Stats</span>
        </button>

      </nav>

    </div>
  );
}

export default Dashboard;