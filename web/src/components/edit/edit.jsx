
import { BsChat, BsCloudHaze2Fill, BsGithub, BsFacebook, BsLinkedin, BsPersonFill } from 'react-icons/bs'


import { useState, useRef, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/context"

import axios from "axios";
import './edit.css'



const Edit = () => {

  const { state, dispatch } = useContext(GlobalContext);

// console.log(state);

    const postTitleInputRef = useRef(null);
    const postBodyInputRef = useRef(null);
    const postFileInputRef = useRef(null);
    // const [allPosts, setAllPosts] = useState([]);
    const [toggleRefresh, setToggleRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  

  const [selectedImage, setSelectedImage] = useState("");

// old code 
    // const submitHandler = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //       setIsLoading(true);
    //       const response = await axios.post(`/api/v1/post`, {
    //         title: postTitleInputRef.current.value,
    //         text: postBodyInputRef.current.value,
    //       });
    
    //       setIsLoading(false);
    //       console.log(response.data);
    //       setAlert(response.data.message);
    //       setToggleRefresh(!toggleRefresh);
    //       postTitleInputRef.current.value = "";
    //       postBodyInputRef.current.value = "";
    //       // getAllPost();
    //     } catch (error) {
    //       // handle error
    //       console.log(error?.data);
    //       setIsLoading(false);
    //     }
    //   };
    



    // new submit code because i add file upload


    const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
        setIsLoading(true);
  
        // const response = await axios.post(`${baseUrl}/api/v1/post`, {
        //   title: postTitleInputRef.current.value,
        //   text: postBodyInputRef.current.value,
        // });
  
        let formData = new FormData();
  
        formData.append("title", postTitleInputRef.current.value);
        formData.append("text", postBodyInputRef.current.value);
        formData.append("image", postFileInputRef.current.files[0]);
        formData.append("firstName", state.user.firstName);
        formData.append("lastName", state.user.lastName);

  
        const response = await axios.post(
          `/api/v1/post`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
  
        setIsLoading(false);
        console.log(response.data);
        setAlert(response.data.message);
        setToggleRefresh(!toggleRefresh);
        // getAllPost();
        setSelectedImage("");
        e.target.reset();
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
<label htmlFor="postFileInput"> Photo:</label>
        <input ref={postFileInputRef} id="postFileInput" type="file" name="postFileInput"
          accept="image/*" onChange={(e) => {
            const base64Url = URL.createObjectURL(e.target.files[0]);
            setSelectedImage(base64Url)
          }} />

        <br />

        {selectedImage && <img width={400} src={selectedImage} alt="selected image" />}

        <br />

<button>submit</button>
</form>





        </div>








    );
}
export default Edit;