import { useState } from "react";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Pos from "./pages/pos";

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