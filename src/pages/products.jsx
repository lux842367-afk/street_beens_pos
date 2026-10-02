import { useState } from "react";

const initialProducts = {
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

function DeleteIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 7V4H15V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 7L7 20H17L18 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 11V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 11V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Products({ onNavigate }) {
  const [products, setProducts] = useState(initialProducts);

  const [showAddProduct, setShowAddProduct] = useState(false);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("Iced Coffee");

  const [editingProduct, setEditingProduct] = useState(null);

  const [deletingProduct, setDeletingProduct] = useState(null);

  const categories = ["Iced Coffee", "Non Coffee", "Fruity Soda"];

  const handleAddProduct = (event) => {
    event.preventDefault();

    if (!productName.trim() || !productPrice) {
      return;
    }

    const newProduct = {
      name: productName.trim(),
      price: Number(productPrice),
    };

    setProducts((current) => ({
      ...current,
      [productCategory]: [...current[productCategory], newProduct],
    }));

    setProductName("");
    setProductPrice("");
    setProductCategory("Iced Coffee");
    setShowAddProduct(false);
  };

  const handleCancelAdd = () => {
    setProductName("");
    setProductPrice("");
    setProductCategory("Iced Coffee");
    setShowAddProduct(false);
  };

  const handleOpenEdit = (product, category) => {
    setEditingProduct({
      originalName: product.name,
      originalCategory: category,
      name: product.name,
      price: product.price,
      category: category,
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();

    if (!editingProduct.name.trim() || !editingProduct.price) {
      return;
    }

    const updatedProduct = {
      name: editingProduct.name.trim(),
      price: Number(editingProduct.price),
    };

    setProducts((current) => {
      const updated = { ...current };

      updated[editingProduct.originalCategory] = updated[
        editingProduct.originalCategory
      ].filter(
        (product) => product.name !== editingProduct.originalName
      );

      updated[editingProduct.category] = [
        ...updated[editingProduct.category],
        updatedProduct,
      ];

      return updated;
    });

    setEditingProduct(null);
  };

  const handleOpenDelete = (product, category) => {
    setDeletingProduct({
      name: product.name,
      category: category,
    });
  };

  const handleCancelDelete = () => {
    setDeletingProduct(null);
  };

  const handleDeleteProduct = () => {
    if (!deletingProduct) {
      return;
    }

    setProducts((current) => {
      const updated = { ...current };

      updated[deletingProduct.category] = updated[
        deletingProduct.category
      ].filter(
        (product) => product.name !== deletingProduct.name
      );

      return updated;
    });

    setDeletingProduct(null);
  };

  return (
    <div className="products-page">

      {/* DESKTOP SIDEBAR */}
      <aside className="dashboard-sidebar">
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

      {/* MAIN CONTENT */}
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
          {categories.map((category) => (
            <section className="product-category" key={category}>
              <h2>{category}</h2>

              <div className="product-list">
                {products[category].map((product) => (
                  <div className="product-card" key={product.name}>
                    <div className="product-information">
                      <h3>{product.name}</h3>
                      <p>{category}</p>
                      <strong>₱{product.price}</strong>
                    </div>

                    <div className="product-actions">
                      <button
                        className="edit-product-button"
                        onClick={() =>
                          handleOpenEdit(product, category)
                        }
                        aria-label={`Edit ${product.name}`}
                      >
                        ✎
                      </button>

                      <button
                        className="delete-product-button"
                        onClick={() =>
                          handleOpenDelete(product, category)
                        }
                        aria-label={`Delete ${product.name}`}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </section>

        {/* ADD PRODUCT BUTTON */}
        <button
          className="add-product-button"
          onClick={() => setShowAddProduct(true)}
        >
          <span>+</span>
          Add Product
        </button>
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

      {/* ADD PRODUCT FRAME */}
      {showAddProduct && (
        <div className="add-product-overlay">
          <div className="add-product-modal">
            <h2>Add Product</h2>

            <form onSubmit={handleAddProduct}>
              <div className="add-product-field">
                <label>Product Name</label>

                <input
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(event) =>
                    setProductName(event.target.value)
                  }
                />
              </div>

              <div className="add-product-field">
                <label>Price</label>

                <input
                  type="number"
                  min="0"
                  placeholder="Enter price"
                  value={productPrice}
                  onChange={(event) =>
                    setProductPrice(event.target.value)
                  }
                />
              </div>

              <div className="add-product-field">
                <label>Category</label>

                <select
                  value={productCategory}
                  onChange={(event) =>
                    setProductCategory(event.target.value)
                  }
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="add-product-actions">
                <button
                  type="button"
                  className="cancel-product-button"
                  onClick={handleCancelAdd}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-product-button"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT FRAME */}
      {editingProduct && (
        <div className="add-product-overlay">
          <div className="add-product-modal">
            <h2>Edit Product</h2>

            <form onSubmit={handleSaveEdit}>
              <div className="add-product-field">
                <label>Product Name</label>

                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(event) =>
                    setEditingProduct((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="add-product-field">
                <label>Price</label>

                <input
                  type="number"
                  min="0"
                  value={editingProduct.price}
                  onChange={(event) =>
                    setEditingProduct((current) => ({
                      ...current,
                      price: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="add-product-field">
                <label>Category</label>

                <select
                  value={editingProduct.category}
                  onChange={(event) =>
                    setEditingProduct((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="add-product-actions">
                <button
                  type="button"
                  className="cancel-product-button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-product-button"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION FRAME */}
      {deletingProduct && (
        <div className="add-product-overlay">
          <div className="add-product-modal delete-confirmation-modal">
            <h2>Are you sure?</h2>

            <p className="delete-confirmation-text">
              Are you sure you want to delete{" "}
              <strong>{deletingProduct.name}</strong>?
            </p>

            <div className="add-product-actions">
              <button
                type="button"
                className="cancel-product-button"
                onClick={handleCancelDelete}
              >
                No
              </button>

              <button
                type="button"
                className="save-product-button"
                onClick={handleDeleteProduct}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;