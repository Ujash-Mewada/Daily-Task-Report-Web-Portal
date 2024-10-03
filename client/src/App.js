// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login';
import Dashboard from './components/dashboard';
import TaskReportForm from './components/taskForm';
import TaskList from './components/TaskList';
import TaskEditForm from './components/TaskEditForm'; // Add the edit form
import SignupPage from './components/SignupPage';

function App() { 
    return (
        <Router>
            <div>
               
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/create-task-report" element={<TaskReportForm />} />
                    <Route path="/signup" element={<SignupPage />} /> {/* Signup Route */}
                    <Route path="/task-list" element={<TaskList />} /> {/* Task list route */}
                    <Route path="/task-edit/:id" element={<TaskEditForm />} /> {/* Task edit route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
