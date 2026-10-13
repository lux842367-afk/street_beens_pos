
import { useState } from "react";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Pos from "./pages/pos";
import Products from "./pages/products";
import Reports from "./pages/reports";
import Transactions from "./pages/transactions";
import Accounts from "./pages/accounts";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      username: "admin",
      password: "admin123",
      role: "Admin",
    },
    {
      id: 2,
      username: "staff",
      password: "staff123",
      role: "Staff",
    },
  ]);

  const handleNavigation = (page) => {
    if (page === "login") {
      setCurrentUser(null);
      setCurrentPage("login");
      return;
    }

    if (page === "accounts" && currentUser?.role !== "Admin") {
      setCurrentPage("dashboard");
      return;
    }

    setCurrentPage(page);
  };

  const handleLogin = (username, password) => {
    const normalizedUsername = username.trim().toLowerCase();

    const account = accounts.find(
      (item) =>
        item.username.toLowerCase() === normalizedUsername &&
        item.password === password
    );

    if (!account) {
      return false;
    }

    setCurrentUser({
      id: account.id,
      username: account.username,
      role: account.role,
    });

    setCurrentPage("dashboard");

    return true;
  };

  const handlePasswordReset = (username, newPassword) => {
    const normalizedUsername = username.trim().toLowerCase();

    if (!normalizedUsername || !newPassword.trim()) {
      return false;
    }

    const accountExists = accounts.some(
      (item) => item.username.toLowerCase() === normalizedUsername
    );

    if (!accountExists) {
      return false;
    }

    setAccounts((previousAccounts) =>
      previousAccounts.map((item) =>
        item.username.toLowerCase() === normalizedUsername
          ? { ...item, password: newPassword }
          : item
      )
    );

    return true;
  };

  const handleAccountsUpdate = (updatedAccounts) => {
    setAccounts(updatedAccounts);

    // If the currently logged-in account was removed,
    // return to the login page.
    if (
      currentUser &&
      !updatedAccounts.some((account) => account.id === currentUser.id)
    ) {
      setCurrentUser(null);
      setCurrentPage("login");
    }
  };

  if (currentPage === "login" || !currentUser) {
    return (
      <Login
        onLogin={handleLogin}
        onResetPassword={handlePasswordReset}
      />
    );
  }

  switch (currentPage) {
    case "dashboard":
      return (
        <Dashboard
          onNavigate={handleNavigation}
          currentUser={currentUser}
        />
      );

    case "pos":
      return (
        <Pos
          onNavigate={handleNavigation}
          currentUser={currentUser}
        />
      );

    case "products":
      return (
        <Products
          onNavigate={handleNavigation}
          currentUser={currentUser}
        />
      );

    case "reports":
      return (
        <Reports
          onNavigate={handleNavigation}
          currentUser={currentUser}
        />
      );

    case "transactions":
      return (
        <Transactions
          onNavigate={handleNavigation}
          currentUser={currentUser}
        />
      );

    case "accounts":
      if (currentUser.role !== "Admin") {
        return (
          <Dashboard
            onNavigate={handleNavigation}
            currentUser={currentUser}
          />
        );
      }

      return (
        <Accounts
          onNavigate={handleNavigation}
          currentUser={currentUser}
          accounts={accounts}
          onAccountsUpdate={handleAccountsUpdate}
        />
      );

    default:
      return (
        <div>
          <h1>Page Under Development</h1>
          <button
            type="button"
            onClick={() => handleNavigation("dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      );
  }
}

export default App;
