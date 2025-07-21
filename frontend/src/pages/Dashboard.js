import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.endsWith(path);

  return (
    <div style={{ minHeight: "100vh", background: "#121212", color: "#eee", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Topbar */}
      <header
        style={{
          background: "#222",
          padding: "15px 30px",
          fontWeight: "700",
          fontSize: "1.8rem",
          color: "#a5d6a7",
          boxShadow: "0 2px 6px rgba(0,0,0,0.7)",
        }}
      >
        Dashboard
      </header>

      {/* Navigation horizontal sous le topbar */}
      <nav
        style={{
          background: "#1e1e1e",
          padding: "10px 30px",
          display: "flex",
          gap: "30px",
          fontWeight: "600",
          fontSize: "1.1rem",
        }}
      >
        {[
          { to: "profile", label: "Profile" },
          { to: "settings", label: "Settings" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              color: isActive(to) ? "#4caf50" : "#ccc",
              textDecoration: "none",
              borderBottom: isActive(to) ? "3px solid #4caf50" : "3px solid transparent",
              paddingBottom: "4px",
              transition: "color 0.3s ease, border-bottom 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!isActive(to)) e.currentTarget.style.color = "#81c784";
            }}
            onMouseLeave={(e) => {
              if (!isActive(to)) e.currentTarget.style.color = "#ccc";
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Contenu principal */}
      <main style={{ padding: "30px", minHeight: "calc(100vh - 112px)" /* topbar + nav height */ }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;





