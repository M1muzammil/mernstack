import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import "./login.css";
import { Link } from 'react-router-dom';
import myImage from '../images/office.png'; 
// const baseUrl = "http://localhost:3000";
import { GlobalContext } from '../../context/context'



const Login = () => {
  let { state, dispatch } = useContext(GlobalContext);
  
    const emailInputRef = useRef(null);
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
          `/api/v1/login`,
          {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
          },
          {
            withCredentials: true,
          }
        );
  
        dispatch({
          type: "USER_LOGIN",
          payload: response.data.data,
        });
  
        console.log("resp: ", response?.data?.message);
        setAlertMessage(response?.data?.message);
        window.location.pathname = "/"
      } catch (e) {
        console.log(e);
        setErrorMessage(e.response?.data?.message);
      }
    };
  
  return (
    <div className='mainsignup'>



          

    <div className="middle text">
    <form id="loginForm" onSubmit={LoginSubmitHandler}>
<h1 className='text'>welcome back</h1>



<h1>login</h1>  
<h1>{state.name}</h1>

<label htmlFor="email">Email</label>
<br />
<input ref={emailInputRef} type="email" autoComplete="email" name="emailInput" id="emailInput" required />
<br />
<label htmlFor="firstname"> Password</label>
<br />
<input
          ref={passwordInputRef}
          type="password"
          autoComplete="current-password"
          name="passwordInput"
          id="passwordInput"
        />

<br />
<p>don't have any account<Link to="/Signup">Signup</Link></p>
<button>submit</button>

</form>



<div className="img">
<img width={300} height={350} src={myImage} alt="My Image" />
</div>








        
    </div>






    </div>
  );
};

export default Login;

