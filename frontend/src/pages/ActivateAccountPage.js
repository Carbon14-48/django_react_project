/*import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { verify } from "../store/auth";

const ActivateAccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uid, token } = useParams();

  const [verified, setVerified] = useState(false);

  const handleVerifyAccount = () => {
    dispatch(verify(uid, token));
    setVerified(true);
  };

  useEffect(() => {
    verified && navigate("/");
  }, [verified, navigate]);

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: "200px" }}
      >
        <h1>Activate your account</h1>
        <button
          onClick={handleVerifyAccount}
          style={{ marginTop: "50px" }}
          type="button"
          className="btn btn-primary"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default ActivateAccountPage;*/
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { verify } from "../store/auth";

const ActivateAccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uid, token } = useParams();

  const [verified, setVerified] = useState(false);

  const handleVerifyAccount = () => {
    dispatch(verify(uid, token));
    setVerified(true);
  };

  useEffect(() => {
    if (verified) navigate("/");
  }, [verified, navigate]);

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
        .activate-container {
          max-width: 400px;
          margin: 150px auto;
          background: #1e1e1e;
          border-radius: 12px;
          padding: 40px 30px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          user-select: none;
        }
        h1 {
          font-weight: 700;
          font-size: 2rem;
          color: #a5d6a7;
          text-shadow: 0 0 5px #4caf50aa;
          margin: 0;
        }
        button {
          width: 100%;
          height: 50px;
          background-color: #4caf50;
          border: none;
          border-radius: 50px;
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.6);
          transition: background-color 0.3s ease, transform 0.1s ease;
          display: flex;
          justify-content: center;
          align-items: center;
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
          .activate-container {
            margin: 100px 15px;
            padding: 30px 20px;
          }
          h1 {
            font-size: 1.6rem;
          }
          button {
            height: 45px;
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="activate-container">
        <h1>Activate your account</h1>
        <button onClick={handleVerifyAccount} type="button">
          Verify
        </button>
      </div>
    </>
  );
};

export default ActivateAccountPage;
