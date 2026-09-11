import { useState } from "react";

const products = {
  "Iced Coffee": [
    "Black Americano",
    "Cappuccino",
    "Caramel Macchiato",
    "Mocha Caramel",
  ],
  "Non Coffee": [
    "Milky Oreo",
    "Strawberry Oreo",
    "Cookies and Cream",
    "White Caramel",
  ],
  "Fruity Soda": [
    "Blue Berry",
    "Green Apple",
    "Strawberry",
    "Grapes",
  ],
};

const PRICE = 90;

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

function Pos({ onNavigate }) {
  const [category, setCategory] = useState("Iced Coffee");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleProduct = (product) => {
    setSelectedProducts((current) => {
      const existing = current.find((item) => item.name === product);

      if (existing) {
        return current.filter((item) => item.name !== product);
      }

      return [...current, { name: product, quantity: 1 }];
    });
  };

  const increaseQuantity = (product) => {
    setSelectedProducts((current) =>
      current.map((item) =>
        item.name === product
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    setSelectedProducts((current) =>
      current
        .map((item) =>
          item.name === product
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = selectedProducts.reduce(
    (sum, item) => sum + PRICE * item.quantity,
    0
  );

  return (
    <div className="pos-page">

      {/* DESKTOP SIDEBAR */}
      <aside className="pos-sidebar">
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

          <button className="sidebar-nav-item active">
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

      {/* MAIN POS */}
      <main className="pos-main">
        <header className="pos-header">
          <button
            className="pos-back-button"
            onClick={() => onNavigate("dashboard")}
          >
            ←
          </button>

          <h1>Point of Sale</h1>
        </header>

        <section className="pos-content">

          {/* CATEGORIES */}
          <div className="pos-categories">
            {Object.keys(products).map((item) => (
              <button
                key={item}
                className={`pos-category ${
                  category === item ? "active" : ""
                }`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* PRODUCTS */}
          <section className="pos-products">
            {products[category].map((product) => {
              const isSelected = selectedProducts.some(
                (item) => item.name === product
              );

              return (
                <button
                  key={product}
                  className={`pos-product ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => toggleProduct(product)}
                >
                  <span>{product}</span>
                  <span>₱{PRICE}</span>
                </button>
              );
            })}
          </section>
        </section>

        {/* CURRENT ORDER */}
        {selectedProducts.length > 0 && (
          <section className="current-order">
            <h2>Current Order</h2>

            <div className="order-list">
              {selectedProducts.map((item) => (
                <div className="order-item" key={item.name}>
                  <div className="order-details">
                    <span className="order-product">
                      {item.name}
                    </span>

                    <span className="order-price">
                      ₱{PRICE} each
                    </span>
                  </div>

                  <div className="quantity-controls">
                    <button
                      onClick={() => decreaseQuantity(item.name)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.name)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span>Total</span>
              <span>₱{total}</span>
            </div>

            <button className="record-sale-button">
              Record Sale
            </button>
          </section>
        )}
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

        <button className="bottom-nav-item active">
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

export default Pos;