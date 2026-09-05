import { useState } from "react";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

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

  // Temporary fallback for pages we haven't built yet
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