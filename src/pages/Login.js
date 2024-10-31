import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Protected from './Protected';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/login', formData);
            const token = response.data.token;
    
            if (token) {
                // Store the token in localStorage
                localStorage.setItem('token', token);
                setMessage(response.data.message);
            } else {
                setMessage("Token not received from server");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed');
        }
    };
    

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
            <Link to="/reset-password">Forgot Password?</Link>
            <Protected></Protected>
        </div>
    );
}

export default Login;
