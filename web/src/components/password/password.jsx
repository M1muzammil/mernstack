import "./password.css"
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { GlobalContext } from "../../context/context";



const Lastattepmt = () => {
  const navigate = useNavigate();

  const location = useLocation();
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
    }
  };

  return (
    <div className="password2">
    

      <form id="password2" onSubmit={LoginSubmitHandler}>
        <label htmlFor="emailInput">Email:</label>
        <input value={location.state.email} ref={emailInputRef} disabled type="email" autoComplete="email" name="emailInput" id="emailInput" required />

        <br />
        <label htmlFor="otpInput">OTP:</label>
        <input
          ref={otpInputRef}
          type="text"
          autoComplete="one-time-code"
          name="otpInput"
          id="otpInput"
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

        <button id="updatepassword" type="submit">Update password</button>

        <div className="alertMessage">{alertMessage}</div>
        <div className="errorMessage">{errorMessage}</div>
      </form>
    </div>
  );
};

export default Lastattepmt;