import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/auth";

const Navbar = () => {
  const dispatch = useDispatch();

  // Always call hooks first, before any conditional returns
  const [brandHover, setBrandHover] = React.useState(false);
  const [hoveredLink, setHoveredLink] = React.useState(null);

  // Get authChecked and isAuthenticated from Redux store
  const { isAuthenticated, authChecked } = useSelector((state) => state.auth);

  // Wait for auth check to finish before rendering
  if (!authChecked) return null; // Or a spinner if you prefer

  const handleLogout = () => {
    dispatch(logout());
  };

  // GLASSY, TRANSPARENT NAVBAR STYLE!
  const navStyle = {
    background: "rgba(10,22,10,0.14)", // subtle glassy green-black
    backdropFilter: "blur(10px) saturate(180%)",
    WebkitBackdropFilter: "blur(10px) saturate(180%)",
    boxShadow: "0 2px 24px 0 rgba(0,0,0,0.10)", // minimal shadow, not a "bar"
    borderBottom: "1px solid rgba(60,255,100,0.08)",
    color: "#eee",
    padding: "0.5rem 2vw",
    position: "sticky",
    top: 0,
    zIndex: 999,
    transition: "background 0.3s"
  };

  const brandStyle = {
    color: "#6fff6f",
    fontWeight: "700",
    fontSize: "1.4rem",
    textDecoration: "none",
    letterSpacing: "0.03em",
    transition: "color 0.3s"
  };

  const brandHoverStyle = {
    color: "#bbffbb"
  };

  const navUlStyle = {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    listStyleType: "none",
    paddingLeft: 0,
    marginBottom: 0,
  };

  const navItemStyle = {
    color: "#eee",
    fontWeight: "600",
    padding: "0.5rem 0.75rem",
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.3s, background 0.2s",
    background: "none",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    fontFamily: "inherit",
    boxShadow: "none",
    borderRadius: "8px"
  };

  const navItemHoverStyle = {
    color: "#2fff8a",
    background: "rgba(60,255,100,0.08)",
    textDecoration: "none",
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navStyle}>
      <div
        className="container-fluid"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Link
          to="/"
          style={brandHover ? { ...brandStyle, ...brandHoverStyle } : brandStyle}
          onMouseEnter={() => setBrandHover(true)}
          onMouseLeave={() => setBrandHover(false)}
        >
          Articles Heaven
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "#333" }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav" style={{ flexGrow: 1 }}>
          <ul style={navUlStyle}>
            <li className="nav-item" style={{ listStyle: "none" }}>
              <Link
                to="/"
                aria-current="page"
                className="nav-link active"
                style={
                  hoveredLink === "home"
                    ? { ...navItemStyle, ...navItemHoverStyle }
                    : navItemStyle
                }
                onMouseEnter={() => setHoveredLink("home")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Home
              </Link>
            </li>

            <li className="nav-item" style={{ listStyle: "none" }}>
              <Link
                to="/dashboard"
                className="nav-link"
                style={
                  hoveredLink === "dashboard"
                    ? { ...navItemStyle, ...navItemHoverStyle }
                    : navItemStyle
                }
                onMouseEnter={() => setHoveredLink("dashboard")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item" style={{ listStyle: "none" }}>
              <Link
                to="/articles"
                className="nav-link"
                style={
                  hoveredLink === "articles"
                    ? { ...navItemStyle, ...navItemHoverStyle }
                    : navItemStyle
                }
                onMouseEnter={() => setHoveredLink("articles")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Articles
              </Link>
            </li>

            {isAuthenticated ? (
              <li style={{ listStyle: "none" }}>
                <button
                  onClick={handleLogout}
                  style={
                    hoveredLink === "logout"
                      ? { ...navItemStyle, ...navItemHoverStyle }
                      : navItemStyle
                  }
                  onMouseEnter={() => setHoveredLink("logout")}
                  onMouseLeave={() => setHoveredLink(null)}
                  onFocus={() => setHoveredLink("logout")}
                  onBlur={() => setHoveredLink(null)}
                  type="button"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li style={{ listStyle: "none" }}>
                  <Link
                    to="/login"
                    className="nav-link"
                    style={
                      hoveredLink === "login"
                        ? { ...navItemStyle, ...navItemHoverStyle }
                        : navItemStyle
                    }
                    onMouseEnter={() => setHoveredLink("login")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Login
                  </Link>
                </li>
                <li style={{ listStyle: "none" }}>
                  <Link
                    to="/signup"
                    className="nav-link"
                    style={
                      hoveredLink === "signup"
                        ? { ...navItemStyle, ...navItemHoverStyle }
                        : navItemStyle
                    }
                    onMouseEnter={() => setHoveredLink("signup")}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;