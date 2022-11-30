import React, { useState } from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;

  }

  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">

      <form onSubmit={onSubmit}>
        <label>Email:</label>
        <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <div className="form-group" >
         <input
           type="submit"
           value="login"
           disabled={!validateForm()}
           className="btn btn-primary"/>
        </div>
      </form>
    </div>

    /* STILL NEEDS TO BE LINKED TO LOGGING IN */

  );

}