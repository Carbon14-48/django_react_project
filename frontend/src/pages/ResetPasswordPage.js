import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { reset_password } from "../store/auth";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reset_password(email));
    setRequestSent(true);
  };

  useEffect(() => {
    if (requestSent) {
      navigate("/");
    }
  }, [requestSent, navigate]);

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
        .reset-container {
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
          background-color: #4caf50;
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
        }
        button:hover {
          background-color: #43a047;
          box-shadow: 0 6px 18px rgba(67, 160, 71, 0.8);
        }
        button:active {
          transform: scale(0.97);
          box-shadow: 0 2px 6px rgba(67, 160, 71, 0.9);
        }
        @media (max-width: 480px) {
          .reset-container {
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

      <div className="reset-container">
        <h1>Request Password Reset</h1>
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
          <button type="submit">Request Password Reset</button>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;
