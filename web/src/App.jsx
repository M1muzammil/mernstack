import './App.css'
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { BsHouseFill, BsChat, BsPersonLinesFill, BsPencilSquare } from 'react-icons/bs';
import Home from './components/home/home';
import About from './components/about/about';
import Chat from './components/chat/chat';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Lander from './lander/lander';
import Edit from './components/edit/edit';
import { GlobalContext } from './context/context';

const App = () => {
  const { userId } = useParams();

  const { state, dispatch } = useContext(GlobalContext);
  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        config.withCredentials = true;
        return config;
      },
      function (error) {

        return Promise.reject(error);
      }
    );
  }, []);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const resp = await axios.get('/api/v1/ping', {
          withCredentials: true,
        });
        dispatch({
          type: 'USER_LOGIN',
          payload: resp.data.data,
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: 'USER_LOGOUT',
        });
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  return (
    <div className="mainappnav">
      {state.isLogin === true ? (
        <nav>
          <Link to="/">
            <BsHouseFill />
          </Link>
          <Link to="/Chat">
            <BsChat />
          </Link>
          <Link to={`/posts/${state.user.userId}`}>
            <BsPersonLinesFill />
          </Link>
          <Link to="/Edit">
            <BsPencilSquare />
          </Link>
        </nav>
      ) : null}
      {state.isLogin === true ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:userId" element={<About />} />

          <Route path="/Chat" element={<Chat />} />
          <Route path="/Edit" element={<Edit />} />
        </Routes>
      ) : null}






      {state.isLogin === false ? (
        <>
          <div>{JSON.stringify(state)}</div>
          <Routes>
            <Route path="/" element={<Lander />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>

      ) : null}


    </div>
  );
};

export default App;

