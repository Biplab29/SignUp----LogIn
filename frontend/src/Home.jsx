import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState(""); // State for message
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8080")
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          setMessage(""); 
        } else {
          setAuth(false);
          setMessage("You are not logged in."); 
        }
      })
      .catch(err => {
        console.log(err);
        setAuth(false);
        setMessage("You Need to Login Now");
      });
  }, []);

  const handleLogout = () => {
    axios.get("http://localhost:8080/logout")
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(false);
          setName("");
          setMessage("You are not logged in."); 
          navigate("/"); 
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      {auth ? (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <h3>You are successfully logged in, {name}</h3>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
    </div>
    
      ) : (
        <div className="container d-flex justify-content-center align-items-center mt-4" style={{ height: "100vh" }}>
        <div className="text-center">
          <h3>{message}</h3> <br /><br />
          <h3>Login</h3>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default Home;