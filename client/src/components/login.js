// // src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',  // Include this for session-based authentication
        });


         // Now we can safely parse JSON
        const data = await response.json();
        console.log(response, 'response here ::::::::');

        // Check if the response is okay before parsing JSON
        if (response.ok) {
            // Save the token to localStorage
            localStorage.setItem('token', data.token);
            // Redirect to the dashboard page
            navigate('/dashboard');
        } else {
            // Handle login failure (e.g., show error message)
            console.error(data.error);
            alert('Invalid username or password');
        }

    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred while logging in. Please try again later.');
    }
};


    return (
        <div className="login-container">
            <h2 className='login-h2'>Login Task Report Web Portal</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        placeholder = "enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>  
                    <input
                        type="password"
                        placeholder = "enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {/* Add a link to the signup page */}
            <p>
                New sign up? <Link to="/signup">Click here</Link>
            </p>
        </div>
    );
};

export default LoginPage;

