import axios from 'axios';
import React, { useState } from 'react';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
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
            const response = await axios.post('http://localhost:5000/users/addnew', formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                <button type="submit">Sign Up</button>
            </form>
            <p>{message}</p>
            <a href='/login' >Login</a>
        </div>
    );
}

export default Signup;
