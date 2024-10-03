const mongoose = require('mongoose');

const TaskReportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hoursWorked: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Completed', 'In Progress', 'Pending', 'Overdue'],
        default: 'Pending'
    },
});
 
module.exports = mongoose.model('taskreports', TaskReportSchema); 

