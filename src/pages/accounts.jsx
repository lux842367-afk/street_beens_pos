
import { useState } from "react";
import Button from "../components/button";
import Sidebar from "../components/Sidebar";

function Accounts({
  onNavigate,
  currentUser,
  accounts,
  onAccountsUpdate,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Staff");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  if (!currentUser || currentUser.role !== "Admin") {
    return (
      <div className="dashboard-page">
        <main className="dashboard-main">
          <h2>Access Denied</h2>
          <p>Only administrators can manage accounts.</p>
          <Button onClick={() => onNavigate("dashboard")}>
            Back to Dashboard
          </Button>
        </main>
      </div>
    );
  }

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setUsername("");
    setPassword("");
    setRole("Staff");
    setMessage("");
    setIsError(false);
  };

  const startAdd = () => {
    resetForm();
    setShowForm(true);
  };

  const startEdit = (account) => {
    setEditingId(account.id);
    setUsername(account.username);
    setPassword("");
    setRole(account.role);
    setMessage("");
    setIsError(false);
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    const cleanUsername = username.trim();

    if (!cleanUsername) {
      setMessage("Please enter a username.");
      setIsError(true);
      return;
    }

    const duplicate = accounts.some(
      (account) =>
        account.username.toLowerCase() ===
          cleanUsername.toLowerCase() &&
        account.id !== editingId
    );

    if (duplicate) {
      setMessage("That username is already in use.");
      setIsError(true);
      return;
    }

    if (editingId === null && !password.trim()) {
      setMessage("Please enter a password.");
      setIsError(true);
      return;
    }

    if (password.trim() && password.trim().length < 4) {
      setMessage("Password must contain at least 4 characters.");
      setIsError(true);
      return;
    }

    let updatedAccounts;

    if (editingId !== null) {
      updatedAccounts = accounts.map((account) =>
        account.id === editingId
          ? {
              ...account,
              username: cleanUsername,
              role,
              ...(password.trim()
                ? { password: password.trim() }
                : {}),
            }
          : account
      );
    } else {
      updatedAccounts = [
        ...accounts,
        {
          id: Date.now(),
          username: cleanUsername,
          password: password.trim(),
          role,
        },
      ];
    }

    onAccountsUpdate(updatedAccounts);

    setMessage(
      editingId !== null
        ? "Account updated successfully."
        : "Account added successfully."
    );
    setIsError(false);

    setShowForm(false);
    setEditingId(null);
    setUsername("");
    setPassword("");
    setRole("Staff");
  };

  const handleDelete = (account) => {
    if (account.id === currentUser.id) {
      setMessage("You cannot delete your currently logged-in account.");
      setIsError(true);
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete the account "${account.username}"?`
    );

    if (!confirmed) return;

    onAccountsUpdate(
      accounts.filter((item) => item.id !== account.id)
    );

    setMessage(
      `Account "${account.username}" deleted successfully.`
    );
    setIsError(false);
  };

  return (
    <div className="dashboard-page">
      <Sidebar
        activePage="accounts"
        onNavigate={onNavigate}
        currentUser={currentUser}
      />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Account Management</h1>
            <p>Manage administrator and staff accounts.</p>
          </div>
        </header>

        <section className="dashboard-content">
          <div className="dashboard-card">
            <h2>Accounts</h2>
            <p>Total accounts: {accounts.length}</p>
            <Button onClick={startAdd}>+ Add Account</Button>
          </div>

          {message && (
            <p
              role="status"
              style={{
                color: isError ? "#b3261e" : "#387443",
                margin: "12px 0",
              }}
            >
              {message}
            </p>
          )}

          {showForm && (
            <div className="dashboard-card">
              <h2>
                {editingId !== null ? "Edit Account" : "Add Account"}
              </h2>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="account-username">Username</label>
                  <input
                    id="account-username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="account-password">
                    Password
                    {editingId !== null &&
                      " (leave blank to keep current)"}
                  </label>
                  <input
                    id="account-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={
                      editingId !== null
                        ? "Enter a new password (optional)"
                        : "Enter password"
                    }
                    minLength={4}
                    required={editingId === null}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="account-role">Role</label>
                  <select
                    id="account-role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    style={{
                      width: "100%",
                      minHeight: "40px",
                      padding: "8px",
                      borderRadius: "5px",
                      border: "1px solid #AD907D",
                      background: "#fff",
                      color: "#3D2B1F",
                    }}
                  >
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <Button type="submit">
                  {editingId !== null
                    ? "Save Changes"
                    : "Create Account"}
                </Button>

                <Button
                  type="button"
                  className="secondary-button"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </form>
            </div>
          )}

          <div className="dashboard-card">
            <h2>Account List</h2>

            {accounts.length === 0 ? (
              <p>No accounts have been created.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "12px",
                    textAlign: "left",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ padding: "10px" }}>Username</th>
                      <th style={{ padding: "10px" }}>Role</th>
                      <th style={{ padding: "10px" }}>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {accounts.map((account) => (
                      <tr key={account.id}>
                        <td
                          style={{
                            padding: "10px",
                            borderTop: "1px solid #AD907D",
                          }}
                        >
                          {account.username}
                          {account.id === currentUser.id && " (You)"}
                        </td>

                        <td
                          style={{
                            padding: "10px",
                            borderTop: "1px solid #AD907D",
                          }}
                        >
                          {account.role}
                        </td>

                        <td
                          style={{
                            padding: "10px",
                            borderTop: "1px solid #AD907D",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "6px",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => startEdit(account)}
                              style={{
                                cursor: "pointer",
                                padding: "6px",
                              }}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(account)}
                              disabled={account.id === currentUser.id}
                              style={{
                                cursor:
                                  account.id === currentUser.id
                                    ? "not-allowed"
                                    : "pointer",
                                padding: "6px",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Accounts;
