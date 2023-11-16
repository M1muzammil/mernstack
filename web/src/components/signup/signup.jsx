import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import './signup.css'
import { Link } from 'react-router-dom';
import '../login/login'
import myImage from '../images/office.png'; 
import Login from "../login/login";

const Signup = () => {
    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const repeatPasswordInputRef = useRef(null);


    const [passwordErrorClass, setPasswordErrorClass] = useState("hidden");
    const [alertMessage, setAlertMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    useEffect(() => {
      setTimeout(() => {
        setAlertMessage("");
        setErrorMessage("");
      }, 5000);
    }, [alertMessage, errorMessage]);







    



    const SignupSubmitHandler = async (e) => {
        e.preventDefault();
       

        console.log("Signup submit handler");
    
        if (passwordInputRef.current.value !== repeatPasswordInputRef.current.value) {
          setPasswordErrorClass("");
          return;
        } else {
          setPasswordErrorClass("hidden");
        }
    
        try {
          const response = await axios.post(`/api/v1/signup`, {
            firstName: firstNameInputRef.current.value,
            lastName: lastNameInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
          });
    
          if (response && response.data && response.data.message) {
            console.log("resp: ", response.data.message);
            setAlertMessage(response.data.message);
          window.location.pathname = '/Login'
           
          } else {
            // Handle unexpected response structure here
            console.log("Unexpected response structure:", response);
            setErrorMessage("An unexpected error occurred.");
          }
        } catch (e) {
          console.error(e);
          setErrorMessage("An error occurred while processing your request.");
        }
    };
    

    return (
        <div className='mainsignup'>


          

        <div className="middle text">
<form id="signup" onSubmit={SignupSubmitHandler}>
<h1 className='text'>welcome</h1>



<h1>Signup</h1>  
<p>Already have an account  <Link to='/Login' >
              Login
            </Link></p>
    <label htmlFor="firstname"> Firstname</label>
    <br />
<input ref={firstNameInputRef} type="text" 
  autoComplete="given-name"
  name="firstNameInput"
  id="firstNameInput"
  required/>
<br />
<label  htmlFor="lastname"> Lasttname</label>
<br />
<input ref={lastNameInputRef}  autoComplete="family-name"
          name="lastNameInput"
          id="lastNameInput"
          required type="text" />
<br />
<label htmlFor="email"> Email</label>
<br />
<input ref={emailInputRef} type="email"
  autoComplete="email"
   name="emailInput"
    id="emailInput" required/>
<br />
<label  htmlFor="password"> Password</label>
<br />
<input ref={passwordInputRef} type="password" />
<br />
<label htmlFor="repeat password"> Repeat password</label>
<br />
<input ref={repeatPasswordInputRef} type="password" />
<br />

<p className={`errorMessage ${passwordErrorClass}`} id="passwordError">
          Passwords do not match!
        </p>

        <br />

<button>submit</button>
<div className="alertMessage">{alertMessage}</div>
        <div className="errorMessage">{errorMessage}</div>

</form>



<div className="img">
<img width={300} height={350} src={myImage} alt="My Image" />
</div>








            
        </div>






        </div>
    );
}

export default Signup;