import React, { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(form);
      alert("Signup successful ✅");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed ❌");
    }
  };

  return (
    <div className="login-container page">
      <div className="login-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Signup</button>
        </form>

        <p className="signup-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;