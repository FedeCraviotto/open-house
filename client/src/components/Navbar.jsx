import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Alert from "./Alert";
import PropTypes from "prop-types";

function Navbar({ auth: { isAuthenticated, loading }, logout }) {
  const authLinks = (
    <a className="navbar__top__auth__link" href="#!" onClick={logout}>
      Logout
    </a>
  );

  const guestLinks = (
    <>
      <Link className="navbar__top__auth__link" exact='true' to="/login">
        Login
      </Link>
      <Link className="navbar__top__auth__link" exact='true' to="/signup">
        Sign Up
      </Link>
    </>
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar__top">
          <div className="navbar__top__logo">
            <Link className="navbar__top__logo__link" exact='true' to="/">
              Open House
            </Link>
          </div>
          <div className="navbar__top__auth">
            {!loading && (
              <>{isAuthenticated ? authLinks : guestLinks}</>
            )}
          </div>
        </div>
        <div className="navbar__bottom">
            <li className="navbar__bottom__item">
                <NavLink className='navbar__bottom__item__link' exact='true' to='/'>Home</NavLink>
            </li>
            <li className="navbar__bottom__item">
                <NavLink className='navbar__bottom__item__link' exact='true' to='/listings'>Listings</NavLink>
            </li>
            <li className="navbar__bottom__item">
                <NavLink className='navbar__bottom__item__link' exact='true' to='/about'>About</NavLink>
            </li>
            <li className="navbar__bottom__item">
                <NavLink className='navbar__bottom__item__link' exact='true' to='/contact'>Contact</NavLink>
            </li>
        </div>
      </nav>
      <Alert />
    </>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
