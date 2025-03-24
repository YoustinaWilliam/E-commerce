import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  
  let users = JSON.parse(localStorage.getItem("users")) || [];

  function addUser() {
    const user = {
      username: name.trim(),
      email: email.trim(),
      password: password.trim(),
      isAdmin: 0,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  const commonTLDs = ["com", "net", "org", "edu"];

  const mailValidate = (mail) => {
    const trimmedMail = mail.trim();
    const basicRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!basicRegex.test(trimmedMail) || /\s/.test(trimmedMail)) {
      return false;
    }
    const domainPart = trimmedMail.split("@")[1];
    const tld = domainPart.split(".").pop();
    return commonTLDs.includes(tld);
  };

  const passwordValidate = (pass) => {
    return pass.trim().length >= 6 && !/\s/.test(pass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setWarning("");

    if (!name.trim()) {
      setError("Full Name is required.");
      return;
    }

    if (!mailValidate(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!passwordValidate(password)) {
      setWarning("Password is too short. Minimum 6 characters required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    addUser();
    // alert("Registration successful! Redirecting to login...");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #ece9e6, #ffffff)" }}
    >
      <div className="card p-4 shadow" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {warning && <div className="alert alert-warning">{warning}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Sign Up
          </button>
        </form>

        <hr />
        <button className="btn btn-outline-danger w-100 mb-2">
          Sign up with Google
        </button>
        <button className="btn btn-outline-primary w-100">
          Sign up with Facebook
        </button>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
