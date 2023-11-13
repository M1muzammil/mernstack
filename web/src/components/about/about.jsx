import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsPerson, BsPersonCircle } from 'react-icons/bs'

import { GlobalContext } from '../../context/context';
import './about.css';

const About = () => {
  const { userId } = useParams();

  const { state, dispatch } = useContext(GlobalContext);

  const [userPosts, setUserPosts] = useState([]);
  const [profile, setProfile] = useState([]);

  const [allPosts, setAllPosts] = useState(userPosts);


  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);



  const [toggleRefresh, setToggleRefresh] = useState(false);


  useEffect(() => {
    renderCurrentUserPost(userId);
    getProfile(userId)
    console.log("userid", userId);

    return () => {
      // cleanup function
    };

  }, [userId]);;

  console.log(userId);

  const renderCurrentUserPost = (userId) => {
    console.log("userId:", userId);
    axios.get(`/api/v1/posts/${userId}`)
      .then((response) => {
        const userAllPosts = response.data.results;
        setUserPosts(userAllPosts);
        console.log("response.data", response.data);
      })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  };
  

  const getProfile = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/profile/${userId}`);
      setProfile(response.data.data); // Set the profile to the state
    } catch (error) {
      console.log(error.data);
      setProfile("noUser");
    }
  };



  const deletePostHandler = async (_id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/v1/post/${_id}`);

      setIsLoading(false);
      console.log(response.data);
      setAlert(response.data.message);
      setToggleRefresh(!toggleRefresh);

      // Filter out the deleted post from the local state (userPosts)
      const updatedUserPosts = userPosts.filter((post) => post._id !== _id);
      setUserPosts(updatedUserPosts);

      // Additionally, you should also update allPosts if needed
      const updatedAllPosts = allPosts.filter((post) => post._id !== _id);
      setAllPosts(updatedAllPosts);
    } catch (error) {
      console.log(error?.data);
      setIsLoading(false);
    }
  };









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

  const logout = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/v1/logout`, {});
      if (response.data.success) {
        dispatch({
          type: 'USER_LOGOUT',
        });
        window.location.pathname = './login'
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };














  return (

    <div>
      <div

        className='profileName'>
        <p id="ppp"><BsPersonCircle /></p>
        <h5>{profile ? `${profile.firstName} ${profile.lastName}` : 'Loading...'}</h5>
      </div>
      <button className="logout" onClick={logout}>logout</button>
      <h2>your Posts</h2>




      <div>




      </div>

      <div>
        {userPosts.map((post) => (
          <div key={post._id} className="post">
            {post.isEdit ? (
              <form onSubmit={editSaveSubmitHandler} className="postbanerr">
                <input type="text" disabled value={post._id} hidden />
                <input defaultValue={post.title} type="text" placeholder="title" />
                <br />
                <textarea defaultValue={post.text} type="text" placeholder="body" />
                <br />
                <button


                  id='blue' type="submit">Save</button>
                <button
                  id='blue'
                  type="button"
                  onClick={() => {
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
                  {post.img &&
                    <>
                      <img width={300} src={post.img} alt="post image" />
                      <br />
                    </>
                  }
                  <div className="userbutton">
                    <button
                      onClick={(e) => {
                        console.log("click");
                        // Check if 'post' is defined before updating isEdit
                        if (post) {
                          post.isEdit = true;
                          setAllPosts([...userPosts]);
                        }
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

  );
};

export default About;