const products = {
  "Iced Coffee": [
    { name: "Black Americano", price: 90 },
    { name: "Cappuccino", price: 90 },
    { name: "Caramel Macchiato", price: 90 },
    { name: "Mocha Caramel", price: 90 },
  ],

  "Non Coffee": [
    { name: "Milky Oreo", price: 90 },
    { name: "Strawberry Oreo", price: 90 },
    { name: "Cookies and Cream", price: 90 },
    { name: "White Caramel", price: 90 },
  ],

  "Fruity Soda": [
    { name: "Blue Berry", price: 90 },
    { name: "Green Apple", price: 90 },
    { name: "Strawberry", price: 90 },
    { name: "Grapes", price: 90 },
  ],
};

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

function EditIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 20H8L19 9C20.1 7.9 20.1 6.1 19 5C17.9 3.9 16.1 3.9 15 5L4 16V20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 7L17 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Products({ onNavigate }) {
  return (
    <div className="products-page">
      <aside className="products-sidebar">
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

          <button className="sidebar-nav-item active">
            <ProductsIcon />
            <span>Products</span>
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

      <main className="products-main">
        <header className="products-header">
          <button
            className="products-back-button"
            onClick={() => onNavigate("dashboard")}
          >
            ←
          </button>

          <h1>Products</h1>
        </header>

        <section className="products-content">
          {Object.entries(products).map(([category, categoryProducts]) => (
            <section className="product-category" key={category}>
              <h2>{category}</h2>

              <div className="product-list">
                {categoryProducts.map((product) => (
                  <div className="product-card" key={product.name}>
                    <div className="product-information">
                      <h3>{product.name}</h3>
                      <p>{category}</p>
                      <strong>₱{product.price}</strong>
                    </div>

                    <button
                      className="edit-product-button"
                      aria-label={`Edit ${product.name}`}
                    >
                      <EditIcon />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <button className="add-product-button">
            <span>+</span>
            Add Product
          </button>
        </section>
      </main>

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

        <button className="bottom-nav-item active">
          <ProductsIcon />
          <span>Products</span>
        </button>

        <button
          className="bottom-nav-item"
          onClick={() => onNavigate("reports")}
        >
          <StatsIcon />
          <span>Reports</span>
        </button>
      </nav>
    </div>
  );
}

export default Products;