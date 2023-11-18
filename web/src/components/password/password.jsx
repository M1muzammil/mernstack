

// Lastattepmt.jsx
import "./password.css"
import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalContext } from "../../context/context";
import Swal from "sweetalert2";

const Lastattepmt = () => {
  const location = useLocation();
  const otp = location.state.otp;
  console.log("otp", otp);
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      icon: "info",
      text: "Your OTP code dont share it",
      title: otp,
      showConfirmButton: true,
      confirmButtonColor: "#284352",
      confirmButtonText: "Ok",
    });
  }, [otp]);

  console.log("email: ", location.state.email);
  let { state, dispatch } = useContext(GlobalContext);
  const emailInputRef = useRef(null);
  const otpInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setAlertMessage("");
      setErrorMessage("");
    }, 5000);
  }, [alertMessage, errorMessage]);

  const LoginSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/v1/forget-password-complete`,
        {
          email: emailInputRef.current.value,
          otpCode: otpInputRef.current.value,
          newPassword: passwordInputRef.current.value,
        }
      );

      console.log("resp: ", response?.data?.message);
      setAlertMessage(response?.data?.message);
      navigate(`/Login`);

    } catch (e) {
      console.log(e);
      setErrorMessage(e.response?.data?.message);
      console.log("loginotp ", e )
    }
  };

  return (
    <div className="password2">
      <form id="password2" onSubmit={LoginSubmitHandler}>
        <label htmlFor="emailInput">Email:</label>
        <input
          value={location.state.email}
          ref={emailInputRef}
          disabled
          type="email"
          autoComplete="email"
          name="emailInput"
          id="emailInput"
          required
        />
        <br />
        <label htmlFor="otpInput">OTP:</label>
        <input
          ref={otpInputRef}
          type="text"
          autoComplete="one-time-code"
          name="otpInput"
          id="otpInput"
          value={location.state.otp}
        />
        <br />
        <label htmlFor="passwordInput">Password:</label>
        <input
          ref={passwordInputRef}
          type="password"
          autoComplete="new-password"
          name="passwordInput"
          id="passwordInput"
        />
        <br />
        <button id="updatepassword" type="submit">
          Update password
        </button>
        <div className="alertMessage">{alertMessage}</div>
        <div className="errorMessage">{errorMessage}</div>
      </form>
    </div>
  );
};

export default Lastattepmt;
