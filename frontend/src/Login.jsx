import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Login = () => {
    const [value, setValues] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const HandleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/login", value)
            .then(res => {
                console.log(res.data);
                if (res.data.Status === "Success") {
                    navigate("/"); // Redirect to home page
                } else {
                    alert("Login failed: " + res.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-info vh-100'>
            <div className='bg-white p-4 rounded shadow w-25'>
                <h2 className='text-center'>Sign In</h2>
                <form onSubmit={HandleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'><strong>Email</strong></label>
                        <input
                            type='email'
                            id='email'
                            placeholder="Enter Email"
                            name="email"
                            className='form-control rounded-0'
                            onChange={e => setValues({ ...value, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'><strong>Password</strong></label>
                        <input
                            type='password'
                            id='password'
                            placeholder="Enter Password"
                            name="password"
                            className='form-control rounded-0'
                            onChange={e => setValues({ ...value, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-0">Login</button>
                    <p className='text-center mt-3'>You agree to our terms and conditions</p>
                    <Link to="/register" className='btn btn-warning w-100 rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;