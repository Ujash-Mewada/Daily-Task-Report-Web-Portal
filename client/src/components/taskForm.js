// src/components/TaskReportForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskReportForm = () => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [hoursWorked, setHoursWorked] = useState('');
    const [status, setStatus] = useState('Pending');

    const navigate = useNavigate();

    const handleCreateTaskReport = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        console.log(token, 'Token here :::::::')

        const response = await fetch('http://localhost:5000/task-reports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            body: JSON.stringify({
                date,
                description,
                hoursWorked,
                status
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Task report created successfully:', data);
            alert('Task report created successfully!');
            navigate('/task-list');
        } else {
            console.error('Failed to create task report:', data.error);
            alert('Failed to create task report.');
        }
    };

    const handleLogout = () => {
        // Clear the token from localStorage or sessionStorage
       let deletedToken =  localStorage.removeItem('token');
       console.log(deletedToken, 'Token Delete <<<<<<<<<<<<<<<<<')
        // Redirect to login page
        navigate('/');
    };


    return (
        <div className='task-form'>
            <h2>Create Task Report</h2>
            <form onSubmit={handleCreateTaskReport}>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hours Worked:</label>
                    <input
                        type="number"
                        value={hoursWorked}
                        onChange={(e) => setHoursWorked(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Overdue">Overdue</option>
                    </select>
                </div>
                <button className = "createTaskReport-button" type="submit">Create Task Report</button>
            </form>

                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
        </div> 
    ); 
};

export default TaskReportForm;
