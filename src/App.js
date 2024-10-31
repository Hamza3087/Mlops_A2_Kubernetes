import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';

function App() {
    return (
        <Router>
          <Routes>
                <Route  path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/reset-password" element={<ResetPassword/>} />
                {/* <Route path="/protected" element={<Protected/>} /> */}
                </Routes>
        </Router>
    );
}

export default App;
