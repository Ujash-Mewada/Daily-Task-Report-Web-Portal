// src/components/Dashboard.js

import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import '../App.css'; // Import the CSS file


const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token from localStorage or sessionStorage
        localStorage.removeItem('token');

        // Check if the token is removed successfully
        const deletedToken = localStorage.getItem('token');
        console.log(deletedToken, 'Token after deletion :::::::');  // This should log 'null'
    
        // Redirect to login page
        navigate('/');
    };

  

    // const handleLogout = async () => {
    //     try {
    //         // Make a POST request to the logout API
    //         const response = await fetch('http://localhost:5000/logout', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // Include the token if your API requires it for the logout request
    //                 // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             },
    //         });
    //         if (!response.ok) {
    //             throw new Error('Logout failed'); // Handle error if the response is not ok
    //         }
    //         else {

    //             console.log('Token deleted <<<<<<<<<<<<<<<<<');
    //         }
    
    //         // Clear the token from localStorage or sessionStorage
    //         // localStorage.removeItem('token');
    
    //         // Redirect to the login page
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Error during logout:', error);
    //         // Optionally, show an error message to the user
    //     }
    // };  
    

    return (
        <div className="dashboard-container">
        <h2>Dashboard</h2>
        <Link to="/create-task-report" className="create-task-link">
            Create New Task Report
        </Link>
        {/* You can add more features to display the list of task reports here */}

        <Link to="/task-list" className="task-list">
            Your Task Report
        </Link>
  
         {/* Logout Button */}
        <button className="logout-button-dashboard" onClick={handleLogout}>
                    Logout
        </button>
    </div>
    );
};

export default Dashboard;
