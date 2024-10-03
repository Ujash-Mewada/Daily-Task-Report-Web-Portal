// src/components/TaskEditForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

const TaskEditForm = () => {
    const { id } = useParams(); // Get the task ID from the URL
    const [task, setTask] = useState(null);
    const [description, setDescription] = useState('');
    const [hoursWorked, setHoursWorked] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/task-reports/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setTask(data);
            setDescription(data.description);
            setHoursWorked(data.hoursWorked);
            setStatus(data.status);
        };
        fetchTask();
    }, [id]);

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/task-reports/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ description, hoursWorked, status }),

        });
        console.log(response.body, 'response body >>>>>>>')
        if (response.ok) {
            alert('Task updated successfully');
            navigate('/task-list');
        } else {
            alert('Failed to update task');
        }
    };

    /* const handleDeleteTask = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/task-reports/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            alert('Task deleted successfully');
            navigate('/task-list');
        } else {
            alert('Failed to delete task');
        }
    }; */

    if (!task) return <div>Loading...</div>;

    return (
        <div className="task-edit-form">
            <h2>Edit Task Report</h2>
            <form onSubmit={handleUpdateTask}>
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
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Overdue">Overdue</option>

                    </select>
                </div>
                <button type="submit">Update</button>
            </form>
            {/* <button onClick={handleDeleteTask}>Delete</button> */}
        </div> 
    ); 
};

export default TaskEditForm;
