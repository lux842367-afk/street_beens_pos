
import { useMemo, useState } from "react";
import "./reports.css";
import Sidebar from "../components/Sidebar";

const UNIT_PRICE = 90;

const transactions = [
  {
    id: 1,
    products: [
      { name: "Black Americano", quantity: 2 },
      { name: "Cappuccino", quantity: 1 },
    ],
    date: "2026-09-28",
    time: "10:15 AM",
    total: 270,
  },
  {
    id: 2,
    products: [
      { name: "Caramel Macchiato", quantity: 1 },
      { name: "Milky Oreo", quantity: 2 },
    ],
    date: "2026-09-28",
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
    date: "2026-09-27",
    time: "2:45 PM",
    total: 360,
  },
  {
    id: 4,
    products: [
      { name: "Mocha Caramel", quantity: 1 },
      { name: "Cookies and Cream", quantity: 1 },
    ],
    date: "2026-09-27",
    time: "4:20 PM",
    total: 180,
  },
];

const productCategories = {
  "Black Americano": "Iced Coffee",
  Cappuccino: "Iced Coffee",
  "Caramel Macchiato": "Iced Coffee",
  "Mocha Caramel": "Iced Coffee",
  "Milky Oreo": "Non Coffee",
  "Strawberry Oreo": "Non Coffee",
  "Cookies and Cream": "Non Coffee",
  "White Caramel": "Non Coffee",
  "Blue Berry": "Fruity Soda",
  "Green Apple": "Fruity Soda",
  Strawberry: "Fruity Soda",
  Grapes: "Fruity Soda",
};

const categories = ["Iced Coffee", "Non Coffee", "Fruity Soda"];

const allProducts = Object.keys(productCategories).sort((a, b) =>
  a.localeCompare(b)
);

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateString) {
  if (!dateString) return "—";

  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getLocalISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getPeriodDates(period) {
  const today = new Date();
  const todayString = getLocalISODate(today);

  if (period === "Today") {
    return { start: todayString, end: todayString };
  }

  if (period === "This Week") {
    const monday = new Date(today);
    const day = monday.getDay();

    monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1));

    return {
      start: getLocalISODate(monday),
      end: todayString,
    };
  }

  if (period === "This Month") {
    return {
      start: `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-01`,
      end: todayString,
    };
  }

  if (period === "Last 30 Days") {
    const start = new Date(today);
    start.setDate(start.getDate() - 29);

    return {
      start: getLocalISODate(start),
      end: todayString,
    };
  }

  return { start: "", end: "" };
}

function Reports({ onNavigate, currentUser }) {
  const [period, setPeriod] = useState("All Time");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [product, setProduct] = useState("All Products");

  const availableProducts = useMemo(() => {
    if (category === "All Categories") return allProducts;

    return allProducts.filter(
      (name) => productCategories[name] === category
    );
  }, [category]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        if (startDate && transaction.date < startDate) return false;
        if (endDate && transaction.date > endDate) return false;

        return true;
      })
      .map((transaction) => {
        const matchingProducts = transaction.products.filter((item) => {
          const itemCategory = productCategories[item.name];

          const matchesCategory =
            category === "All Categories" || itemCategory === category;

          const matchesProduct =
            product === "All Products" || item.name === product;

          return matchesCategory && matchesProduct;
        });

        return {
          ...transaction,
          products: matchingProducts,
          filteredTotal: matchingProducts.reduce(
            (sum, item) => sum + item.quantity * UNIT_PRICE,
            0
          ),
        };
      })
      .filter((transaction) => transaction.products.length > 0)
      .sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return b.id - a.id;
      });
  }, [startDate, endDate, category, product]);

  const reportStats = useMemo(() => {
    const productTotals = {};

    let sales = 0;
    let itemsSold = 0;

    filteredTransactions.forEach((transaction) => {
      transaction.products.forEach((item) => {
        const subtotal = item.quantity * UNIT_PRICE;

        sales += subtotal;
        itemsSold += item.quantity;

        if (!productTotals[item.name]) {
          productTotals[item.name] = {
            name: item.name,
            category: productCategories[item.name],
            quantity: 0,
            sales: 0,
          };
        }

        productTotals[item.name].quantity += item.quantity;
        productTotals[item.name].sales += subtotal;
      });
    });

    const bestSeller = Object.values(productTotals).sort(
      (a, b) => b.quantity - a.quantity || b.sales - a.sales
    )[0];

    return {
      sales,
      itemsSold,
      transactionCount: filteredTransactions.length,
      bestSeller,
    };
  }, [filteredTransactions]);

  const dailySales = useMemo(() => {
    const totals = {};

    filteredTransactions.forEach((transaction) => {
      totals[transaction.date] =
        (totals[transaction.date] || 0) + transaction.filteredTotal;
    });

    return Object.entries(totals)
      .map(([date, sales]) => ({ date, sales }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-7);
  }, [filteredTransactions]);

  const maxDailySales = Math.max(...dailySales.map((day) => day.sales), 1);

  function handlePeriodChange(nextPeriod) {
    setPeriod(nextPeriod);

    const dates = getPeriodDates(nextPeriod);
    setStartDate(dates.start);
    setEndDate(dates.end);
  }

  function handleCategoryChange(nextCategory) {
    setCategory(nextCategory);
    setProduct("All Products");
  }

  function resetFilters() {
    setPeriod("All Time");
    setStartDate("");
    setEndDate("");
    setCategory("All Categories");
    setProduct("All Products");
  }

  function escapeCSV(value) {
    const stringValue = String(value ?? "");
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  function exportCSV() {
    const rows = [
      [
        "Transaction ID",
        "Date",
        "Time",
        "Product",
        "Category",
        "Quantity",
        "Unit Price",
        "Subtotal",
      ],
    ];

    filteredTransactions.forEach((transaction) => {
      transaction.products.forEach((item) => {
        rows.push([
          transaction.id,
          transaction.date,
          transaction.time,
          item.name,
          productCategories[item.name],
          item.quantity,
          UNIT_PRICE.toFixed(2),
          (item.quantity * UNIT_PRICE).toFixed(2),
        ]);
      });
    });

    rows.push([]);
    rows.push([
      "Report Total",
      "",
      "",
      "",
      "",
      "",
      "",
      reportStats.sales.toFixed(2),
    ]);
    rows.push(["Transactions", reportStats.transactionCount]);
    rows.push(["Items Sold", reportStats.itemsSold]);

    const csvContent =
      "\uFEFF" + rows.map((row) => row.map(escapeCSV).join(",")).join("\r\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `street-beans-report-${getLocalISODate(new Date())}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportPDF() {
    window.print();
  }

  const periodDescription =
    startDate || endDate
      ? `${startDate ? formatDate(startDate) : "Beginning"} to ${
          endDate ? formatDate(endDate) : "Present"
        }`
      : "All recorded dates";

  return (
    <div className="reports-page">
      <Sidebar
        activePage="reports"
        onNavigate={onNavigate}
        currentUser={currentUser}
      />

      <main className="reports-main">
        <header className="reports-header">
          <button
            className="reports-back-button"
            onClick={() => onNavigate("dashboard")}
            aria-label="Back to dashboard"
            type="button"
          >
            ←
          </button>

          <h1>Reports</h1>
        </header>

        <section className="reports-content">
          <section className="report-filter-section">
            <div className="section-heading">
              <div>
                <h2>Report Filters</h2>
                <p>Choose which sales data you want to view.</p>
              </div>

              <button
                className="reset-filters-button"
                onClick={resetFilters}
                type="button"
              >
                Reset Filters
              </button>
            </div>

            <div className="period-presets">
              {[
                "All Time",
                "Today",
                "This Week",
                "This Month",
                "Last 30 Days",
              ].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`period-button ${
                    period === option ? "active" : ""
                  }`}
                  onClick={() => handlePeriodChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="report-filter-grid">
              <div className="report-filter-field">
                <label htmlFor="report-start-date">From date</label>
                <input
                  id="report-start-date"
                  type="date"
                  value={startDate}
                  max={endDate || undefined}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                    setPeriod("");
                  }}
                />
              </div>

              <div className="report-filter-field">
                <label htmlFor="report-end-date">To date</label>
                <input
                  id="report-end-date"
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => {
                    setEndDate(event.target.value);
                    setPeriod("");
                  }}
                />
              </div>

              <div className="report-filter-field">
                <label htmlFor="report-category">Product category</label>
                <select
                  id="report-category"
                  value={category}
                  onChange={(event) =>
                    handleCategoryChange(event.target.value)
                  }
                >
                  <option>All Categories</option>
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="report-filter-field">
                <label htmlFor="report-product">Specific product</label>
                <select
                  id="report-product"
                  value={product}
                  onChange={(event) => setProduct(event.target.value)}
                >
                  <option>All Products</option>
                  {availableProducts.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="report-summary-section">
            <div className="section-heading">
              <div>
                <h2>Sales Overview</h2>
                <p>{periodDescription}</p>
              </div>

              <span className="report-record-count">
                {reportStats.transactionCount} matching transactions
              </span>
            </div>

            <div className="reports-cards">
              <article className="report-card">
                <h3>Total Sales</h3>
                <div className="report-value">
                  {formatCurrency(reportStats.sales)}
                </div>
                <p>Based on selected filters</p>
              </article>

              <article className="report-card">
                <h3>Total Transactions</h3>
                <div className="report-value">
                  {reportStats.transactionCount}
                </div>
                <button
                  className="view-history-button"
                  onClick={() => onNavigate("transactions")}
                  type="button"
                >
                  View History
                </button>
              </article>

              <article className="report-card">
                <h3>Items Sold</h3>
                <div className="report-value">{reportStats.itemsSold}</div>
                <p>Total quantity of matching products</p>
              </article>

              <article className="report-card">
                <h3>Best Seller</h3>
                <div className="report-best-seller">
                  <strong>
                    {reportStats.bestSeller?.name || "No sales found"}
                  </strong>
                  <span>
                    {reportStats.bestSeller
                      ? `${reportStats.bestSeller.quantity} items sold`
                      : "Try changing the filters"}
                  </span>
                </div>
              </article>
            </div>
          </section>

          <section className="report-chart-card">
            <div className="section-heading">
              <div>
                <h2>Sales by Date</h2>
                <p>Sales totals for dates with matching transactions.</p>
              </div>
            </div>

            {dailySales.length === 0 ? (
              <div className="report-empty-state">
                No sales data matches the selected filters.
              </div>
            ) : (
              <div className="report-bar-chart">
                {dailySales.map((day) => (
                  <div className="report-bar-column" key={day.date}>
                    <span className="report-bar-value">
                      {formatCurrency(day.sales)}
                    </span>

                    <div className="report-bar-track">
                      <div
                        className="report-bar"
                        style={{
                          height: `${Math.max(
                            (day.sales / maxDailySales) * 100,
                            3
                          )}%`,
                        }}
                        title={`${formatDate(day.date)}: ${formatCurrency(
                          day.sales
                        )}`}
                      />
                    </div>

                    <span className="report-bar-label">
                      {new Date(`${day.date}T00:00:00`).toLocaleDateString(
                        "en-PH",
                        { month: "short", day: "numeric" }
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="report-data-section">
            <div className="section-heading report-data-heading">
              <div>
                <h2>Transaction History</h2>
                <p>
                  {filteredTransactions.length === 0
                    ? "No records found for the current filters."
                    : "The table reflects your current filters."}
                </p>
              </div>

              <div className="report-export-actions">
                <button
                  className="export-button"
                  onClick={exportCSV}
                  disabled={filteredTransactions.length === 0}
                  type="button"
                >
                  Export CSV
                </button>

                <button
                  className="export-button primary"
                  onClick={exportPDF}
                  disabled={filteredTransactions.length === 0}
                  type="button"
                >
                  Export PDF
                </button>
              </div>
            </div>

            <div className="report-table-wrap">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Transaction</th>
                    <th>Date and Time</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Qty.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransactions.flatMap((transaction) =>
                    transaction.products.map((item) => (
                      <tr key={`${transaction.id}-${item.name}`}>
                        <td>#{transaction.id}</td>
                        <td>
                          {formatDate(transaction.date)}
                          <span className="table-subtext">
                            {transaction.time}
                          </span>
                        </td>
                        <td>{item.name}</td>
                        <td>{productCategories[item.name]}</td>
                        <td>{item.quantity}</td>
                        <td>
                          {formatCurrency(item.quantity * UNIT_PRICE)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {filteredTransactions.length === 0 && (
                <div className="report-empty-state">
                  No matching records to display.
                </div>
              )}
            </div>

            <div className="report-table-footer">
              <span>
                {reportStats.itemsSold} items across{" "}
                {reportStats.transactionCount} transactions
              </span>
              <strong>{formatCurrency(reportStats.sales)}</strong>
            </div>
          </section>

          <p className="report-data-note">
            Note: This version uses the sample transaction records and assumes
            a unit price of ₱90 per drink. Connect it to the actual POS
            transaction data before using it for official sales reports.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Reports;
