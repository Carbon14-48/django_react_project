import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Aurora from "../components/Aurora";
import "../components/Aurora.css";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Aurora
        colorStops={["#0f0", "#1e2b16", "#00ff88"]}
        blend={0.35}
        amplitude={0.85}
        speed={0.4}
      />
      <div
        className="home-container"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "440px",
          margin: "80px auto",
          background: "rgba(20,30,20,0.5)",
          borderRadius: "16px",
          padding: "40px 30px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          border: "1px solid rgba(60,255,100,0.25)",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <h1 className="title" style={{
          fontWeight: 700,
          fontSize: "2rem",
          color: "#6fff6f",
          textShadow: "0 0 8px #1a5,0 0 18px #1e2b16",
          marginBottom: 15
        }}>Welcome to Articles Heaven!</h1>
        <p style={{ color: "#ccc", fontSize: "1rem", marginBottom: 25 }}>
        
        </p>
        {!isAuthenticated && (
          <>
            <p style={{ color: "#aaffcc" }}>
            Where Stories live , and Legends Login 
            </p>
            <div className="btn-group" style={{
              display: "flex", justifyContent: "center", gap: 20, marginTop: 30
            }}>
              <Link
                className="btn btn-primary"
                to="/login"
                style={{
                  flex: 1,
                  maxWidth: 150,
                  padding: "14px 0",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  borderRadius: 50,
                  cursor: "pointer",
                  textDecoration: "none",
                  background: "rgba(60,255,100,0.8)",
                  color: "#181818",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(40,255,120,0.5)",
                  backdropFilter: "blur(2px)",
                  transition: "all 0.22s"
                }}
              >
                Sign In
              </Link>
              <Link
                className="btn btn-outline"
                to="/signup"
                style={{
                  flex: 1,
                  maxWidth: 150,
                  padding: "14px 0",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  borderRadius: 50,
                  cursor: "pointer",
                  textDecoration: "none",
                  background: "rgba(18,30,20,0.3)",
                  color: "#48ff8a",
                  border: "2px solid #48ff8a",
                  boxShadow: "none",
                  backdropFilter: "blur(2px)",
                  transition: "all 0.22s"
                }}
              >
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;