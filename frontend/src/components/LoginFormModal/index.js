import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory, Link } from "react-router-dom";



function LoginFormModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoLogin = (e) => {
    e.preventDefault();
    const demoCred = {
      credential: 'user1',
      password: 'password1'
    };

    setCredential(demoCred["credential"]);
    setPassword(demoCred["password"]);

    dispatch(sessionActions.login(demoCred))
      .then(closeModal)
      .then(history.push('/workspace'))
  };

  return (
    <div className="login-form">
      <h1 style={{ fontFamily: 'Montserrat' }}>Log In</h1>
      <form onSubmit={handleSubmit} className="form-login">
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className="errors">{errors.credential}</p>
        )}
        <button type="submit" className="login-btn">Log In</button>
      </form>
      <div className="demo-btn">
        <span>Or Login as  <span className="demo-text" onClick={demoLogin}>DemoUser</span> </span>
      </div>
    </div>
  );
}

export default LoginFormModal;
