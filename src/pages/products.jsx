
import { useEffect, useState } from "react";
import {
  loadCatalog,
  saveCatalog,
  subscribeCatalog,
  defaultSizes,
  defaultMilkOptions,
  defaultExtras,
} from "../productStore";
import Sidebar from "../components/Sidebar";

function DeleteIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7H20M9 7V4H15V7M6 7L7 20H17L18 7M10 11V16M14 11V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function createProduct(name, price, category) {
  const hasMilk = category === "Iced Coffee" || category === "Non Coffee";

  return {
    name,
    price,
    category,
    available: true,
    hasMilk,
    sizes: defaultSizes.map((item) => ({ ...item })),
    milkOptions: hasMilk
      ? defaultMilkOptions.map((item) => ({ ...item }))
      : [],
    extras: (defaultExtras[category] || []).map((item) => ({ ...item })),
  };
}

function Products({ onNavigate, currentUser }) {
  const [catalog, setCatalog] = useState(() => loadCatalog());

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("90");
  const [productCategory, setProductCategory] = useState(
    () => loadCatalog().categories[0] || ""
  );

  const [newCategoryName, setNewCategoryName] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const categories = catalog.categories || [];
  const allProducts = catalog.products || [];

  useEffect(() => {
    return subscribeCatalog(() => {
      setCatalog(loadCatalog());
    });
  }, []);

  const updateCatalog = (updater) => {
    setCatalog((current) => {
      const updated =
        typeof updater === "function" ? updater(current) : updater;

      saveCatalog(updated);
      return updated;
    });
  };

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesCategory =
      categoryFilter === "All Categories" ||
      product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const resetAddForm = () => {
    setProductName("");
    setProductPrice("90");
    setProductCategory(categories[0] || "");
    setNewCategoryName("");
    setShowNewCategoryInput(false);
    setShowAddProduct(false);
  };

  const handleAddCategory = () => {
    const name = newCategoryName.trim();

    if (!name) {
      window.alert("Please enter a category name.");
      return;
    }

    const existingCategory = categories.find(
      (category) => category.toLowerCase() === name.toLowerCase()
    );

    if (existingCategory) {
      window.alert("This category already exists.");
      setProductCategory(existingCategory);
      return;
    }

    updateCatalog((current) => ({
      ...current,
      categories: [...(current.categories || []), name],
      products: current.products || [],
    }));

    setProductCategory(name);
    setCategoryFilter("All Categories");
    setNewCategoryName("");
    setShowNewCategoryInput(false);
  };

  const handleOpenDeleteCategory = (category) => {
    setDeletingCategory(category);
  };

  const handleCancelDeleteCategory = () => {
    setDeletingCategory(null);
  };

  const handleDeleteCategory = () => {
    if (!deletingCategory) return;

    const categoryToDelete = deletingCategory;

    updateCatalog((current) => ({
      ...current,
      categories: current.categories.filter(
        (category) => category !== categoryToDelete
      ),
      products: current.products.filter(
        (product) => product.category !== categoryToDelete
      ),
    }));

    if (productCategory === categoryToDelete) {
      const remainingCategories = categories.filter(
        (category) => category !== categoryToDelete
      );

      setProductCategory(remainingCategories[0] || "");
    }

    if (
      editingProduct &&
      (editingProduct.category === categoryToDelete ||
        editingProduct.originalCategory === categoryToDelete)
    ) {
      setEditingProduct(null);
    }

    if (categoryFilter === categoryToDelete) {
      setCategoryFilter("All Categories");
    }

    setDeletingCategory(null);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    const name = productName.trim();
    const price = Number(productPrice);

    if (
      !name ||
      productPrice === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      window.alert("Please enter a valid product name and price.");
      return;
    }

    if (!productCategory || !categories.includes(productCategory)) {
      window.alert("Please select a category.");
      return;
    }

    if (
      allProducts.some(
        (product) => product.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      window.alert("A product with this name already exists.");
      return;
    }

    const product = createProduct(name, price, productCategory);

    updateCatalog((current) => ({
      ...current,
      products: [...current.products, product],
    }));

    resetAddForm();
  };

  const handleOpenEdit = (product) => {
    setEditingProduct({
      ...product,
      originalName: product.name,
      originalCategory: product.category,
      name: product.name,
      price: String(product.price),
      sizes: (product.sizes || defaultSizes).map((item) => ({
        ...item,
        price: String(item.price),
      })),
      milkOptions: (product.milkOptions || []).map((item) => ({
        ...item,
        price: String(item.price),
      })),
      extras: (product.extras || []).map((item) => ({
        ...item,
        price: String(item.price),
      })),
    });
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();

    if (!editingProduct) return;

    const name = editingProduct.name.trim();
    const price = Number(editingProduct.price);

    if (
      !name ||
      editingProduct.price === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      window.alert("Please enter a valid product name and price.");
      return;
    }

    if (!categories.includes(editingProduct.category)) {
      window.alert("Please select a valid category.");
      return;
    }

    const duplicate = allProducts.some(
      (product) =>
        product.name.toLowerCase() === name.toLowerCase() &&
        product.name !== editingProduct.originalName
    );

    if (duplicate) {
      window.alert("A product with this name already exists.");
      return;
    }

    const normalizeOptions = (options) =>
      options.map((item) => ({
        name: item.name.trim(),
        price: Number(item.price),
      }));

    const allOptionsValid = [
      ...editingProduct.sizes,
      ...editingProduct.milkOptions,
      ...editingProduct.extras,
    ].every(
      (item) =>
        item.name.trim() !== "" &&
        item.price !== "" &&
        Number.isFinite(Number(item.price)) &&
        Number(item.price) >= 0
    );

    if (!allOptionsValid) {
      window.alert(
        "Please enter a name and valid non-negative price for every option."
      );
      return;
    }

    const updatedProduct = {
      ...editingProduct,
      name,
      price,
      sizes: normalizeOptions(editingProduct.sizes),
      milkOptions: editingProduct.hasMilk
        ? normalizeOptions(editingProduct.milkOptions)
        : [],
      extras: normalizeOptions(editingProduct.extras),
    };

    delete updatedProduct.originalName;
    delete updatedProduct.originalCategory;

    updateCatalog((current) => ({
      ...current,
      products: current.products.map((product) =>
        product.name === editingProduct.originalName
          ? updatedProduct
          : product
      ),
    }));

    setEditingProduct(null);
  };

  const handleToggleAvailability = (product) => {
    updateCatalog((current) => ({
      ...current,
      products: current.products.map((item) =>
        item.name === product.name
          ? { ...item, available: !item.available }
          : item
      ),
    }));
  };

  const handleDeleteProduct = () => {
    if (!deletingProduct) return;

    updateCatalog((current) => ({
      ...current,
      products: current.products.filter(
        (product) => product.name !== deletingProduct.name
      ),
    }));

    setDeletingProduct(null);
  };

  const updateOption = (field, index, property, value) => {
    setEditingProduct((current) => ({
      ...current,
      [field]: current[field].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [property]: value } : item
      ),
    }));
  };

  const addOption = (field) => {
    setEditingProduct((current) => ({
      ...current,
      [field]: [...current[field], { name: "", price: "0" }],
    }));
  };

  const removeOption = (field, index) => {
    setEditingProduct((current) => ({
      ...current,
      [field]: current[field].filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  const renderOptionEditor = (title, field, namePlaceholder) => (
    <div className="product-options-editor">
      <h3>{title}</h3>

      {editingProduct[field].map((option, index) => (
        <div className="product-option-row" key={`${field}-${index}`}>
          <input
            type="text"
            aria-label={`${title} name ${index + 1}`}
            placeholder={namePlaceholder}
            value={option.name}
            onChange={(event) =>
              updateOption(field, index, "name", event.target.value)
            }
            required
          />

          <input
            type="number"
            aria-label={`${title} additional price ${index + 1}`}
            min="0"
            step="0.01"
            placeholder="Additional price"
            value={option.price}
            onChange={(event) =>
              updateOption(field, index, "price", event.target.value)
            }
            required
          />

          <button
            type="button"
            className="delete-product-button"
            onClick={() => removeOption(field, index)}
            aria-label={`Remove ${option.name || title}`}
          >
            <DeleteIcon />
          </button>
        </div>
      ))}

      <button
        type="button"
        className="availability-toggle-button"
        onClick={() => addOption(field)}
      >
        + Add {title.replace(/s$/, "")}
      </button>
    </div>
  );

  return (
    <div className="products-page">
      <Sidebar
        activePage="products"
        onNavigate={onNavigate}
        currentUser={currentUser}
      />

      <main className="products-main">
        <header className="products-header">
          <button
            className="products-back-button"
            onClick={() => onNavigate("dashboard")}
            type="button"
          >
            ←
          </button>
          <h1>Products</h1>
        </header>

        <section className="products-content">
          <div className="products-toolbar">
            <input
              type="search"
              className="products-search"
              placeholder="Search products..."
              aria-label="Search products"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <select
              className="products-category-filter"
              aria-label="Filter products by category"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="All Categories">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <p className="products-result-count">
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>

          {categories
            .filter(
              (category) =>
                categoryFilter === "All Categories" ||
                categoryFilter === category
            )
            .map((category) => {
              const categoryProducts = filteredProducts.filter(
                (product) => product.category === category
              );

              return (
                <section className="product-category" key={category}>
                  <div className="category-heading-row">
                    <h2>{category}</h2>

                    <button
                      type="button"
                      className="delete-category-button"
                      onClick={() => handleOpenDeleteCategory(category)}
                      aria-label={`Delete ${category} category and all its products`}
                    >
                      <DeleteIcon />
                      <span>Delete Category</span>
                    </button>
                  </div>

                  {categoryProducts.length > 0 ? (
                    <div className="product-list">
                      {categoryProducts.map((product) => (
                        <div
                          className={`product-card ${
                            product.available ? "" : "product-unavailable"
                          }`}
                          key={product.name}
                        >
                          <div className="product-information">
                            <h3>{product.name}</h3>
                            <p>{product.category}</p>
                            <strong>
                              ₱{Number(product.price).toFixed(2)}
                            </strong>
                            <span
                              className={`product-status ${
                                product.available
                                  ? "status-available"
                                  : "status-unavailable"
                              }`}
                            >
                              {product.available
                                ? "Available"
                                : "Unavailable"}
                            </span>
                          </div>

                          <div className="product-actions">
                            <button
                              type="button"
                              className="edit-product-button"
                              onClick={() => handleOpenEdit(product)}
                              aria-label={`Edit ${product.name}`}
                            >
                              ✎
                            </button>

                            <button
                              type="button"
                              className="delete-product-button"
                              onClick={() => setDeletingProduct(product)}
                              aria-label={`Delete ${product.name}`}
                            >
                              <DeleteIcon />
                            </button>

                            <button
                              type="button"
                              className="availability-toggle-button"
                              onClick={() => handleToggleAvailability(product)}
                            >
                              {product.available
                                ? "Mark Unavailable"
                                : "Mark Available"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-category-message">
                      {searchTerm.trim()
                        ? "No matching products in this category."
                        : "No products in this category."}
                    </p>
                  )}
                </section>
              );
            })}
        </section>

        <button
          type="button"
          className="add-product-button"
          onClick={() => {
            setProductCategory(categories[0] || "");
            setShowNewCategoryInput(false);
            setNewCategoryName("");
            setShowAddProduct(true);
          }}
        >
          <span>+</span>
          Add Product
        </button>
      </main>

      {showAddProduct && (
        <div className="add-product-overlay">
          <div className="add-product-modal">
            <h2>Add Product</h2>

            <form onSubmit={handleAddProduct}>
              <div className="add-product-field">
                <label htmlFor="new-product-name">Product Name</label>
                <input
                  id="new-product-name"
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  required
                />
              </div>

              <div className="add-product-field">
                <label htmlFor="new-product-price">Base Price</label>
                <input
                  id="new-product-price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter price"
                  value={productPrice}
                  onChange={(event) => setProductPrice(event.target.value)}
                  required
                />
              </div>

              <div className="add-product-field category-quick-management">
                <label>Category</label>

                <div className="category-select-row">
                  <select
                    id="new-product-category"
                    value={productCategory}
                    onChange={(event) => setProductCategory(event.target.value)}
                    required
                    disabled={categories.length === 0}
                  >
                    {categories.length === 0 && (
                      <option value="">Create a category first</option>
                    )}

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="add-category-button"
                    onClick={() =>
                      setShowNewCategoryInput((current) => !current)
                    }
                  >
                    + Add Category
                  </button>
                </div>

                {showNewCategoryInput && (
                  <div className="category-quick-add">
                    <input
                      type="text"
                      aria-label="New category name"
                      placeholder="Enter new category name"
                      value={newCategoryName}
                      onChange={(event) =>
                        setNewCategoryName(event.target.value)
                      }
                    />

                    <div className="add-product-actions">
                      <button
                        type="button"
                        className="cancel-product-button"
                        onClick={() => {
                          setShowNewCategoryInput(false);
                          setNewCategoryName("");
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        className="save-product-button"
                        onClick={handleAddCategory}
                      >
                        Save Category
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="add-product-actions">
                <button
                  type="button"
                  className="cancel-product-button"
                  onClick={resetAddForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-product-button"
                  disabled={categories.length === 0}
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingProduct && (
        <div className="add-product-overlay">
          <div className="add-product-modal product-edit-modal">
            <h2>Edit Product</h2>

            <form onSubmit={handleSaveEdit}>
              <div className="add-product-field">
                <label htmlFor="edit-product-name">Product Name</label>
                <input
                  id="edit-product-name"
                  type="text"
                  value={editingProduct.name}
                  onChange={(event) =>
                    setEditingProduct((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="add-product-field">
                <label htmlFor="edit-product-price">Base Price</label>
                <input
                  id="edit-product-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(event) =>
                    setEditingProduct((current) => ({
                      ...current,
                      price: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="add-product-field">
                <label htmlFor="edit-product-category">Category</label>
                <select
                  id="edit-product-category"
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

              <div className="add-product-field">
                <label htmlFor="edit-product-availability">
                  Availability
                </label>
                <select
                  id="edit-product-availability"
                  value={String(editingProduct.available !== false)}
                  onChange={(event) =>
                    setEditingProduct((current) => ({
                      ...current,
                      available: event.target.value === "true",
                    }))
                  }
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
              </div>

              <div className="add-product-field">
                <label htmlFor="edit-product-milk">Milk Customization</label>
                <select
                  id="edit-product-milk"
                  value={String(Boolean(editingProduct.hasMilk))}
                  onChange={(event) =>
                    setEditingProduct((current) => ({
                      ...current,
                      hasMilk: event.target.value === "true",
                      milkOptions:
                        event.target.value === "true" &&
                        current.milkOptions.length === 0
                          ? defaultMilkOptions.map((item) => ({
                              ...item,
                              price: String(item.price),
                            }))
                          : current.milkOptions,
                    }))
                  }
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>

              <p className="product-form-note">
                Size, milk, and add-on prices are additional charges on top of
                the base price.
              </p>

              {renderOptionEditor("Sizes", "sizes", "Size name")}

              {editingProduct.hasMilk &&
                renderOptionEditor(
                  "Milk Options",
                  "milkOptions",
                  "Milk option name"
                )}

              {renderOptionEditor("Add-ons", "extras", "Add-on name")}

              <div className="add-product-actions">
                <button
                  type="button"
                  className="cancel-product-button"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-product-button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                onClick={() => setDeletingProduct(null)}
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

      {deletingCategory && (
        <div className="add-product-overlay">
          <div className="add-product-modal delete-confirmation-modal">
            <h2>Delete Category?</h2>

            <p className="delete-confirmation-text">
              Delete the <strong>{deletingCategory}</strong> category and all{" "}
              <strong>
                {
                  allProducts.filter(
                    (product) => product.category === deletingCategory
                  ).length
                }{" "}
                product(s)
              </strong>{" "}
              inside it? This cannot be undone.
            </p>

            <div className="add-product-actions">
              <button
                type="button"
                className="cancel-product-button"
                onClick={handleCancelDeleteCategory}
              >
                Cancel
              </button>

              <button
                type="button"
                className="save-product-button"
                onClick={handleDeleteCategory}
              >
                Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
