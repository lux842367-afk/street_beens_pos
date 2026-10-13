
import { useEffect, useState } from "react";
import { loadCatalog, subscribeCatalog } from "../productStore";
import Sidebar from "../components/Sidebar";

function Pos({ onNavigate, currentUser }) {
  const [catalog, setCatalog] = useState(() => loadCatalog());
  const [category, setCategory] = useState(
    () => loadCatalog().categories[0] || ""
  );
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customizingProduct, setCustomizingProduct] = useState(null);

  const [size, setSize] = useState("Regular");
  const [milk, setMilk] = useState("Regular Milk");
  const [sugar, setSugar] = useState("100%");
  const [extras, setExtras] = useState([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    return subscribeCatalog(() => {
      const updatedCatalog = loadCatalog();
      setCatalog(updatedCatalog);

      setCategory((current) =>
        updatedCatalog.categories.includes(current)
          ? current
          : updatedCatalog.categories[0] || ""
      );
    });
  }, []);

  const categories = catalog.categories || [];
  const allProducts = catalog.products || [];

  const categoryProducts = allProducts.filter(
    (product) =>
      product.category === category && product.available !== false
  );

  const hasMilk = Boolean(customizingProduct?.hasMilk);
  const availableSizes = customizingProduct?.sizes || [];
  const availableMilkOptions = customizingProduct?.milkOptions || [];
  const availableExtras = customizingProduct?.extras || [];

  const selectedSize =
    availableSizes.find((item) => item.name === size) ||
    availableSizes[0];

  const selectedMilk =
    availableMilkOptions.find((item) => item.name === milk) ||
    availableMilkOptions[0];

  const resetCustomization = () => {
    setSize("Regular");
    setMilk("Regular Milk");
    setSugar("100%");
    setExtras([]);
    setNotes("");
  };

  const openCustomization = (product) => {
    setCustomizingProduct(product);

    setSize(
      product.sizes?.find((item) => item.name === "Regular")?.name ||
        product.sizes?.[0]?.name ||
        ""
    );

    setMilk(
      product.milkOptions?.find(
        (item) => item.name === "Regular Milk"
      )?.name ||
        product.milkOptions?.[0]?.name ||
        ""
    );

    setSugar("100%");
    setExtras([]);
    setNotes("");
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
    if (!customizingProduct) return 0;

    const sizePrice = Number(selectedSize?.price || 0);
    const milkPrice = hasMilk
      ? Number(selectedMilk?.price || 0)
      : 0;

    const extrasPrice = extras.reduce(
      (sum, extra) => sum + Number(extra.price || 0),
      0
    );

    return (
      Number(customizingProduct.price || 0) +
      sizePrice +
      milkPrice +
      extrasPrice
    );
  };

  const addCustomizedProduct = () => {
    if (!customizingProduct) return;

    const unitPrice = getCustomizationPrice();

    const newItem = {
      id: `${Date.now()}-${Math.random()}`,
      name: customizingProduct.name,
      category: customizingProduct.category,
      quantity: 1,
      basePrice: Number(customizingProduct.price || 0),
      size,
      milk: hasMilk ? milk : null,
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
      <Sidebar
        activePage="pos"
        onNavigate={onNavigate}
        currentUser={currentUser}
      />

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
            {categories.map((item) => (
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
            {categoryProducts.length > 0 ? (
              categoryProducts.map((product) => {
                const isSelected = selectedProducts.some(
                  (item) => item.name === product.name
                );

                return (
                  <button
                    key={product.name}
                    className={`pos-product ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => openCustomization(product)}
                  >
                    <span>{product.name}</span>
                    <span>₱{Number(product.price).toFixed(2)}</span>
                  </button>
                );
              })
            ) : (
              <p className="products-empty-state">
                No available products in this category.
              </p>
            )}
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
                      ₱{item.unitPrice.toFixed(2)} each
                    </span>

                    <span style={{ fontSize: "12px", opacity: 0.8 }}>
                      {item.size}
                      {item.milk ? ` · ${item.milk}` : ""}
                      {` · ${item.sugar} sugar`}
                    </span>

                    {item.extras.length > 0 && (
                      <span style={{ fontSize: "12px", opacity: 0.8 }}>
                        Extras:{" "}
                        {item.extras
                          .map((extra) => extra.name)
                          .join(", ")}
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
                <h2
                  id="customization-title"
                  style={{ margin: "0 0 6px" }}
                >
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

              {availableSizes.length > 0 ? (
                <div style={optionGridStyle}>
                  {availableSizes.map((item) => (
                    <button
                      type="button"
                      key={item.name}
                      onClick={() => setSize(item.name)}
                      style={{
                        ...buttonStyle,
                        background:
                          size === item.name ? "#3D2B1F" : "#FFFFFF",
                        color:
                          size === item.name ? "#FFFFFF" : "#3D2B1F",
                      }}
                    >
                      <span style={{ display: "block" }}>
                        {item.name}
                      </span>

                      <small>
                        {Number(item.price) > 0
                          ? `+₱${Number(item.price).toFixed(2)}`
                          : "Included"}
                      </small>
                    </button>
                  ))}
                </div>
              ) : (
                <p>No sizes configured for this product.</p>
              )}
            </div>

            {hasMilk && (
              <div style={sectionStyle}>
                <strong>Milk</strong>

                {availableMilkOptions.length > 0 ? (
                  <select
                    value={milk}
                    onChange={(event) => setMilk(event.target.value)}
                    style={fieldStyle}
                  >
                    {availableMilkOptions.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                        {Number(item.price) > 0
                          ? ` (+₱${Number(item.price).toFixed(2)})`
                          : " (Included)"}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>No milk options configured for this product.</p>
                )}
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
                      background:
                        sugar === level ? "#3D2B1F" : "#FFFFFF",
                      color:
                        sugar === level ? "#FFFFFF" : "#3D2B1F",
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div style={sectionStyle}>
              <strong>Add-ons</strong>

              {availableExtras.length > 0 ? (
                availableExtras.map((extra) => {
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

                      <span>
                        +₱{Number(extra.price).toFixed(2)}
                      </span>
                    </label>
                  );
                })
              ) : (
                <p>No add-ons configured for this product.</p>
              )}
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
                disabled={availableSizes.length === 0}
                style={{
                  ...buttonStyle,
                  background: "#3D2B1F",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  padding: "12px 16px",
                  opacity: availableSizes.length === 0 ? 0.5 : 1,
                }}
              >
                Add to Order
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Pos;
