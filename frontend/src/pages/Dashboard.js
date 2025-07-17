import React from "react";
import { Outlet, Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar simple à gauche */}
      <nav style={{ width: "200px", background: "#222", color: "#eee", padding: "20px" }}>
        <h2>Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="profile" style={{ color: "#a5d6a7" }}>Profile</Link></li>
          <li><Link to="settings" style={{ color: "#a5d6a7" }}>Settings</Link></li>
        </ul>
      </nav>

      {/* Contenu principal */}
      <main style={{ flex: 1, padding: "20px" }}>
        {/* Ici s’affichent ProfilePage, SettingsPage, etc. */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

