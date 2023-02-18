import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/auth";

// {useNavigate}
// const navigate = useNavigate()
// navigate('/algo')

// Las props vienen del mapeo antes del export default
// Trae 
function Login({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const changeInputs = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) return <Navigate to="/redirect" replace={true} />;

  return (
    <div className="auth">
      <HelmetProvider>
        <Helmet>
          <title>Open House | Login</title>
          <meta name="description" content="Login page" />
        </Helmet>
        <h1 className="auth__title">Login</h1>
        <p className="auth__lead">Sign into your account</p>
        <form className="auth__form" onSubmit={submitForm}>
          <div className="auth__form__group">
            <input
              type="email"
              className="auth__form__input"
              name="email"
              placeholder="email"
              value={email}
              onChange={changeInputs}
              required
            />
          </div>
          <div className="auth__form__group">
            <input
              type="password"
              className="auth__form__input"
              placeholder="password"
              name="password"
              value={password}
              onChange={changeInputs}
              minLength="6"
              required
            />
          </div>
          <button className="auth__form__button">Login</button>
        </form>
        <p className="auth__authtext">
          Don't have an account?{" "}
          <Link className="auth__authtext__link" to="/signup">
            Sign Up
          </Link>
        </p>
      </HelmetProvider>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
