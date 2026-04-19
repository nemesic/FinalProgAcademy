import { useState } from "react";

export default function Help() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email.");
      return;
    }
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setError("");
    // Here you could add API call to actually send the message
  }

  return (
    <div className="help-page min-h-screen flex items-center justify-center bg-[#f7f8fa]">
      <div className="help-card animate-help-fade-in">
        <h1 className="help-title">Contact our team</h1>
        <div className="help-subtitle">
          We’ll answer your questions and help with any issue.
        </div>
        <div className="help-desc">
          If you have any questions, issues, or suggestions, just fill out the form below and our team will get back to you as soon as possible.
        </div>
        {sent && (
          <div className="help-success">Thank you! Your message has been sent.</div>
        )}
        {error && (
          <div className="help-error">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="help-form" autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="help-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="help-input"
          />
          <textarea
            name="message"
            placeholder="How can we help you?"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="help-input"
          />
          <button
            type="submit"
            className="help-btn"
          >
            Send
          </button>
        </form>
        <div className="help-footer">
          For urgent questions, email us at <a href="mailto:support@prog.academy" className="help-footer-link">support@prog.academy</a>
        </div>
      </div>
    </div>
  );
}