import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = ({ setCinema, setLogged }) => {
  const username = useRef("");
  const password = useRef("");

  const URL="http://localhost:3001/"

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    const user = username.current.value;
    const pass = password.current.value;
    /* console.log("login value nel submit", user, pass); */

    if (!username || !password) {
      alert("campi vuoti");
      return;
    }

    /* console.log("sono nel submit"); */

    try {
      const result = await Axios.post(URL, {
        username: username.current.value,
        password: password.current.value,
      })
        .then((res) => {
          /* console.log("login respone",res.data); */
          setCinema(res.data);
          setLogged(true)
          return navigate("/tracing");
        })
        .catch((e) => {
          alert(e.response.data);
          username.current.focus();
          username.current.value = "";
          password.current.value = "";
          return
        });
    } catch (error) {
      alert(error);
      return;
    }
  };

  useEffect(() => {});

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="login-form bg-light mt-4 p-4">
            <form className="row g-3" onSubmit={onSubmit}>
              <h4>Login for start to tracing</h4>
              <div className="col-12">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  ref={username}
                  /* onChange={(event)=>setUser(event.currentTarget.value)} */
                />
              </div>
              <div className="col-12">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  ref={password}
                  /* onChange={(event)=>password=event.current.value} */
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-dark float-end">
                  Login
                </button>
              </div>
            </form>
            <hr className="mt-4" />
            <div className="col-6">
              <p className="text-end mb-0 fs-6">dev by Fabio Conti</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
