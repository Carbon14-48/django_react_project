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
      .catch((err) => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  // Username change
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

  // Password change
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

  if (loading)
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );

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
          background: #1e1e1e;
          border-radius: 12px;
          padding: 35px 40px 28px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          margin-bottom: 32px;
          min-width: 350px;
          max-width: 430px;
        }
        h2 {
          margin-bottom: 20px;
          font-weight: 700;
          font-size: 1.4rem;
          color: #a5d6a7;
        }
        label {
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 0.98rem;
          color: #b0b0b0;
        }
        input {
          background-color: #000;
          border: 1.8px solid #333;
          border-radius: 6px;
          padding: 12px 15px;
          margin-bottom: 16px;
          color: #eee;
          font-size: 1rem;
        }
        .error-message {
          color: #e57373;
          font-size: 0.88rem;
          margin-top: -8px;
          margin-bottom: 10px;
        }
        .message {
          font-weight: 600;
          margin-bottom: 15px;
          color: #81c784;
        }
        .btn {
          padding: 12px;
          background-color: #4caf50;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          width: 100%;
        }
        .hint {
          color: #b0b0b0;
          font-size: 0.97rem;
          margin-bottom: 18px;
          margin-top: -8px;
        }
      `}</style>
      <div className="settings-wrapper">
        {/* Username Section */}
        <div className="settings-card">
          <h2>Change Username</h2>
          <form onSubmit={handleUsernameUpdate} autoComplete="off">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
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

        {/* Password Section */}
        <div className="settings-card">
          <h2>Change Password</h2>
          <form onSubmit={handlePwdUpdate} autoComplete="off">
            <label htmlFor="current_password">Current Password:</label>
            <input
              id="current_password"
              name="current_password"
              type="password"
              value={pwdForm.current_password}
              onChange={e => setPwdForm({ ...pwdForm, current_password: e.target.value })}
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
              onChange={e => setPwdForm({ ...pwdForm, new_password: e.target.value })}
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
              onChange={e => setPwdForm({ ...pwdForm, new_password_confirm: e.target.value })}
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