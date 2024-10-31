import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to Our App</h1>
            <p>Please choose an option to continue:</p>
            
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/signup">
                <button>Signup</button>
            </Link>
        </div>
    );
}

export default Home;
