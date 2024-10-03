// src/components/SignupPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Import your CSS file

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_no, setMob] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, mobile_no, password, address })
        });

        console.log(response, 'response here >>>>>>>>>>')
        const data = await response.json();
        console.log(data, 'Data here :::::::::');

        if (response.ok) {
            alert('User registered successfully!');
            // Redirect to login page after successful registration
            navigate('/');
        } else {
            // Handle registration failure (e.g., show error message)
            alert(`This user ${email} is already registered, please try again with another user.`);
            console.error(data.error);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div> 
                    <label>Password:</label>
                    <input
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mobile No:</label>
                    <input
                        type="mobile no"
                        value={mobile_no}
                        onChange={(e) => setMob(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                       type="text"
                       value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account ? <Link to="/">Click here to login</Link>
            </p>
        </div>
    );
};

export default SignupPage;
