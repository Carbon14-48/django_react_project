import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../store/auth";
import httpService from "../utils/httpService";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { first_name, last_name, email, password, re_password } = formData;

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      dispatch(signup(first_name, last_name, email, password, re_password));
      setAccountCreated(true);
    }
  };

  const handleContinueWithGoogle = async () => {
    try {
      const response = await httpService.get(
        "/auth/o/google-oauth2/?redirect_uri=http://localhost:3000/google"
      );
      window.location.replace(response.data.authorization_url);
    } catch (error) {
      // handle error if needed
    }
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/");
    if (accountCreated) navigate("/login");
  }, [isAuthenticated, accountCreated, navigate]);

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
        .signup-container {
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
        .btn-google {
          background-color: #db4437;
          box-shadow: 0 4px 6px rgba(219, 68, 55, 0.4);
        }
        .btn-google:hover {
          background-color: #b3382b;
          box-shadow: 0 6px 10px rgba(179, 56, 43, 0.6);
        }
        .btn-facebook {
          background-color: #1877f2;
          box-shadow: 0 4px 6px rgba(24, 119, 242, 0.4);
        }
        .btn-facebook:hover {
          background-color: #135ecb;
          box-shadow: 0 6px 10px rgba(19, 94, 203, 0.6);
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
          .signup-container {
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

      <div className="signup-container">
        <h1>Sign Up</h1>
        <p>Create your account</p>
        <form onSubmit={handleSubmit} noValidate>
          {[
            { label: "First Name", name: "first_name", type: "text", placeholder: "Enter First Name", required: true },
            { label: "Last Name", name: "last_name", type: "text", placeholder: "Enter Last Name", required: true },
            { label: "Email address", name: "email", type: "email", placeholder: "Enter email", required: true },
            { label: "Password", name: "password", type: "password", placeholder: "Password", required: true },
            { label: "Confirm Password", name: "re_password", type: "password", placeholder: "Confirm Password", required: true },
          ].map(({ label, name, type, placeholder, required }) => (
            <div key={name} style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleOnChange}
                id={name}
                required={required}
                placeholder={placeholder}
                autoComplete={name === "email" ? "email" : "new-password"}
              />
            </div>
          ))}

          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>

        <button
          type="button"
          className="btn-google"
          onClick={handleContinueWithGoogle}
        >
          Continue with Google
        </button>
        <p style={{ textAlign: "center", color: "#ccc", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
};

export default SignUpPage;
