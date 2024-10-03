// src/components/TaskList.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const TaskList = () => {
    const [taskReports, setTaskReports] = useState([]);

    // const handleLogout = () => {
    //     // Clear the token from localStorage or sessionStorage
    //     localStorage.removeItem('token');
    //     // Redirect to login page
    //     navigate('/');
    // };

    useEffect(() => {
        const fetchTaskReports = async () => {
            const token = localStorage.getItem('token');
            console.log(token,  'token local <<<<<<<<<<<<<<<<<<')
            const response = await fetch('http://localhost:5000/task-reports', { // Make sure the URL matches your API
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log(data, "Fetched task reports"); // Log the fetched data

            if (data.success && Array.isArray(data.data)) {
                setTaskReports(data.data); // Set the task reports from the data array
            } else {
                console.error('Unexpected data format:', data);
            }
        };


        fetchTaskReports();
    }, []);

    const handleDelete = async (taskId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/task-reports/${taskId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // If the deletion was successful, update the taskReports state
                    setTaskReports(taskReports.filter(task => task._id !== taskId));
                    alert('Task deleted successfully!');
                } else {
                    alert('Failed to delete task');
                }
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('An error occurred while trying to delete the task');
            }
        } else {
            // If the user clicked "No", we do nothing
            console.log('Task deletion canceled');
        }
    };

    const navigate = useNavigate();

    const handleEdit = (taskId) => {
        navigate(`/task-edit/${taskId}`); // Navigate to the edit page
    };


    return (
        <div className="task-list-container">
            <h2>Your Task Reports</h2>
            {taskReports.length === 0 ? (
                <div>
                    <p>You have not created any task!.</p>
                    {/* Add a Link to navigate to the "Create Task Report" page */}
                    <p>
                        To create a new task <Link to="/create-task-report">Click here.</Link>
                    </p>
                </div>
            ) : (
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Task Name</th>
                            <th>Task Status</th>
                            <th>Hours Worked</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskReports.map((task, index) => (
                            <tr key={task._id}>
                                <td>{index + 1}</td> {/* Serial Number */}
                                <td>{task.description}</td> {/* Task Name */}
                                <td>{task.status}</td> {/* Task Status */}
                                <td>{task.hoursWorked}</td> {/* Hours */}
                                <td>
                                    {/* <Link to={`/task-edit/${task._id}`} className="edit-link">Edit</Link>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        Delete
                                    </button> */}
                                    {/* Edit Button */}
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(task._id)}
                                    >
                                        Edit
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Logout Button */}
            {/* <button className="logout1-button" onClick={handleLogout}>
                    Logout
        </button> */}
        </div>
    );
};

export default TaskList;



