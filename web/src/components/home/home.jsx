import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SuggestionBox from "../../suggest/suggestion";
import muzammil from "./muzammil.jpg";
import "./home.css";
import { BsHandThumbsUp,BsShare,BsChatLeftDots, BsGithub, BsFacebook, BsLinkedin, BsPersonFill } from 'react-icons/bs'
const Home = () => {
  const searchInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getAllPost = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/v1/posts`);
      setIsLoading(false);
      setAllPosts([...response.data]);
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
      setSuggestions(response.data.map((post) => post.title));
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

  return (
    <div className="div">
      <form onSubmit={searchHandler} className="searchdiv">
        <img width={50} src={muzammil} alt="" />
        <input
          type="search"
          placeholder="search blog here"
          ref={searchInputRef}
          onBlur={() => setShowSuggestions(false)}
          onMouseEnter={handleMouseEnter}
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
      <span className="search">
        {showSuggestions && <SuggestionBox suggestions={suggestions} />}
      </span>
      <div>
        <h1>All Blogs</h1>
      </div>
      <div>
        {allPosts.map((post) => (
          <div key={post._id} className="post">
            <div className="postbaner">
              <h2>{post.title}</h2>
              <p>{post.text}</p>
              <div className="postbanerbuttons">
<button><BsHandThumbsUp/></button>
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
