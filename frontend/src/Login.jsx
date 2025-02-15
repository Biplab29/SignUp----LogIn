import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [value, setValues] = useState({
        Email: "",
        password: ""
    });
    const navigate = useNavigate();
    const HandleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/login", value)
    .then(res => {
        console.log(res.data); 
        if(res.data.Status === "Success") {
            navigate("/");
        } else {
            alert("Login failed: " + res.data.Error);
        }
    })
    .catch(err => console.log(err));
    };
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded w-25'>
        <h2> Sign-In</h2>
        <form onSubmit={HandleSubmit}>
            <div className='mb-3'> 
                <label htmlFor='email'><strong> Email </strong></label>
                <input type='text' placeholder="Enter Name" name="name" 
                className="form-control rounded-0" 
                onChange={e => setValues({ ...value, Email: e.target.value })}
                />
            </div>
            <div className='mb-3'> 
                <label htmlFor='password'><strong> Password </strong></label>
                <input type='text' placeholder="Enter Name" name="name" 
                className="form-control rounded-0" 
                onChange={e => setValues({ ...value, password: e.target.value })}
                />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0"> Log in </button>
            <p> You agree to our terms and policies </p>
            <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'> Create Account </Link>
        </form>
    </div>
   </div>
  )
}

export default Login ;