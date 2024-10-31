const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/authRoutes.js');

const app = express.Router();
const JWT_SECRET = 'cdknvkdnvkjdnvnadlvnavvebvb@%$#@@$@'; // Use a strong secret in production, and store it in an environment variable

// Add new user
app.post('/addnew', async (req, res) => {
    const { username, email, password, address, phoneNumber } = req.body;

    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create a new user object
        const newUser = new User({
            username,
            email,
            password,
            address,
            phoneNumber
        });

        // Save the user object to the database
        await newUser.save();
        console.log('User saved to database');
        return res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        console.error('Error saving user:', err);
        return res.status(500).json({ error: 'Failed to add user' });
    }
});


// Login user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare the password with the stored password in plain text
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

         // Generate JWT
         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '10s' });

        // Login successful
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: { email: user.email, username: user.username, id: user._id }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Reset password route
app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User with this email does not exist' });
        }

        // Update the user's password
        user.password = newPassword;
        await user.save();

        console.log('Password updated successfully');
        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ error: 'Failed to update password' });
    }
});

  

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Access denied, no token provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
       // localStorage.removeItem('token');

        req.user = user;
        next();
    });
}

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = app;