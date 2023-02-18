import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { setAlert } from "../actions/alert";
import { signup } from "../actions/auth";
import PropTypes from "prop-types";

function SignUp({ setAlert, signup, isAuthenticated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const changeInputs = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "error");
    } else {
      signup({ name, email, password, password2 });
    }
  };

  if (isAuthenticated) return <Navigate to="/" replace={true} />;

  return (
    <div className="auth">
      <HelmetProvider>
        <Helmet>
          <title>Open House | Sign Up</title>
          <meta name="description" content="Sign up page" />
        </Helmet>
        <h1 className="auth__title">Sign Up</h1>
        <p className="auth__lead">Create your account</p>
        <form className="auth__form" onSubmit={submitForm}>
          <div className="auth__form__group">
            <input
              type="name"
              className="auth__form__input"
              name="name"
              placeholder="name"
              value={name}
              onChange={changeInputs}
              required
            />
          </div>
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
            />
          </div>
          <div className="auth__form__group">
            <input
              type="password2"
              className="auth__form__input"
              placeholder="confirm password"
              name="password2"
              value={password2}
              onChange={changeInputs}
            />
          </div>
          <button className="auth__form__button">Register</button>
        </form>
        <p className="auth__authtext">
          Already have an account?{" "}
          <Link className="auth__authtext__link" to="/login">
            Sign In
          </Link>
        </p>
      </HelmetProvider>
    </div>
  );
}

SignUp.propTypes = {
    setAlert : PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
export default connect(mapStateToProps, { setAlert, signup })(SignUp);
