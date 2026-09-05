import { useState } from "react";
import Button from "../components/button";

function CoffeeLogo() {
  return (
    <svg
      className="coffee-logo"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Coffee mug logo"
    >
      {/* Steam */}
      <path
        d="M42 32 C34 24, 50 20, 42 11"
        fill="none"
        stroke="#3D2B1F"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M60 32 C52 24, 68 20, 60 11"
        fill="none"
        stroke="#3D2B1F"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M78 32 C70 24, 86 20, 78 11"
        fill="none"
        stroke="#3D2B1F"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Mug */}
      <path
        d="M25 39 H91 V73 C91 88, 80 96, 58 96 C36 96, 25 88, 25 73 Z"
        fill="none"
        stroke="#3D2B1F"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Mug handle */}
      <path
        d="M91 50 H99 C108 50, 108 72, 99 72 H91"
        fill="none"
        stroke="#3D2B1F"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Saucer */}
      <path
        d="M18 100 H98"
        fill="none"
        stroke="#3D2B1F"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <main className="login-page">
      <section className="login-container">

        <div className="brand">
          <h1>Street Beans Café</h1>

          <CoffeeLogo />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit">
            Log In
          </Button>

        </form>

      </section>
    </main>
  );
}

export default Login;