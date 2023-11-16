import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SuggestionBox from "../../suggest/suggestion";
import muzammil from "./muzammil.jpg";
import "./home.css";
import { BsHandThumbsUp,BsShare,BsChatLeftDots, BsPersonCircle ,BsPerson, BsGithub, BsFacebook, BsLinkedin, BsPersonFill }from 'react-icons/bs'

const Home = () => {
  const searchInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const [allPosts, setAllPosts] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  // const [showSuggestions, setShowSuggestions] = useState(false);
  function formatTimeDifference(timestamp) {
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const timeDifference = (currentTime - postTime) / 1000; // in seconds
  
    if (timeDifference < 60) {
      return `${Math.floor(timeDifference)} seconds ago`;
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      // You can add more granular time formatting if needed
      const days = Math.floor(timeDifference / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }
  

  const getAllPost = async () => {

    try {
      setIsLoading(true);
      const response = await axios.get(`/api/v1/posts`);
      setIsLoading(false);
      setAllPosts([...response.data]);
      console.log(response.data.username)
    } catch (error) {
      console.log(error.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPost();
  }, [toggleRefresh]);

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/v1/search?q=${searchInputRef.current.value}`);
      setIsLoading(false);
      setAllPosts([...response.data]);
      // setSuggestions(response.data.map((post) => post.title));
     
    } catch (error) {
      console.log(error.data);
      setIsLoading(false);
    }
  };

  // const handleMouseEnter = () => {
  //   setShowSuggestions(true);
  // };
  const doLikeHandler = async (_id) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/v1/post/${_id}/dolike`);
      setIsLoading(false);
      console.log(response.data);
      setAlert(response.data.message);
      setToggleRefresh(!toggleRefresh); // Toggle the toggleRefresh state
    } catch (error) {
      // Handle the error
      console.log(error?.data);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="div">
      <form onSubmit={searchHandler} className="searchdiv">
        <img width={50} src={muzammil} alt="" />
        <input
          type="search"
          placeholder="search blog here"
          ref={searchInputRef}
          // onBlur={() => setShowSuggestions(false)}
        
        />
        <span>
          <a id="hide" href="https://github.com/M1muzammil">
            <BsGithub />
          </a>
          <a id="hide" href="https://www.facebook.com/profile.php?id=100068184127760&mibextid=V3Yony">
            <BsFacebook />
          </a>
          <a href="https://www.linkedin.com/in/muzammil-ali-28a943265/">
            <BsLinkedin />
          </a>
        </span>
      </form>
      {/* <span className="search">
        {showSuggestions && <SuggestionBox suggestions={suggestions} />}
      </span> */}
      <div>
        <h1>All Blogs</h1>
      </div>
      <div className="bich">
        {allPosts.map((post) => (
          <div key={post._id} className="post">
            <div className="postbaner">
<div className="profilemain">
 <span><h1><BsPersonCircle/>
  </h1><p>{`${post.firstName} ${post.lastName}`}</p></span> 
  <p>{formatTimeDifference(post.time)}</p>
  
</div>

               <h2>{post.title}</h2> 
              <p>{post.text}</p>
              {post.img &&
                  <>
                    <img width={300} src={post.img} alt="post image" />
                    <br />
                  </>
                }
              <div className="postbanerbuttons">
              
<button 
 onClick={(e) => {
  doLikeHandler(post._id);
}}
><BsHandThumbsUp/>{post?.likes?.length}</button>
<button><BsChatLeftDots/></button>
<button><BsShare/></button>
            </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;