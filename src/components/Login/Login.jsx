import React, { useState } from "react";
import axios from "../../api/axios";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then((resp) => {
        if (resp.data.status == "ok") {
          localStorage.setItem("token", resp.data.user);
          window.location.replace("/chat");
        } else if (resp.data.status == "error") {
          setError(resp.data.msg);
        }
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div
      id="main"
      className="h-100 d-flex flex-column align-items-center justify-content-center"
    >
      <div id="title" className="display-1">
        Login
      </div>

      <div className="card mt-2">
        <div className="card-body">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : null}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
      <a href="/Register" className="link-primary">
        Register
      </a>
    </div>
  );
}

export default Login;
