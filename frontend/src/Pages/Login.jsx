import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import toastr from "toastr";
import { loginUser } from "../api"; // Import the login API call

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Call the backend login API
      const user = await loginUser(formData);
      // alert(`Welcome back, ${user.username}!`);
      toastr.info(`Welcome back, ${user.username}!`);
      setFormData({ email: "", password: "" });
      setError("");
      navigate("/"); // Redirect to the home page after login
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login here</h2>
        <p>Welcome back</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <p className="forgot-password">Forgot your password?</p>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>
        <p className="create-account">
          <Link to="/register" className="register-link">
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
