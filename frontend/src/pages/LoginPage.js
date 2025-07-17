/*import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/auth";

import httpService from "../utils/httpService";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const { isAuthenticated } = useSelector((state) => state.auth);

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
        "/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/google"
      );
      window.location.replace(response.data.authorization_url);
    } catch (error) {}
  };

  const handleContinueWithFacebook = async () => {
    try {
      const response = await httpService.get(
        "/auth/o/facebook/?redirect_uri=http://localhost:8000/facebook"
      );
      window.location.replace(response.data.authorization_url);
    } catch (error) {}
  };
  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="container mt-5">
      <h1>Sign In</h1>
      <p>Sign into your account</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          style={{ borderRadius: "50px" }}
        >
          Login
        </button>
      </form>

      <button
        type="button"
        className="btn btn-danger mt-3"
        style={{ borderRadius: "50px" }}
        onClick={handleContinueWithGoogle}
      >
        Continue with Google
      </button>

      <br />

      <button
        type="button"
        className="btn btn-primary mt-3"
        style={{ borderRadius: "50px" }}
        onClick={handleContinueWithFacebook}
      >
        Continue with Facebook
      </button>

      <p className="my-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>

      <p className="my-3">
        Forgot your password? <Link to="/reset-password">Reset Password</Link>
      </p>
    </div>
  );
};

export default LoginPage;*/
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/auth";
import httpService from "../utils/httpService";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const { isAuthenticated } = useSelector((state) => state.auth);

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
        "/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/google"
      );
      window.location.replace(response.data.authorization_url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleContinueWithFacebook = async () => {
    try {
      const response = await httpService.get(
        "/auth/o/facebook/?redirect_uri=http://localhost:8000/facebook"
      );
      window.location.replace(response.data.authorization_url);
    } catch (error) {
      console.error(error);
    }
  };

 useEffect(() => {
  if (isAuthenticated) {
    alert("✅ Connexion réussie !");
    navigate("/dashboard");
  } else if (email && password) {
    alert("❌ Échec de la connexion. Vérifie ton email ou mot de passe.");
  }
}, [isAuthenticated, email, password, navigate]);

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
          margin: 60px auto;
          background: #1e1e1e;
          border-radius: 12px;
          padding: 35px 40px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        h1.title {
          font-weight: 700;
          font-size: 2rem;
          color: #a5d6a7;
          text-shadow: 0 0 5px #4caf50aa;
          margin-bottom: 5px;
          user-select: none;
        }
        p.subtitle {
          margin-top: 0;
          margin-bottom: 25px;
          color: #b0b0b0;
          user-select: none;
        }
        form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        label {
          font-weight: 600;
          font-size: 0.95rem;
          color: #b0b0b0;
          user-select: none;
        }
        input {
          width: 100%;
          padding: 12px 15px;
          border-radius: 6px;
          border: 1.8px solid #333;
          background-color: #000;
          color: #eee;
          font-size: 1rem;
          outline: none;
          box-shadow: inset 0 1px 3px rgba(255,255,255,0.05);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        input:focus {
          border-color: #4caf50;
          box-shadow: 0 0 8px #4caf50aa;
        }
        button {
          width: 100%;
          height: 50px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.6);
          user-select: none;
          transition: background-color 0.3s ease, transform 0.1s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        button[type="submit"] {
          background-color: #4caf50;
          color: white;
        }
        button[type="submit"]:hover {
          background-color: #43a047;
          box-shadow: 0 6px 18px rgba(67, 160, 71, 0.8);
        }
        button[type="submit"]:active {
          transform: scale(0.97);
          box-shadow: 0 2px 6px rgba(67, 160, 71, 0.9);
        }
        button.google {
          background-color: #db4437;
          box-shadow: 0 4px 6px rgba(219, 68, 55, 0.4);
          color: white;
        }
        button.google:hover {
          background-color: #a83224;
          box-shadow: 0 6px 10px rgba(168, 50, 36, 0.8);
        }
        button.google:active {
          transform: scale(0.97);
        }
        button.facebook {
          background-color: #3b5998;
          box-shadow: 0 4px 6px rgba(59, 89, 152, 0.4);
          color: white;
        }
        button.facebook:hover {
          background-color: #2d4373;
          box-shadow: 0 6px 10px rgba(45, 67, 115, 0.8);
        }
        button.facebook:active {
          transform: scale(0.97);
        }
        .links {
          color: #bbb;
          user-select: none;
        }
        .links a {
          color: #4caf50;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        .links a:hover {
          color: #81c784;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .login-container {
            margin: 30px 15px;
            padding: 25px 20px;
          }
          h1.title {
            font-size: 1.6rem;
          }
          input {
            font-size: 0.95rem;
          }
          button {
            font-size: 1rem;
            height: 45px;
          }
        }
      `}</style>

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

        <button className="facebook" onClick={handleContinueWithFacebook}>
          Continue with Facebook
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



