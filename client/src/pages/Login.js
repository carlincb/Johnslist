import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import "./login.css";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <section className="login-page">
      <div className="form-login">
        <div className="title-login">
          <h2 className="transform-login">L</h2>
          <h2 className="transform-login">O</h2>
          <h2 className="transform-login">G</h2>
          <h2 className="transform-login">&nbsp;I</h2>
          <h2 className="transform-login">N</h2>
        </div>
        <div className="login-form-container">
          <form onSubmit={handleFormSubmit}>
            <div>
              <img className="imageLogoLogin" src="/images/kintsugi_logo.png" />
            </div>
            <div>
              <br />
              <br />
              <label htmlFor="email">Email address:</label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="pwd">Password:</label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
            {error ? (
              <div>
                <p className="error-text">
                  The provided credentials are incorrect
                </p>
              </div>
            ) : null}
            <div className="">
              <button className="Submit-Login" type="submit">
                Submit
              </button>
              <Link className="Signup-Link" to="/signup">
                ← Go to Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
