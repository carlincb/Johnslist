import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import "./signup.css";

function Signup(props) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "gallaghj",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="signup-page">
      <div className="form-signup">
        <div className="title-signup">
          <h2 className="transform-signup1">SIGNUP</h2>
          <h2 className="transform-signup">S</h2>
          <h2 className="transform-signup">&nbsp;I</h2>
          <h2 className="transform-signup">G</h2>
          <h2 className="transform-signup">N</h2>
          <h2 className="transform-signup">U</h2>
          <h2 className="transform-signup">P</h2>
        </div>
        <div className="signup-form-container">
          <form onSubmit={handleFormSubmit}>
            <div>
              <img className="imageLogoLogin" src="/images/kintsugi_logo.png" />
            </div>
            <br />
            <br />
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                placeholder="First"
                name="firstName"
                type="firstName"
                id="firstName"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="lastName">Last Name:</label>
              <input
                placeholder="Last"
                name="lastName"
                type="lastName"
                id="lastName"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="firstName">Username:</label>
              <input
                placeholder="Username"
                name="username"
                type="firstName"
                id="firstName"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="email">Email:</label>
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
            <div className="">
              <button className="Submit-Signup" type="submit">
                Submit
              </button>
            </div>
            <Link className="Login-Link" to="/login">
              ← Go to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
