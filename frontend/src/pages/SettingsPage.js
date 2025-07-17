import React, { useState, useEffect } from "react";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    current_password: "",
    new_password: "",
    new_password_confirm: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/api/accounts/me/", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error while fetching data");
        return res.json();
      })
      .then((data) => {
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          current_password: "",
          new_password: "",
          new_password_confirm: "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null }); // clear error on change
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrors({});

    try {
      const resUser = await fetch("http://localhost:8000/api/accounts/me/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
        }),
      });

      if (!resUser.ok) {
        const errorData = await resUser.json();
        setErrors(errorData);
        throw new Error("Error updating user info");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error updating user info");
      return;
    }

    if (
      formData.current_password ||
      formData.new_password ||
      formData.new_password_confirm
    ) {
      try {
        const resPwd = await fetch("http://localhost:8000/auth/change-password/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            current_password: formData.current_password,
            new_password: formData.new_password,
            new_password_confirm: formData.new_password_confirm,
          }),
        });

        if (!resPwd.ok) {
          const errorData = await resPwd.json();
          setErrors(errorData);
          throw new Error("Error changing password");
        }
      } catch (err) {
        console.error(err);
        setMessage("Error changing password");
        return;
      }
    }

    setMessage("Information updated successfully!");
    setFormData({
      ...formData,
      current_password: "",
      new_password: "",
      new_password_confirm: "",
    });
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
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          background-color: #121212;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #eee;
        }
        .settings-container {
          max-width: 450px;
          margin: 60px auto;
          background: #1e1e1e;
          border-radius: 12px;
          padding: 35px 40px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          transition: box-shadow 0.3s ease;
        }
        .settings-container:hover {
          box-shadow: 0 15px 30px rgba(0, 255, 0, 0.4);
        }
        h1 {
          margin-bottom: 30px;
          font-weight: 700;
          text-align: center;
          font-size: 2rem;
          letter-spacing: 1px;
          color: #a5d6a7;
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
        }
        input:focus {
          border-color: #4caf50;
          box-shadow: 0 0 8px #4caf50aa;
        }
        .error-message {
          color: #e57373;
          font-size: 0.85rem;
          margin-top: -14px;
          margin-bottom: 12px;
          user-select: none;
        }
        button {
          padding: 14px;
          background-color: #4caf50;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.1s ease;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.6);
        }
        button:hover {
          background-color: #43a047;
          box-shadow: 0 6px 18px rgba(67, 160, 71, 0.8);
        }
        button:active {
          transform: scale(0.97);
          box-shadow: 0 2px 6px rgba(67, 160, 71, 0.9);
        }
        .message {
          text-align: center;
          font-weight: 600;
          margin-bottom: 25px;
          color: #81c784;
          user-select: none;
        }
        .loading {
          text-align: center;
          margin-top: 100px;
          font-size: 1.2rem;
          color: #aaa;
          user-select: none;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .settings-container {
            margin: 30px 15px;
            padding: 25px 20px;
          }
          h1 {
            font-size: 1.6rem;
          }
          input {
            font-size: 0.95rem;
          }
          button {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="settings-container">
        <h1>Account Settings</h1>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="first_name">First Name:</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            autoComplete="given-name"
          />
          {errors.first_name && (
            <p className="error-message">{errors.first_name}</p>
          )}

          <label htmlFor="last_name">Last Name:</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            autoComplete="family-name"
          />
          {errors.last_name && (
            <p className="error-message">{errors.last_name}</p>
          )}

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <hr style={{ margin: "20px 0", borderColor: "#333" }} />

          <label htmlFor="current_password">Current Password:</label>
          <input
            id="current_password"
            name="current_password"
            type="password"
            value={formData.current_password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.current_password && (
            <p className="error-message">{errors.current_password}</p>
          )}

          <label htmlFor="new_password">New Password:</label>
          <input
            id="new_password"
            name="new_password"
            type="password"
            value={formData.new_password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {errors.new_password && (
            <p className="error-message">{errors.new_password}</p>
          )}

          <label htmlFor="new_password_confirm">Confirm New Password:</label>
          <input
            id="new_password_confirm"
            name="new_password_confirm"
            type="password"
            value={formData.new_password_confirm}
            onChange={handleChange}
            autoComplete="new-password"
          />
          {errors.new_password_confirm && (
            <p className="error-message">{errors.new_password_confirm}</p>
          )}

          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default SettingsPage;





