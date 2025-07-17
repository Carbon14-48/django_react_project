import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";
import httpService from "../utils/httpService";

const LoginPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const { isAuthenticated, authChecked } = useSelector((state) => state.auth);

  // NUCLEAR: hard redirect if already authenticated
  if (authChecked && isAuthenticated) {
    window.location.replace("/dashboard");
    return null;
  }

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleContinueWithGoogle = async () => {
    try {
      const response = await httpService.get(
        "/auth/o/google-oauth2/?redirect_uri=http://localhost:3000/google"
      );
      window.location.replace(response.data.authorization_url);
    } catch (error) {
      console.error(error);
    }
  };

  if (!authChecked) return <div>Loading...</div>;

  return (
    <>
      <style>{`/* ...styles omitted for brevity, you can keep your original styles... */`}</style>
      <div className="login-container">
        <h1 className="title">Sign In</h1>
        <p className="subtitle">Sign into your account</p>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            id="email"
            placeholder="Enter email"
            autoComplete="email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            id="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          <button type="submit">Login</button>
        </form>
        <button className="google" onClick={handleContinueWithGoogle}>
          Continue with Google
        </button>
        <p className="links">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="links">
          Forgot your password? <Link to="/reset-password">Reset Password</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;