import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.endsWith(path);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: "200px",
          background: "#222",
          color: "#eee",
          padding: "20px",
          minHeight: "100vh",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", fontWeight: "700", fontSize: "1.5rem", color: "#a5d6a7" }}>
          Dashboard
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {[
            { to: "profile", label: "Profile" },
            { to: "settings", label: "Settings" },
          ].map(({ to, label }) => (
            <li key={to} style={{ marginBottom: "1rem" }}>
              <Link
                to={to}
                style={{
                  color: isActive(to) ? "#4caf50" : "#ccc",
                  fontWeight: isActive(to) ? "700" : "500",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  transition: "color 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(to)) e.currentTarget.style.color = "#81c784"; // vert clair au hover
                }}
                onMouseLeave={(e) => {
                  if (!isActive(to)) e.currentTarget.style.color = "#ccc"; // couleur grise par défaut
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;




