
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

const sizes = [
  { name: "Regular", price: 0 },
  { name: "Large", price: 20 },
  { name: "Extra Large", price: 35 },
];

const milkOptions = [
  { name: "Regular Milk", price: 0 },
  { name: "Oat Milk", price: 20 },
  { name: "Almond Milk", price: 25 },
  { name: "Lactose-Free Milk", price: 20 },
];

const coffeeExtras = [
  { name: "Extra Espresso Shot", price: 25 },
  { name: "Vanilla Syrup", price: 15 },
  { name: "Caramel Syrup", price: 15 },
  { name: "Hazelnut Syrup", price: 15 },
];

const nonCoffeeExtras = [
  { name: "Oreo Crumbs", price: 15 },
  { name: "Whipped Cream", price: 15 },
  { name: "Caramel Syrup", price: 15 },
];

const sodaExtras = [
  { name: "Fruit Jelly", price: 15 },
  { name: "Extra Soda", price: 10 },
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

function Pos({ onNavigate }) {
  const [category, setCategory] = useState("Iced Coffee");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customizingProduct, setCustomizingProduct] = useState(null);

  const [size, setSize] = useState("Regular");
  const [milk, setMilk] = useState("Regular Milk");
  const [sugar, setSugar] = useState("100%");
  const [extras, setExtras] = useState([]);
  const [notes, setNotes] = useState("");

  const isCoffee = category === "Iced Coffee";
  const isNonCoffee = category === "Non Coffee";
  const isSoda = category === "Fruity Soda";

  const availableExtras = isCoffee
    ? coffeeExtras
    : isNonCoffee
      ? nonCoffeeExtras
      : sodaExtras;

  const resetCustomization = () => {
    setSize("Regular");
    setMilk("Regular Milk");
    setSugar("100%");
    setExtras([]);
    setNotes("");
  };

  const openCustomization = (product) => {
    setCustomizingProduct({ name: product, category });
    resetCustomization();
  };

  const closeCustomization = () => {
    setCustomizingProduct(null);
    resetCustomization();
  };

  const toggleExtra = (extra) => {
    setExtras((current) =>
      current.some((item) => item.name === extra.name)
        ? current.filter((item) => item.name !== extra.name)
        : [...current, extra]
    );
  };

  const getCustomizationPrice = () => {
    const selectedSize = sizes.find((item) => item.name === size);
    const selectedMilk = milkOptions.find((item) => item.name === milk);

    const milkPrice =
      isCoffee || isNonCoffee ? selectedMilk?.price ?? 0 : 0;

    const extrasPrice = extras.reduce(
      (sum, extra) => sum + extra.price,
      0
    );

    return PRICE + (selectedSize?.price ?? 0) + milkPrice + extrasPrice;
  };

  const addCustomizedProduct = () => {
    if (!customizingProduct) return;

    const selectedSize = sizes.find((item) => item.name === size);
    const selectedMilk = milkOptions.find((item) => item.name === milk);
    const unitPrice = getCustomizationPrice();

    const newItem = {
      id: `${Date.now()}-${Math.random()}`,
      name: customizingProduct.name,
      category: customizingProduct.category,
      quantity: 1,
      size,
      milk: isCoffee || isNonCoffee ? milk : null,
      sugar,
      extras: [...extras],
      notes: notes.trim(),
      unitPrice,
    };

    setSelectedProducts((current) => [...current, newItem]);
    closeCustomization();
  };

  const increaseQuantity = (id) => {
    setSelectedProducts((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setSelectedProducts((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setSelectedProducts((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const total = selectedProducts.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const buttonStyle = {
    border: "1px solid #AD907D",
    borderRadius: "5px",
    padding: "10px 12px",
    background: "#FFFFFF",
    color: "#3D2B1F",
    cursor: "pointer",
    font: "inherit",
  };

  const fieldStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px",
    border: "1px solid #AD907D",
    borderRadius: "5px",
    background: "#FFFFFF",
    color: "#3D2B1F",
    font: "inherit",
  };

  const sectionStyle = {
    display: "grid",
    gap: "8px",
    marginBottom: "18px",
  };

  const optionGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
    gap: "8px",
  };

  return (
    <div className="pos-page">
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
            onClick={() => onNavigate("products")}
          >
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
                  onClick={() => openCustomization(product)}
                >
                  <span>{product}</span>
                  <span>₱{PRICE}</span>
                </button>
              );
            })}
          </section>
        </section>

        {selectedProducts.length > 0 && (
          <section className="current-order">
            <h2>Current Order</h2>

            <div className="order-list">
              {selectedProducts.map((item) => (
                <div className="order-item" key={item.id}>
                  <div className="order-details">
                    <span className="order-product">{item.name}</span>

                    <span className="order-price">
                      ₱{item.unitPrice} each
                    </span>

                    <span style={{ fontSize: "12px", opacity: 0.8 }}>
                      {item.size}
                      {item.milk ? ` · ${item.milk}` : ""}
                      {` · ${item.sugar} sugar`}
                    </span>

                    {item.extras.length > 0 && (
                      <span style={{ fontSize: "12px", opacity: 0.8 }}>
                        Extras: {item.extras.map((extra) => extra.name).join(", ")}
                      </span>
                    )}

                    {item.notes && (
                      <span style={{ fontSize: "12px", opacity: 0.8 }}>
                        Note: {item.notes}
                      </span>
                    )}
                  </div>

                  <div className="quantity-controls">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>

                    <button
                      aria-label={`Remove ${item.name} from order`}
                      onClick={() => removeItem(item.id)}
                      title="Remove item"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span>Total</span>
              <span>₱{total.toFixed(2)}</span>
            </div>

            <button
              className="record-sale-button"
              onClick={() =>
                window.alert(
                  "This is a frontend prototype. Saving transactions requires backend or persistent storage."
                )
              }
            >
              Record Sale
            </button>
          </section>
        )}
      </main>

      {customizingProduct && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCustomization();
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "rgba(0, 0, 0, 0.45)",
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="customization-title"
            style={{
              width: "100%",
              maxWidth: "480px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxSizing: "border-box",
              padding: "24px",
              borderRadius: "8px",
              background: "#FFFFFF",
              color: "#3D2B1F",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2 id="customization-title" style={{ margin: "0 0 6px" }}>
                  Customize Drink
                </h2>
                <p style={{ margin: 0, opacity: 0.75 }}>
                  {customizingProduct.name}
                </p>
              </div>

              <button
                type="button"
                onClick={closeCustomization}
                aria-label="Close customization"
                style={{
                  ...buttonStyle,
                  padding: "6px 12px",
                  fontSize: "20px",
                }}
              >
                ×
              </button>
            </div>

            <div style={sectionStyle}>
              <strong>Size</strong>

              <div style={optionGridStyle}>
                {sizes.map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => setSize(item.name)}
                    style={{
                      ...buttonStyle,
                      background:
                        size === item.name ? "#3D2B1F" : "#FFFFFF",
                      color: size === item.name ? "#FFFFFF" : "#3D2B1F",
                    }}
                  >
                    <span style={{ display: "block" }}>{item.name}</span>
                    <small>
                      {item.price ? `+₱${item.price}` : "Included"}
                    </small>
                  </button>
                ))}
              </div>
            </div>

            {(isCoffee || isNonCoffee) && (
              <div style={sectionStyle}>
                <strong>Milk</strong>

                <select
                  value={milk}
                  onChange={(event) => setMilk(event.target.value)}
                  style={fieldStyle}
                >
                  {milkOptions.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                      {item.price ? ` (+₱${item.price})` : " (Included)"}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div style={sectionStyle}>
              <strong>Sugar Level</strong>

              <div style={optionGridStyle}>
                {["0%", "25%", "50%", "75%", "100%"].map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => setSugar(level)}
                    style={{
                      ...buttonStyle,
                      background: sugar === level ? "#3D2B1F" : "#FFFFFF",
                      color: sugar === level ? "#FFFFFF" : "#3D2B1F",
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div style={sectionStyle}>
              <strong>Add-ons</strong>

              {availableExtras.map((extra) => {
                const checked = extras.some(
                  (item) => item.name === extra.name
                );

                return (
                  <label
                    key={extra.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      border: "1px solid #AD907D",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleExtra(extra)}
                    />

                    <span style={{ flex: 1 }}>{extra.name}</span>
                    <span>+₱{extra.price}</span>
                  </label>
                );
              })}
            </div>

            <div style={sectionStyle}>
              <strong>Order Notes (Optional)</strong>

              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Example: less ice, no whipped cream..."
                rows={3}
                maxLength={200}
                style={{ ...fieldStyle, resize: "vertical" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                paddingTop: "16px",
                borderTop: "1px solid #AD907D",
              }}
            >
              <div>
                <small>Price per drink</small>
                <h2 style={{ margin: "4px 0 0" }}>
                  ₱{getCustomizationPrice().toFixed(2)}
                </h2>
              </div>

              <button
                type="button"
                onClick={addCustomizedProduct}
                style={{
                  ...buttonStyle,
                  background: "#3D2B1F",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  padding: "12px 16px",
                }}
              >
                Add to Order
              </button>
            </div>
          </section>
        </div>
      )}

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
          onClick={() => onNavigate("products")}
        >
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

export default Pos;
