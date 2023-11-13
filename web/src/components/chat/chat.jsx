
import './chat.css';
import muzammil from "./muzammilali.jpg";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Make an HTTP request to fetch user data from your backend
    axios.get('/api/v1/AllUsers')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user data: ', error);
      });
  }, []);

  return (
    <div>
      <div className="chatscreen">
        <div className="userinfo">
          {users.map(user => (
            <div className="pnt" key={user.userId}>
              <span><img width={50} height={50} src={muzammil} alt="" /></span>
              <span className="span1">
                <div className="nt">
                  <h4 
                    onClick={() => {
                        navigate(`/single/${user.userId}`);
                      }}
                  >
                    {user.firstName} {user.lastName}
                  </h4>
                  <>6:40</>
                </div>
                <div>
                  <p>my name is muzammil</p>
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;

