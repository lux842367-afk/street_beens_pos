
import { useState } from "react";
import Button from "../components/button";

function CoffeeLogo() {
  return (
    <svg
      className="coffee-logo"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Coffee mug logo"
    >
      <path
        d="M22 37 H66 V67 C66 78 58 84 44 84 C30 84 22 78 22 67 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M66 44 H74 C84 44 84 61 74 61 H66"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M34 27 C27 20 38 17 34 9 M48 27 C41 20 52 17 48 9 M60 27 C53 20 64 17 60 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M18 89 H78"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Login({ onLogin, onResetPassword }) {
  const [isRecovering, setIsRecovering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    if (isRecovering) {
      if (newPassword.trim().length < 4) {
        setMessage("New password must contain at least 4 characters.");
        setIsError(true);
        return;
      }

      const success = onLogin(username, password);

      if (success) {
        setMessage("Password reset successfully. You can now log in.");
        setIsError(false);
        setPassword("");
        setNewPassword("");
        setIsRecovering(false);
      } else {
        setMessage("Account not found. Please check the username.");
        setIsError(true);
      }

      return;
    }

    const success = onLogin(username, password);

    if (!success) {
      setMessage("Invalid username or password.");
      setIsError(true);
    }
  };

  const handleRecoveryToggle = () => {
    setIsRecovering((previous) => !previous);
    setMessage("");
    setPassword("");
    setNewPassword("");
  };

  return (
    <main className="login-page">
      <section className="login-container">
        <div className="brand">
          <h1>Street Beans Café</h1>
          <CoffeeLogo />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>
            {isRecovering ? "Reset Password" : "Log In"}
          </h2>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          {isRecovering ? (
            <div className="input-group">
              <label htmlFor="new-password">New Password</label>
              <input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                minLength={4}
                required
              />
            </div>
          ) : (
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          )}

          {message && (
            <p
              role="alert"
              style={{
                color: isError ? "#b3261e" : "#387443",
                fontSize: "14px",
                margin: "0",
              }}
            >
              {message}
            </p>
          )}

          <Button type="submit">
            {isRecovering ? "Reset Password" : "Log In"}
          </Button>

          <button
            type="button"
            onClick={handleRecoveryToggle}
            style={{
              width: "100%",
              marginTop: "12px",
              padding: "8px",
              border: "none",
              background: "transparent",
              color: "#3D2B1F",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isRecovering ? "Back to Log In" : "Forgot Password?"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
