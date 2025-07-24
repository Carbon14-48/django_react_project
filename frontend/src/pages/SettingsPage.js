import React, { useState, useEffect } from "react";
import httpService from "../utils/httpService";

const SettingsPage = () => {
  const [username, setUsername] = useState("");
  const [usernameMsg, setUsernameMsg] = useState(null);
  const [usernameErr, setUsernameErr] = useState(null);

  const [pwdForm, setPwdForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirm: "",
  });
  const [pwdMsg, setPwdMsg] = useState(null);
  const [pwdErr, setPwdErr] = useState({});

  const [loading, setLoading] = useState(true);

  const access = localStorage.getItem("access");
  const headers = {
    "Content-Type": "application/json",
    ...(access && { Authorization: `JWT ${access}` }),
  };

  useEffect(() => {
    httpService
      .get("http://localhost:8000/api/accounts/me/", { headers })
      .then((res) => {
        setUsername(res.data.username || res.data.email || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleUsernameUpdate = async (e) => {
    e.preventDefault();
    setUsernameMsg(null);
    setUsernameErr(null);
    try {
      await httpService.put(
        "http://localhost:8000/api/accounts/me/",
        { username },
        { headers }
      );
      setUsernameMsg("Username updated successfully!");
    } catch (err) {
      setUsernameErr(
        err.response?.data?.username || "Could not update username"
      );
    }
  };

  const handlePwdUpdate = async (e) => {
    e.preventDefault();
    setPwdMsg(null);
    setPwdErr({});
    try {
      await httpService.post(
        "http://localhost:8000/api/accounts/change-password/",
        pwdForm,
        { headers }
      );
      setPwdMsg("Password changed!");
      setPwdForm({
        current_password: "",
        new_password: "",
        new_password_confirm: "",
      });
    } catch (err) {
      setPwdErr(err.response?.data || { non_field_errors: "Could not change password" });
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .settings-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 60px;
        }
        .settings-card {
          background: #1f1f1f;
          border-radius: 12px;
          padding: 35px 40px 28px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.6);
          margin-bottom: 32px;
          width: 100%;
          max-width: 480px;
        }
        h2 {
          margin-bottom: 24px;
          font-weight: 700;
          font-size: 1.5rem;
          color: #a5d6a7;
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 0.95rem;
          color: #cfcfcf;
        }
        input {
          background-color: #121212;
          border: 1.5px solid #444;
          border-radius: 6px;
          padding: 12px 14px;
          margin-bottom: 14px;
          color: #f1f1f1;
          font-size: 0.95rem;
          outline: none;
          transition: border 0.3s;
        }
        input:focus {
          border-color: #4caf50;
        }
        .error-message {
          color: #ef5350;
          font-size: 0.88rem;
          margin-top: -8px;
          margin-bottom: 12px;
        }
        .message {
          font-weight: 600;
          margin-bottom: 14px;
          color: #81c784;
          font-size: 0.95rem;
        }
        .btn {
          padding: 12px;
          background: linear-gradient(135deg, #43a047, #388e3c);
          border: none;
          border-radius: 8px;
          color: #fff;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .btn:hover {
          background: linear-gradient(135deg, #4caf50, #43a047);
        }
        .btn:active {
          transform: scale(0.97);
        }
        .hint {
          color: #aaaaaa;
          font-size: 0.87rem;
          margin-top: -8px;
          margin-bottom: 14px;
        }
      `}</style>

      <div className="settings-wrapper">
        <div className="settings-card">
          <h2>Change Username</h2>
          <form onSubmit={handleUsernameUpdate} autoComplete="off">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            {(username === "" || username.includes("@")) && (
              <div className="hint">
                Your username is currently set as your email. You can change it.
              </div>
            )}
            {usernameMsg && <div className="message">{usernameMsg}</div>}
            {usernameErr && <div className="error-message">{usernameErr}</div>}
            <button className="btn" type="submit">Update Username</button>
          </form>
        </div>

        <div className="settings-card">
          <h2>Change Password</h2>
          <form onSubmit={handlePwdUpdate} autoComplete="off">
            <label htmlFor="current_password">Current Password:</label>
            <input
              id="current_password"
              name="current_password"
              type="password"
              value={pwdForm.current_password}
              onChange={(e) =>
                setPwdForm({ ...pwdForm, current_password: e.target.value })
              }
              autoComplete="current-password"
            />
            {pwdErr.current_password && (
              <div className="error-message">{pwdErr.current_password}</div>
            )}

            <label htmlFor="new_password">New Password:</label>
            <input
              id="new_password"
              name="new_password"
              type="password"
              value={pwdForm.new_password}
              onChange={(e) =>
                setPwdForm({ ...pwdForm, new_password: e.target.value })
              }
              autoComplete="new-password"
            />
            {pwdErr.new_password && (
              <div className="error-message">{pwdErr.new_password}</div>
            )}

            <label htmlFor="new_password_confirm">Confirm New Password:</label>
            <input
              id="new_password_confirm"
              name="new_password_confirm"
              type="password"
              value={pwdForm.new_password_confirm}
              onChange={(e) =>
                setPwdForm({ ...pwdForm, new_password_confirm: e.target.value })
              }
              autoComplete="new-password"
            />
            {pwdErr.new_password_confirm && (
              <div className="error-message">{pwdErr.new_password_confirm}</div>
            )}

            {pwdMsg && <div className="message">{pwdMsg}</div>}
            {pwdErr.non_field_errors && (
              <div className="error-message">{pwdErr.non_field_errors}</div>
            )}

            <button className="btn" type="submit">Change Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
