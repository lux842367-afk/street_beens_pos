import { useState } from "react";
import "./reports.css";

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

function ProductsIcon() {
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

function Reports({ onNavigate }) {
  const [startMonth, setStartMonth] = useState("2026-01");
  const [endMonth, setEndMonth] = useState("2026-09");

  return (
    <div className="reports-page">

      {/* DESKTOP SIDEBAR */}
      <aside className="reports-sidebar">
        <div className="sidebar-brand">
          <h2>Street Beans Café</h2>
        </div>

        <nav className="sidebar-nav">
          <button
            className="sidebar-nav-item"
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
            onClick={() => onNavigate("products")}
          >
            <ProductsIcon />
            <span>Products</span>
          </button>

          <button className="sidebar-nav-item active">
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

      {/* MAIN REPORTS */}
      <main className="reports-main">
        <header className="reports-header">
          <button
            className="reports-back-button"
            onClick={() => onNavigate("dashboard")}
          >
            ←
          </button>

          <h1>Reports</h1>
        </header>

        <section className="reports-content">

          {/* DATE RANGE */}
          <section className="date-range-section">
            <h2>Sales Period</h2>

            <div className="date-range">
              <div className="date-field">
                <label htmlFor="start-month">From</label>
                <input
                  id="start-month"
                  type="month"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                />
              </div>

              <span className="date-separator">to</span>

              <div className="date-field">
                <label htmlFor="end-month">To</label>
                <input
                  id="end-month"
                  type="month"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* REPORT CARDS */}
          <section className="reports-cards">

            <div className="report-card">
              <h3>Total Sales</h3>
              <div className="report-value">₱0.00</div>
              <p>Selected period</p>
            </div>

            <div className="report-card transaction-report-card">
              <h3>Total Transactions</h3>

              <div className="report-value">0</div>

              <button
                className="view-history-button"
                onClick={() => onNavigate("transactions")}
              >
                View History
              </button>
            </div>

            <div className="report-card">
              <h3>Best Seller</h3>

              <div className="report-best-seller">
                <strong>No sales yet</strong>
                <span>0 items sold</span>
              </div>
            </div>

            <div className="report-card report-chart-card">
              <h3>Sales Chart</h3>

              <div className="report-chart">
                <div className="report-chart-y-axis">
                  <span>₱500</span>
                  <span>₱400</span>
                  <span>₱300</span>
                  <span>₱200</span>
                  <span>₱100</span>
                  <span>₱0</span>
                </div>

                <div className="report-chart-area">
                  <div className="report-chart-line"></div>

                  <div className="report-chart-labels">
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
            </div>

          </section>
        </section>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="bottom-navigation">
        <button
          className="bottom-nav-item"
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
          onClick={() => onNavigate("products")}
        >
          <ProductsIcon />
          <span>Products</span>
        </button>

        <button className="bottom-nav-item active">
          <StatsIcon />
          <span>Reports</span>
        </button>
      </nav>

    </div>
  );
}

export default Reports;