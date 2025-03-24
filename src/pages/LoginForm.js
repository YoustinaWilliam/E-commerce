import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const history=useHistory();

  // Email validation func
  const mailValidate = (mail) => {
    const basicRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return basicRegex.test(mail.trim());
  };

  // Check if user exists
  const checkUser = () => {
    return users.find((user) => user.email === email && user.password === password);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setWarning("");

    if (!mailValidate(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.trim().length < 6) {
      setWarning("Password is too short. Minimum 6 characters required.");
      return;
    }

    const user = checkUser();

    if (user) {
      sessionStorage.setItem("userEmail", user.email);
      sessionStorage.setItem("isAdmin", user.isAdmin);

      user.isAdmin ?  history.push("/admin") :  history.push("/");

      // Redirect to homepage after successful login
      // history.push("/admin");
      
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #ece9e6, #ffffff)" }}
    >
      <div className="card p-4 shadow" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Sign In</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {warning && <div className="alert alert-warning">{warning}</div>}

        <form onSubmit={handleSubmit}>
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

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe" className="ms-2">Remember me</label>
            </div>
            <a href="#" className="text-decoration-none">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Sign in
          </button>
        </form>

        <hr />
        <button className="btn btn-outline-danger w-100 mb-2">
          Sign in with Google
        </button>
        <button className="btn btn-outline-primary w-100">
          Sign in with Facebook
        </button>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
