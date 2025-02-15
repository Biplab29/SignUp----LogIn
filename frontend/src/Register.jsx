import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [value, setValues] = useState({
        Name: "",
        Email: "",
        password: ""
    });
    const navigate = useNavigate();
    const HandleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/register", value)
            .then(res => {
                if(res.data.Status === "Success"){
                    navigate("/login")
                } else {
                    alert("Error Navigate to login page");
                }
            })
            .catch(err => console.log(err)); 
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-up</h2>
                <form onSubmit={HandleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input 
                            type='text' 
                            placeholder="Enter Name" 
                            name="name"
                            onChange={e => setValues({ ...value, Name: e.target.value })} 
                            className="form-control rounded-0" 
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input 
                            type='email' 
                            placeholder="Enter Email" 
                            name="email"
                            onChange={e => setValues({ ...value, Email: e.target.value })} 
                            className="form-control rounded-0" 
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input 
                            type='password' 
                            placeholder="Enter Password" 
                            name="password"
                            onChange={e => setValues({ ...value, password: e.target.value })} 
                            className="form-control rounded-0" 
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Sign Up</button>
                    <p>You agree to our terms and policies</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
