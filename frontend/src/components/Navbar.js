import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { checkAuthenticated, loadUser, logout } from "../store/auth";

const Navbar = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthenticated());
    isAuthenticated && dispatch(loadUser());
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const navStyle = {
    backgroundColor: "#1e1e1e",
    color: "#eee",
    boxShadow: "0 2px 8px rgba(0,0,0,0.8)",
  };

  const brandStyle = {
    color: "#a5d6a7",
    fontWeight: "700",
    fontSize: "1.4rem",
    textDecoration: "none",
  };

  const brandHoverStyle = {
    color: "#4caf50",
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
    transition: "color 0.3s ease",
    background: "none",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    fontFamily: "inherit",
    boxShadow: "none",
  };

  const navItemHoverStyle = {
    color: "#4caf50",
    textDecoration: "none",
  };

  const [brandHover, setBrandHover] = React.useState(false);
  const [hoveredLink, setHoveredLink] = React.useState(null);

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
