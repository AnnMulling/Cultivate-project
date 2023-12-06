import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SignupFormModal from '../SignupFormModal';


function LoginFormModal() {
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

  const demoLogin = () => {
    setCredential('user1');
    setPassword('password1');
  };

  return (
    <>
      <h1 style={{fontFamily:'Montserrat'}}>Log In</h1>
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
      {/* <button onClick={demoLogin} type="submit" className="demo-btn">DemoUser</button> */}
      <div className="demo-btn">
        Don't have an account? Login as
        <span onClick={demoLogin} style={{marginLeft:10, fontWeight:400, cursor:"pointer", color:"#26268f"}}>DemoUser</span>
      </div>
    </>
  );
}

export default LoginFormModal;
