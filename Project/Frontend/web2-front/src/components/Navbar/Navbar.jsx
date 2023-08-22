import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const context = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    context.onLogout();
  };

  return (
    <nav className={classes.navbar}>
      <ul className={classes.navList}>
        {context.token && (
          <li className={classes.navItem}>
            <Link to="/home" className={classes.link}>
              Home
            </Link>
          </li>
        )}
        <li className={classes.navItem}>
          {context.token ? (
            <Link to="/profile" className={classes.link}>
              Profile
            </Link>
          ) : (
            <Link to="/register" className={classes.link}>
              Register
            </Link>
          )}
        </li>
        <li className={classes.navItem}>
          {context.token ? (
            <button onClick={handleLogout} className={classes.logoutButton}>
              Logout
            </button>
          ) : (
            <Link to="/login" className={classes.link}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
