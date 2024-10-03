const express = require('express');
// const { createTaskReport, getTaskReports, updateTaskReport, deleteTaskReport } = require('../controller/reportController');
const reportController = require("../controller/reportController");
const authorized  = require('../middleware/middleware');

const router = express.Router();

router.post('/', authorized, reportController.createTaskReport);
router.get('/', authorized, reportController.getTaskReports);
router.get('/:id', authorized, reportController.getTaskById);
router.put('/:id', authorized, reportController.updateTaskReport);
router.delete('/:id', authorized, reportController.deleteTaskReport);

module.exports = router; 
 