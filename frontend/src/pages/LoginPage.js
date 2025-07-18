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
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          background-color: #121212;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #eee;
        }
        .login-container {
          max-width: 400px;
          margin: 80px auto;
          background: #1e1e1e;
          border-radius: 12px;
          padding: 35px 30px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          user-select: none;
        }
        h1 {
          margin-bottom: 24px;
          font-weight: 700;
          font-size: 1.8rem;
          color: #a5d6a7;
          text-align: center;
          text-shadow: 0 0 5px #4caf50aa;
        }
        p {
          text-align: center;
          margin-bottom: 20px;
          color: #ccc;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          color: #b0b0b0;
          user-select: none;
        }
        input {
          background-color: #000;
          border: 1.8px solid #333;
          border-radius: 6px;
          padding: 12px 15px;
          margin-bottom: 18px;
          color: #eee;
          font-size: 1rem;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          outline: none;
          box-shadow: inset 0 1px 3px rgba(255,255,255,0.05);
          width: 100%;
          box-sizing: border-box;
        }
        input:focus {
          border-color: #4caf50;
          box-shadow: 0 0 8px #4caf50aa;
        }
        button {
          padding: 14px;
          border: none;
          border-radius: 50px;
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.1s ease;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.6);
          width: 100%;
          user-select: none;
          display: block;
          margin-bottom: 15px;
        }
        button:focus {
          outline: none;
        }
        button:hover {
          transform: scale(1.02);
        }
        button:active {
          transform: scale(0.97);
        }

        .btn-primary {
          background-color: #4caf50;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.6);
        }
        .btn-primary:hover {
          background-color: #43a047;
          box-shadow: 0 6px 18px rgba(67, 160, 71, 0.8);
        }

        /* Nouveau style pour btn-google identique à btn-primary */
        .btn-google {
          background-color: #4caf50;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.6);
          margin-bottom: 15px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          color: white;
          width: 100%;
          display: block;
          user-select: none;
          transition: background-color 0.3s ease, transform 0.1s ease;
          border: none;
          padding: 14px;
        }
        .btn-google:hover {
          background-color: #43a047;
          box-shadow: 0 6px 18px rgba(67, 160, 71, 0.8);
        }
        a {
          color: #1a73e8;
          text-decoration: none;
          user-select: none;
        }
        a:hover {
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .login-container {
            margin: 60px 15px;
            padding: 30px 20px;
          }
          h1 {
            font-size: 1.5rem;
          }
          label {
            font-size: 0.9rem;
          }
          input {
            font-size: 0.95rem;
          }
          button {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="login-container">
        <h1>Sign In</h1>
        <p>Sign into your account</p>
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
            required
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
            required
          />
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <button className="btn-google" onClick={handleContinueWithGoogle}>
          Continue with Google
        </button>
        <p style={{ textAlign: "center", color: "#ccc", marginTop: "20px" }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p style={{ textAlign: "center", color: "#ccc" }}>
          Forgot your password? <Link to="/reset-password">Reset Password</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;

