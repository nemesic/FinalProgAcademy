import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Account() {
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("account_logged_in") === "true";
  });
  const [toast, setToast] = useState("");
  const toastTimeout = useRef();
  const redirectTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/";
  const fromCheckout = location.state?.fromCheckout;

  function showToast(msg) {
    setToast(msg);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(""), 1800);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.login.trim() || !form.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.login === "admin" && form.password === "12345") {
      setLoggedIn(true);
      setError("");
      localStorage.setItem("account_logged_in", "true");
      navigate("/account", {
        replace: true,
        state: {
          justLoggedIn: true,
          redirectTo,
          fromCheckout,
        },
      });
      showToast("You are logged in");
    } else {
      setError("Invalid login or password.");
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("account_logged_in");
    setForm({ login: "", password: "" });
    setError("");
    if (redirectTimer.current) clearTimeout(redirectTimer.current);
    navigate("/account", { replace: true });
  }

  useEffect(() => {
    if (loggedIn && window.location.pathname === "/account" && location.state?.justLoggedIn) {
      redirectTimer.current = setTimeout(() => {
        navigate(location.state?.redirectTo || "/", {
          replace: true,
          state: location.state?.fromCheckout ? { afterLoginCheckout: true } : null,
        });
      }, location.state?.fromCheckout ? 900 : 1500);
      return () => clearTimeout(redirectTimer.current);
    }
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, [loggedIn, navigate, location.state]);

  return (
    <div className="account-page">
      <div className="account-card animate-account-fade-in">
        {!loggedIn ? (
          <>
            <div className="page-eyebrow">Account</div>
            <h1 className="account-title">SIGN IN TO YOUR ACCOUNT</h1>
            <div className="account-subtitle">Secure your checkout and keep your profile session active.</div>
            {fromCheckout && (
              <div className="account-note">Sign in to continue to checkout. Your basket is saved and will be restored right after login.</div>
            )}
            <form onSubmit={handleSubmit} className="account-form" autoComplete="off">
              <input
                type="text"
                name="login"
                placeholder="Login"
                value={form.login}
                onChange={handleChange}
                className="account-input"
                autoFocus
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="account-input"
              />
              {error && <div className="account-error">{error}</div>}
              <button type="submit" className="account-btn">Sign in</button>
            </form>
            <div className="account-hint">Demo: <b>admin</b> / <b>12345</b></div>
          </>
        ) : (
          <div className="account-welcome">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="account-welcome-icon" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="#eafbee"/>
              <path d="M24 14C18.48 14 14 18.48 14 24C14 29.52 18.48 34 24 34C29.52 34 34 29.52 34 24C34 18.48 29.52 14 24 14ZM24 32C19.59 32 16 28.41 16 24C16 19.59 19.59 16 24 16C28.41 16 32 19.59 32 24C32 28.41 28.41 32 24 32ZM24 20C22.34 20 21 21.34 21 23C21 24.66 22.34 26 24 26C25.66 26 27 24.66 27 23C27 21.34 25.66 20 24 20ZM24 24C23.45 24 23 23.55 23 23C23 22.45 23.45 22 24 22C24.55 22 25 22.45 25 23C25 23.55 24.55 24 24 24Z" fill="#222"/>
            </svg>
            <div className="page-eyebrow">Account</div>
            <div className="account-welcome-title">Hello, admin!</div>
            <div className="account-welcome-desc">You are logged in.</div>
            <button className="account-btn account-btn-spaced" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      {toast && <div className="page-toast">{toast}</div>}
    </div>
  );
}