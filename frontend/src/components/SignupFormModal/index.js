import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";

//img
import logo from '../../assets/c-plain.png'
import google from '../../assets/google.png'


import "./SignupForm.css";


function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="form-main-container">
      <div className="form-sub-container">
          <img src={logo} alt="logo" className="logo" />
          <h2 style={{ fontFamily: 'Montserrat' }}>Sign Up to continue</h2>
          <form onSubmit={handleSubmit} className="form-signup">
              <label>
                  Email
                  <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
              </label>
              {errors.email && <p className="errors">{errors.email}</p>}
              <label>
                  Username
                  <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                  />
              </label>
              {errors.username && <p className="errors">{errors.username}</p>}
              <label>
                  First Name
                  <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                  />
              </label>
              {errors.firstName && <p className="errors">{errors.firstName}</p>}
              <label>
                  Last Name
                  <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                  />
              </label>
              {errors.lastName && <p className="errors">{errors.lastName}</p>}
              <label>
                  Password
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
              </label>
              {errors.password && <p className="errors">{errors.password}</p>}
              <label>
                  Confirm Password
                  <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                  />
              </label>
              {errors.confirmPassword && (
                  <p className="errors">{errors.confirmPassword}</p>
              )}
              <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <div className="signup-btns">
              {/* <h3 style={{fontFamily:'Montserrat'}}>Or continue with</h3> */}
              <span>Or continue with <img src={google} alt="google-icon" /></span>
              <span  >Already have an account?
                  <div style={{ marginLeft: 10, cursor: "pointer" }}>
                    <OpenModalMenuItem
                    itemText="Login"
                    modalComponent={<LoginFormModal />}
                    />
                  </div>
             </span>
          </div>
      </div>
    </div>
  );
}

export default SignupFormModal;
