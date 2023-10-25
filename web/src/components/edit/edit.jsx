
import { BsChat, BsCloudHaze2Fill, BsGithub, BsFacebook, BsLinkedin, BsPersonFill } from 'react-icons/bs'


import { useState, useRef, useEffect } from "react";

import axios from "axios";
import './edit.css'



const Edit = () => {




    const postTitleInputRef = useRef(null);
    const postBodyInputRef = useRef(null);
    const [allPosts, setAllPosts] = useState([]);
    const [toggleRefresh, setToggleRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  



    const submitHandler = async (e) => {
        e.preventDefault();
    
        try {
          setIsLoading(true);
          const response = await axios.post(`/api/v1/post`, {
            title: postTitleInputRef.current.value,
            text: postBodyInputRef.current.value,
          });
    
          setIsLoading(false);
          console.log(response.data);
          setAlert(response.data.message);
          setToggleRefresh(!toggleRefresh);
          postTitleInputRef.current.value = "";
          postBodyInputRef.current.value = "";
          // getAllPost();
        } catch (error) {
          // handle error
          console.log(error?.data);
          setIsLoading(false);
        }
      };
    

    return (
        <div className='edit'>
            <h1 id='heading'>
        
        Start Blooging 
        </h1>   
           
          <form id='edit' onSubmit={submitHandler}>

          


<input type="text" placeholder='TITTLE'
  ref={postTitleInputRef}
  required />
<br />
<input type="text" placeholder='TEXT'
  ref={postBodyInputRef}
  required />
<br />
<input type="up" />

<button>submit</button>
</form>





        </div>








    );
}
export default Edit;