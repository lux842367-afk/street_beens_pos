import "./transactions.css";

const transactions = [
  {
    id: 1,
    products: [
      { name: "Black Americano", quantity: 2 },
      { name: "Cappuccino", quantity: 1 },
    ],
    date: "September 28, 2026",
    time: "10:15 AM",
    total: 270,
  },
  {
    id: 2,
    products: [
      { name: "Caramel Macchiato", quantity: 1 },
      { name: "Milky Oreo", quantity: 2 },
    ],
    date: "September 28, 2026",
    time: "11:30 AM",
    total: 270,
  },
  {
    id: 3,
    products: [
      { name: "Blue Berry", quantity: 1 },
      { name: "Green Apple", quantity: 1 },
      { name: "Strawberry", quantity: 2 },
    ],
    date: "September 27, 2026",
    time: "2:45 PM",
    total: 360,
  },
  {
    id: 4,
    products: [
      { name: "Mocha Caramel", quantity: 1 },
      { name: "Cookies and Cream", quantity: 1 },
    ],
    date: "September 27, 2026",
    time: "4:20 PM",
    total: 180,
  },
];

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

function Transactions({ onNavigate }) {
  return (
    <div className="transactions-page">

      {/* DESKTOP SIDEBAR */}
      <aside className="transactions-sidebar">
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

          <button
            className="sidebar-nav-item active"
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

      {/* MAIN CONTENT */}
      <main className="transactions-main">
        <header className="transactions-header">
          <button
            className="transactions-back-button"
            onClick={() => onNavigate("reports")}
          >
            ←
          </button>

          <h1>Transaction History</h1>
        </header>

        <section className="transactions-content">
          <div className="transaction-list">
            {transactions.map((transaction) => (
              <article
                className="transaction-card"
                key={transaction.id}
              >
                <div className="transaction-information">
                  <div className="transaction-products">
                    {transaction.products.map((product) => (
                      <div
                        className="transaction-product"
                        key={product.name}
                      >
                        <span>{product.name}</span>
                        <span>× {product.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="transaction-date-time">
                    <span>{transaction.date}</span>
                    <span>{transaction.time}</span>
                  </div>
                </div>

                <div className="transaction-total">
                  <span>Total</span>
                  <strong>₱{transaction.total}</strong>
                </div>
              </article>
            ))}
          </div>
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

        <button
          className="bottom-nav-item active"
          onClick={() => onNavigate("reports")}
        >
          <StatsIcon />
          <span>Reports</span>
        </button>
      </nav>

    </div>
  );
}

export default Transactions;