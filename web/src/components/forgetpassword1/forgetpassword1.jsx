 import "./forgetpassword1.css"
import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../../context/context";

const Firstattempt = () => {
  const navigate = useNavigate();
  let { state, dispatch } = useContext(GlobalContext);
  const emailInputRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setAlertMessage("");
      setErrorMessage("");
    }, 5000);
  }, [alertMessage, errorMessage]);

  const ForgetPasswordSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/v1/forget-password`,
        { email: emailInputRef.current.value }
      );

      console.log("resp: ", response?.data?.message);
      setAlertMessage(response?.data?.message);
      const otp = response.data.otp;

      navigate("/password", {
        state: { email: emailInputRef.current.value, otp: otp },
      });

    } catch (e) {
      console.log(e);
      setErrorMessage(e.response?.data?.message);
    }
  };

  return (
    <div className="password1">
      <form id="password1" onSubmit={ForgetPasswordSubmitHandler}>
        <label htmlFor="emailInput">Email:(enter a valid email)</label>
        <input
          placeholder="muzammilali76@gmail.com"
          ref={emailInputRef}
          type="email"
          autoComplete="email"
          name="emailInput"
          id="emailInput"
          required
        />
        <button id="password1" type="submit">
          Next
        </button>
        <div className="alertMessage">{alertMessage}</div>
      </form>
    </div>
  );
};

export default Firstattempt;
