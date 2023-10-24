import { BsChat, BsCloudHaze2Fill, BsGithub, BsFacebook, BsLinkedin, BsPersonFill } from 'react-icons/bs'
import muzammil from "./muzammil.jpg"
import './home.css'
import { useState, useRef, useEffect } from "react";

import axios from "axios";
import SuggestionBox from "../../suggest/suggestion"


const Home = () => {


 
  const searchInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  const [allPosts, setAllPosts] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


  const getAllPost = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/v1/posts`);
      console.log(response.data);

      setIsLoading(false);
      setAllPosts([...response.data]);
    } catch (error) {
      console.log(error.data);
      setIsLoading(false);
    }
  };










  useEffect(() => {
    getAllPost();

    return () => {

    };
  }, [toggleRefresh]);

  const deletePostHandler = async (_id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/v1/post/${_id}`);
  
      setIsLoading(false);
      console.log(response.data);
      setAlert(response.data.message);
      setToggleRefresh(!toggleRefresh);
    } catch (error) {
      console.log(error?.data);
      setIsLoading(false);
    }
  };
  
  // const deletePostHandler = async (_id) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.delete(`/api/v1/post/${_id}`, {
  //       title: postTitleInputRef.current.value,
  //       text: postBodyInputRef.current.value,
  //     });

  //     setIsLoading(false);
  //     console.log(response.data);
  //     setAlert(response.data.message);
  //     setToggleRefresh(!toggleRefresh);
  //   } catch (error) {
  //     // handle error
  //     console.log(error?.data);
  //     setIsLoading(false);
  //   }
  // };

 



  const editSaveSubmitHandler = async (e) => {
    e.preventDefault();
    const _id = e.target.elements[0].value;
    const title = e.target.elements[1].value;
    const text = e.target.elements[2].value;

    try {
      setIsLoading(true);
      const response = await axios.put(`/api/v1/post/${_id}`, {
        title: title,
        text: text,
      });

      setIsLoading(false);
      console.log(response.data);
      setAlert(response?.data?.message);
      setToggleRefresh(!toggleRefresh);

      // Find and update the post in your local state (allPosts)
      const updatedPosts = allPosts.map((post) =>
        post._id === _id ? { ...post, title, text, isEdit: false } : post
      );
      setAllPosts(updatedPosts);
    } catch (error) {
      console.log(error?.data);
      setIsLoading(false);
    }
  };
 

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/v1/search?q=${searchInputRef.current.value}`);
      // console.log(response.data);

      setIsLoading(false);
      setAllPosts([...response.data]);

      // Display suggestions based on the response data
      setSuggestions(response.data.map(post => post.title));
      setShowSuggestions(true);
    } catch (error) {
      console.log(error.data);
      setIsLoading(false);
    }



  };

  const handleMouseEnter = () => {
    setShowSuggestions(true);
  };

  const handleMouseLeave = () => {
    setShowSuggestions(false);
  };





  // const createdAt = new Date("2023-09-21T12:34:56.789Z");
  // const formatTimeDifference = (creationDate) => {
  //   console.log("formatTimeDifference is called"); // Add this line for debugging
  //   const currentDate = new Date();
  //   return formatDistanceToNow(new Date(creationDate), { addSuffix: true });
  // };




















  return (
    <div className='div'>

      <form onSubmit={searchHandler} className="searchdiv">
        <img width={50} src={muzammil} alt="" />
        <input type="search" placeholder='search blog here' ref={searchInputRef}
          //  onFocus={() => setShowSuggestions(true)} 
          onBlur={() => setShowSuggestions(false)}
          onMouseEnter={handleMouseEnter}
        //  onMouseLeave={handleMouseLeave}
        />




        <span>
          <a id='hide' href="https://github.com/M1muzammil"><BsGithub /></a>
          <a id='hide' href="https://www.facebook.com/profile.php?id=100068184127760&mibextid=V3Yony"><BsFacebook /></a>
          <a href="https://www.linkedin.com/in/muzammil-ali-28a943265/"><BsLinkedin /></a>
        </span>
      </form>
      <span className='search'>
        {showSuggestions && (
          <SuggestionBox suggestions={suggestions} />
        )}</span>
     
      <div>
        

        <h1>All Blogs</h1>

      </div>

      <div>
        {allPosts.map((post, index) => (
          <div key={post._id} className="post">
           {post.isEdit ? (
  <form onSubmit={editSaveSubmitHandler} className="postbanerr">
    <input type="text" disabled value={post._id} hidden />
    <input defaultValue={post.title} type="text" name="title" placeholder="title" />
    <br />
    <textarea defaultValue={post.text} type="text" name="text" placeholder="body" />
    <br />
    <button
    
    
    id='blue' type="submit"
    onClick={() => {
      // Toggle isEdit to false when canceling
      post.isEdit = true;
      setAllPosts([...allPosts]);
    }}
    >Save</button>
    <button
      id='blue'
      type="button"
      onClick={() => {
        // Toggle isEdit to false when canceling
        post.isEdit = false;
        setAllPosts([...allPosts]);
      }}
    >
      Cancel
    </button>
  </form>
) : (
  <div>
    <div className='postbaner'>
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <div className="postbutton">
        <button
          onClick={(e) => {
            console.log("click");
            // Toggle isEdit to true when editing
            post.isEdit = true;
            setAllPosts([...allPosts]);
          }}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            deletePostHandler(post._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

          </div>
        ))}

        <br />
      </div>
    </div>









  )
}
export default Home
