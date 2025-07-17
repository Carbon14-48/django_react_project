
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

import { facebookAuthenticate } from "../store/auth";

const Facebook = () => {
  const dispatch = useDispatch();
  let location = useLocation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const values = queryString.parse(location.search);
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;

    if (state && code) {
      if (isAuthenticated)
        window.history.replaceState(null, null, window.location.pathname);
      else dispatch(facebookAuthenticate(state, code));
    }
  }, [dispatch, isAuthenticated, location.search]);

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
        .facebook-container {
          max-width: 450px;
          margin: 80px auto;
          background: #1e1e1e;
          border-radius: 12px;
          padding: 40px 30px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          text-align: center;
          user-select: none;
        }
        h1.title {
          font-weight: 700;
          font-size: 2rem;
          color: #a5d6a7;
          text-shadow: 0 0 5px #4caf50aa;
          margin-bottom: 15px;
        }
        p {
          color: #ccc;
          font-size: 1rem;
          margin-bottom: 25px;
        }
        .btn-group {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 30px;
        }
        a.btn {
          flex: 1;
          max-width: 150px;
          padding: 14px 0;
          font-weight: 700;
          font-size: 1.05rem;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          user-select: none;
          transition: background-color 0.3s ease, color 0.3s ease;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.6);
        }
        a.btn-primary {
          background-color: #4caf50;
          color: white;
          border: none;
        }
        a.btn-primary:hover {
          background-color: #43a047;
          box-shadow: 0 6px 18px rgba(67, 160, 71, 0.8);
          color: white;
        }
        a.btn-outline {
          background-color: transparent;
          color: #4caf50;
          border: 2px solid #4caf50;
          box-shadow: none;
        }
        a.btn-outline:hover {
          background-color: #4caf50;
          color: white;
          box-shadow: 0 6px 18px rgba(67, 160, 71, 0.8);
        }
        @media (max-width: 480px) {
          .facebook-container {
            margin: 60px 15px;
            padding: 30px 20px;
          }
          h1.title {
            font-size: 1.6rem;
          }
          a.btn {
            max-width: 120px;
            font-size: 1rem;
            padding: 12px 0;
          }
        }
      `}</style>

      <div className="facebook-container">
        <h1 className="title">Welcome to Auth System!</h1>
        <p>This is an incredible auth system with production level features!</p>

        {!isAuthenticated && (
          <>
            <p>
              Click Sign In to login to your account or Sign Up to create a new
              account.
            </p>

            <div className="btn-group">
              <Link className="btn btn-primary" to="/login">
                Sign In
              </Link>
              <Link className="btn btn-outline" to="/signup">
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Facebook;


