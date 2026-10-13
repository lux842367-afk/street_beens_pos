
import "./transactions.css";
import Sidebar from "../components/Sidebar";

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

function Transactions({ onNavigate, currentUser }) {
  return (
    <div className="transactions-page">
      <Sidebar
        activePage="transactions"
        onNavigate={onNavigate}
        currentUser={currentUser}
      />

      <main className="transactions-main">
        <header className="transactions-header">
          <button
            type="button"
            className="transactions-back-button"
            onClick={() => onNavigate("reports")}
            aria-label="Back to reports"
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
                  <strong>₱{transaction.total.toFixed(2)}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Transactions;
