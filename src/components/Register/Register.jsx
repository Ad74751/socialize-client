import { React, useState } from "react";
import "./Register.css";
import axios from "../../api/axios";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/register", {
        name: username,
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
        setUsername("");
      });
  };
  return (
    <div
      id="main"
      className="h-100 d-flex flex-column align-items-center justify-content-center"
    >
      <div id="title" className="display-1 mb-2">
        Register
      </div>

      <div className="card mt-1">
        <div className="card-body">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : null}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userNameInput" className="htm-label">
                Username
              </label>
              <input
                value={username}
                onInput={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control"
                id="userNameInput"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email address
              </label>
              <input
                value={email}
                onInput={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="emailInput"
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
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="passwordInput"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
