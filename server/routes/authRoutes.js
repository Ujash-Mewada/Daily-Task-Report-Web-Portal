const express = require('express');
// const { register, login, logout } = require('../controller/controller');
const controller = require("../controller/controller");
const authorized = require('../middleware/middleware');


const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/user-details/:id', authorized, controller.userById);

module.exports = router;
  