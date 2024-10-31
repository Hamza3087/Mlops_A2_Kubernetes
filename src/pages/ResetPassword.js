import axios from 'axios';
import React, { useState } from 'react';

function ResetPassword() {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: ''
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
            const response = await axios.post('http://localhost:5000/users/reset-password', formData);
          
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.error || 'Failed to reset password');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
                <input type="password" name="newPassword" placeholder="Enter new password" onChange={handleChange} required />
                <button type="submit">Reset Password</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default ResetPassword;
