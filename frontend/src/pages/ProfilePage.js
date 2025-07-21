import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../store/auth";
import httpService from "../utils/httpService"; // Assure-toi que ce fichier existe
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, authChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleSubscribe = async () => {
    const access = localStorage.getItem("access");
    const headers = access ? { Authorization: `JWT ${access}` } : {};
    try {
      const res = await httpService.post(
        "/api/accounts/create-checkout-session/",
        {},
        { headers }
      );
      window.location.href = res.data.url;
    } catch (err) {
      alert("Error creating Stripe Checkout session!");
    }
  };

  if (!authChecked || loading) return <div>Loading...</div>;
  if (!user) return <div>Error loading profile.</div>;

  return (
    <>
      <style>{`
        body {
          background-color: #121212;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #eee;
          margin: 0;
          padding: 0;
        }
        .profile-container {
          max-width: 600px;
          background: #1e1e1e;
          margin: 60px auto 80px;
          padding: 30px 40px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.7);
          user-select: none;
        }
        .profile-header {
          display: flex;
          align-items: center;
          gap: 25px;
          margin-bottom: 30px;
        }
        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4caf50, #81c784);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: 700;
          color: #121212;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.7);
          user-select: none;
          flex-shrink: 0;
        }
        .profile-name {
          font-size: 2rem;
          font-weight: 700;
          color: #a5d6a7;
          user-select: text;
        }
        .profile-info-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          row-gap: 15px;
          column-gap: 20px;
          font-size: 1rem;
          color: #ccc;
        }
        .profile-info-grid strong {
          color: #81c784;
          user-select: text;
        }
        .profile-info-grid p {
          margin: 0;
          user-select: text;
        }
        /* Styles communs pour les boutons */
        .btn-primary {
          margin-top: 30px;
          padding: 12px 28px;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 6px 15px rgba(76, 175, 80, 0.7);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
          user-select: none;
          color: #121212;
          background-color: #4caf50;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 180px;
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .btn-primary:hover,
        .btn-primary:focus {
          background-color: #388e3c;
          box-shadow: 0 8px 22px rgba(56, 142, 60, 0.9);
          outline: none;
          color: #121212;
          text-decoration: none;
        }
        /* Couleur spéciale pour le bouton subscribe */
        .btn-subscribe {
          background: linear-gradient(90deg, #00c3ff 0%, #ffff1c 100%);
          box-shadow: 0 6px 15px rgba(0, 195, 255, 0.7);
          color: #121212;
        }
        .btn-subscribe:hover,
        .btn-subscribe:focus {
          background: linear-gradient(90deg, #ffff1c 0%, #00c3ff 100%);
          box-shadow: 0 8px 22px rgba(255, 255, 28, 0.8);
          outline: none;
        }
        /* Conteneur pour aligner les boutons côte à côte */
        .buttons-container {
          margin-top: 35px;
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: flex-start;
        }
        @media (max-width: 480px) {
          .profile-container {
            padding: 25px 20px;
            margin: 40px 15px 60px;
          }
          .profile-header {
            flex-direction: column;
            gap: 15px;
            align-items: center;
          }
          .profile-name {
            font-size: 1.6rem;
            text-align: center;
          }
          .profile-info-grid {
            grid-template-columns: 1fr;
          }
          .buttons-container {
            justify-content: center;
          }
          .btn-primary {
            min-width: 100%;
          }
        }
      `}</style>

      <div
        className="profile-container"
        role="main"
        aria-label="User profile information"
      >
        <header className="profile-header">
          <div className="profile-avatar" aria-hidden="true">
            {user.first_name?.charAt(0).toUpperCase() ||
              user.email?.charAt(0).toUpperCase() ||
              "U"}
          </div>
          <h1 className="profile-name" tabIndex={0}>
            {user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : user.username || user.email}
          </h1>
        </header>

        <section className="profile-info-grid" aria-label="User details">
          <strong>Username:</strong>
          <p tabIndex={0}>{user.username || user.email}</p>

          <strong>Email:</strong>
          <p tabIndex={0}>{user.email}</p>

          <strong>First Name:</strong>
          <p tabIndex={0}>{user.first_name || "-"}</p>

          <strong>Last Name:</strong>
          <p tabIndex={0}>{user.last_name || "-"}</p>

          <strong>Member Since:</strong>
          <p tabIndex={0}>
            {user.date_joined
              ? new Date(user.date_joined).toLocaleDateString()
              : "-"}
          </p>
        </section>

        <div className="buttons-container">
          <Link
            to="/dashboard/settings"
            className="btn-primary"
            role="button"
            tabIndex={0}
          >
            Edit Profile
          </Link>

          {!user.is_subscriber ? (
            <button
              onClick={handleSubscribe}
              className="btn-primary btn-subscribe"
              aria-label="Subscribe for full access, no ads and more"
            >
              Subscribe for Full Access
            </button>
          ) : (
            <div
              style={{
                marginTop: 12,
                color: "#81c784",
                fontWeight: 600,
                minWidth: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✅ You are a subscriber!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
