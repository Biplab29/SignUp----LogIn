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
          setMessage(""); // Clear message on successful login
        } else {
          setAuth(false);
          setMessage("You are not logged in."); // Set message if not logged in
        }
      })
      .catch(err => {
        console.log(err);
        setAuth(false);
        setMessage("An error occurred while checking authentication.");
      });
  }, []);

  const handleLogout = () => {
    axios.get("http://localhost:8080/logout")
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(false);
          setName("");
          setMessage("You are not logged in."); 
          navigate("/login"); 
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      {auth ? (
        <div>
          <h3>You are successfully logged in, {name}</h3>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Home;