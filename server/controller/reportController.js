const TaskReport = require('../models/taskReport');

// Create Task Report
const createTaskReport = async (req, res) => {
    const { date, description, hoursWorked, status } = req.body;
    const taskReport = new TaskReport({
        user: req.session.userId,
        date,
        description,
        hoursWorked,
        status,
    });
      
    try {
        const taskData = await taskReport.save();
        console.log(taskData, 'Task report created successfully')
        res.status(201).send({ success: true, message: 'Task report created successfully', data: taskData });
    } catch (error) {
        console.log(error, 'Failed to create task report');
        res.status(400).send({ success: false, message: 'Failed to create task report', error: error });
    }
};

// Get Task Reports

const getTaskReports = async (req, res) => {
    try {
        const taskReports = await TaskReport.find({ user: req.session.ObjectId });
        res.status(200).send({success: true, message: "Task Report data", data: taskReports});
    } catch (error) {
        console.log(error, 'error while fetching task.')
        res.status(400).send({ success: false, message: 'Failed to retrieve task reports', error: error });
    }
};

// Update Task Report
const updateTaskReport = async (req, res) => {
    const { id } = req.params;
    console.log(id, 'Id here >>>>>>')
    const updates = req.body;
    
    try {
        const updateTaskData = await TaskReport.findByIdAndUpdate(id, updates);
        console.log(updateTaskData, 'Task Updated !!!');
        res.status(200).send({ success: true, message: 'Task report updated successfully', data: updateTaskData });
    } catch (error) {
        console.log(error, 'error while update task ::::')
        res.status(400).send({ success: false, message: 'Failed to update task report', error: error });
    }
};


//Task by id
const getTaskById = async(req, res) => {
    const id = req.params.id;
    try {
        const taskById = await TaskReport.findById(id);

        if(!taskById) {
            console.log('Id is wrong..');
            return res.status(404).send('Please enter correct id');
        }
        else if(taskById) {
            console.log(taskById, '1 user data..');
            res.status(200).send({success: true, message: "Get single user", taskId: taskById});
        }
    } catch (error) {
        console.log(error, 'error while getting task by id ::::')
        res.status(400).send({ success: false, message: 'error while getting task by id ::::', error: error });
    }    
}

// Delete Task Report
const deleteTaskReport = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deleteTask = await TaskReport.findByIdAndDelete(id);
        console.log(deleteTask, 'Task Deleted !!');
        res.send({ success: true, message: 'Task report deleted successfully', data: deleteTask});
    } catch (error) {
        console.log(error, 'error while delete task')
        res.status(400).send({ success: false, message: 'Failed to delete task report', error: error });
    }
};


module.exports = {
    createTaskReport,
    getTaskReports,
    updateTaskReport,
    getTaskById,
    deleteTaskReport,
}