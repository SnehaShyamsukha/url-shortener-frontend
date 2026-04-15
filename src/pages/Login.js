import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      localStorage.setItem("token", res.data.token);
      alert("Login successful ✅");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed ❌");
    }
  };

  return (
    <div className="login-container page">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Signup here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;