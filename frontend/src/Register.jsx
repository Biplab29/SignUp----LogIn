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
                if (res.data.Status === "Success") {
                    navigate("/login")
                } else {
                    alert("Error Navigate to login page");
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-info vh-100'>
            <div className='bg-white p-4 rounded shadow w-25'>
                <h2 className='text-center'>Sign Up</h2>
                <form onSubmit={HandleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'><strong>Name</strong></label>
                        <input
                            type='text'
                            id='name'
                            placeholder="Enter Name"
                            name="name"
                            onChange={e => setValues({ ...value, Name: e.target.value })}
                            className="form-control rounded-0"
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'><strong>Email</strong></label>
                        <input
                            type='email'
                            id='email'
                            placeholder="Enter Email"
                            name="email"
                            onChange={e => setValues({ ...value, Email: e.target.value })}
                            className="form-control rounded-0"
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
                            onChange={e => setValues({ ...value, password: e.target.value })}
                            className="form-control rounded-0"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-0">Sign Up</button>
                    <p className='text-center mt-3'>You agree to our terms and conditions</p>
                    <Link to="/login" className='btn btn-outline-secondary w-100 rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
