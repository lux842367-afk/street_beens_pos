import { useState } from "react";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Pos from "./pages/pos";
import Products from "./pages/products";
import Reports from "./pages/reports";
import Transactions from "./pages/transactions";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  if (currentPage === "login") {
    return <Login onLogin={() => handleNavigation("dashboard")} />;
  }

  if (currentPage === "dashboard") {
    return <Dashboard onNavigate={handleNavigation} />;
  }

  if (currentPage === "pos") {
    return <Pos onNavigate={handleNavigation} />;
  }

  if (currentPage === "products") {
    return <Products onNavigate={handleNavigation} />;
  }

  if (currentPage === "reports") {
    return <Reports onNavigate={handleNavigation} />;
  }

  if (currentPage === "transactions") {
    return <Transactions onNavigate={handleNavigation} />;
  }

  return (
    <div>
      <h1>Page Under Development</h1>
      <button onClick={() => handleNavigation("dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default App;