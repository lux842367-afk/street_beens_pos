
import Card from "../components/card";
import Sidebar from "../components/Sidebar";

const weeklySales = [
  { day: "Mon", sales: 320 },
  { day: "Tue", sales: 450 },
  { day: "Wed", sales: 280 },
  { day: "Thu", sales: 390 },
  { day: "Fri", sales: 500 },
  { day: "Sat", sales: 420 },
  { day: "Sun", sales: 360 },
];

const recentSales = [
  { name: "Caramel Macchiato", quantity: 18, sales: 1620 },
  { name: "Black Americano", quantity: 15, sales: 1350 },
  { name: "Cookies and Cream", quantity: 12, sales: 1080 },
];

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SalesChart() {
  const maxSales = 500;
  const chartWidth = 700;
  const chartHeight = 210;
  const leftPadding = 10;
  const rightPadding = 10;
  const topPadding = 12;
  const bottomPadding = 25;
  const usableWidth = chartWidth - leftPadding - rightPadding;
  const usableHeight = chartHeight - topPadding - bottomPadding;

  const points = weeklySales.map((item, index) => {
    const x =
      leftPadding +
      (index / (weeklySales.length - 1)) * usableWidth;
    const y =
      topPadding + (1 - item.sales / maxSales) * usableHeight;

    return { ...item, x, y };
  });

  const linePoints = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const areaPoints = [
    `${points[0].x},${chartHeight - bottomPadding}`,
    ...points.map((point) => `${point.x},${point.y}`),
    `${points[points.length - 1].x},${chartHeight - bottomPadding}`,
  ].join(" ");

  return (
    <div className="analytics-chart">
      <div className="chart-scale">
        {[500, 400, 300, 200, 100, 0].map((amount) => (
          <span key={amount}>₱{amount}</span>
        ))}
      </div>

      <div className="chart-plot">
        <svg
          className="sales-chart-svg"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="Sample weekly sales chart in pesos"
        >
          {[0, 1, 2, 3, 4, 5].map((line) => {
            const y =
              topPadding + (line / 5) * usableHeight;

            return (
              <line
                key={line}
                x1={leftPadding}
                y1={y}
                x2={chartWidth - rightPadding}
                y2={y}
                className="chart-grid-line"
              />
            );
          })}

          <polygon
            points={areaPoints}
            className="chart-area-fill"
          />

          <polyline
            points={linePoints}
            className="chart-data-line"
          />

          {points.map((point) => (
            <circle
              key={point.day}
              cx={point.x}
              cy={point.y}
              r="4"
              className="chart-data-point"
            />
          ))}
        </svg>

        <div className="chart-labels">
          {weeklySales.map((item) => (
            <span key={item.day}>{item.day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onNavigate, currentUser }) {
  const todaySales = 2480;
  const previousDaySales = 2150;
  const transactionCount = 32;
  const averageOrder = todaySales / transactionCount;

  const salesChange = Math.round(
    ((todaySales - previousDaySales) / previousDaySales) * 100
  );

  return (
    <div className="dashboard-page">
      <Sidebar
        activePage="dashboard"
        onNavigate={onNavigate}
        currentUser={currentUser}
      />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <button className="menu-button" aria-label="Menu">
            <MenuIcon />
          </button>
          <h1>Dashboard</h1>
        </header>

        <section className="dashboard-content">
          <Card
            title="Today's Sales"
            className="dashboard-card analytics-card"
          >
            <div className="dashboard-value">
              ₱
              {todaySales.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>

            <p className="analytics-note">
              <span className="analytics-positive">
                +{salesChange}%
              </span>{" "}
              compared with the previous day
            </p>
          </Card>

          <Card
            title="Total Transactions"
            className="dashboard-card analytics-card"
          >
            <div className="dashboard-value">
              {transactionCount}
            </div>

            <p className="analytics-note">
              Average order: ₱{averageOrder.toFixed(2)}
            </p>

            <button
              className="btn dashboard-history-button"
              onClick={() => onNavigate("transactions")}
            >
              View Transaction History
            </button>
          </Card>

          <Card
            title="Best Seller"
            className="dashboard-card analytics-card"
          >
            <div className="best-seller">
              <strong>Caramel Macchiato</strong>
              <span>18 items sold today</span>
            </div>

            <p className="analytics-note">Top-selling drink</p>
          </Card>

          <Card
            title="Weekly Sales"
            className="dashboard-card chart-card"
          >
            <div className="chart-summary">
              <div>
                <span className="chart-summary-label">
                  Total for the week
                </span>

                <strong>
                  ₱
                  {weeklySales
                    .reduce((total, item) => total + item.sales, 0)
                    .toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                </strong>
              </div>

              <span className="demo-data-label"></span>
            </div>

            <SalesChart />
          </Card>

          <Card
            title="Top-Selling Products"
            className="dashboard-card top-products-card"
          >
            <div className="top-products-list">
              {recentSales.map((product, index) => (
                <div
                  className="top-product-row"
                  key={product.name}
                >
                  <div className="top-product-rank">
                    {index + 1}
                  </div>

                  <div className="top-product-info">
                    <strong>{product.name}</strong>
                    <span>{product.quantity} items sold</span>
                  </div>

                  <strong className="top-product-sales">
                    ₱{product.sales.toLocaleString("en-PH")}
                  </strong>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="Sales Overview"
            className="dashboard-card overview-card"
          >
            <div className="overview-row">
              <span>Weekly transactions</span>
              <strong>186</strong>
            </div>

            <div className="overview-row">
              <span>Average daily sales</span>
              <strong>
                ₱
                {(
                  weeklySales.reduce(
                    (total, item) => total + item.sales,
                    0
                  ) / weeklySales.length
                ).toFixed(2)}
              </strong>
            </div>

            <div className="overview-row">
              <span>Highest sales day</span>
              <strong>Friday</strong>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
