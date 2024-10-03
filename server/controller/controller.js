const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
const register = async (req, res) => {
    const { username, password, email, mobile_no, address } = req.body;
    
    try {

        const userExists = await User.findOne({email});

        if(userExists) {
            console.log(`This user ${email} is already registered, please try again with another user.`);
            return res.status(400).send({success: false, message:`This user ${email} is already registered, please try again with another user.`})
        }
        else {

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword , email, mobile_no, address});
    
            const userRegister = await user.save();
            console.log(userRegister, 'User registered successfully')
            res.status(201).send({ success: true,  message: 'User registered successfully', data: userRegister });
        }
 
    } catch (error) { 
        console.log(error, 'User registration failed');
        res.status(400).send({ success: false, message: 'User registration failed', error: error });
    }
};

// User Login
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.userId = user._id;  // Save user ID in session
            console.log(req.session.userId, 'UserID Login <<<<<<<<<<<<');
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
            console.log(token, 'login token ::::::')
            res.send({ token });
        } else {
            console.log('Invalid username or password');
            res.status(401).send({ success: false, message: 'Invalid username or password' });
        }
};

// Get user by id
const userById = async (req, res) => {
    const id = req.user.id;
    try {
        const userByID = await User.findById(id);
        if (!userByID) {
            console.log('Id is wrong..');
            return res.status(404).send('Please enter correct id');
        } else if (userByID) {
            console.log(userByID, '1 student data..');
            res.status(200).send({success: true, message: "Get single user", UserID: userByID});
        }
    } catch (error) {
        console.log(error, 'User not found');
        res.status(404).send('User not found');
    }
}

// User Logout
const logout = (req, res) => {
     let destroy = req.session.destroy();
     console.log(destroy, 'Destroyed ::::::::');
    res.status(200).send({ success: true, message: 'User logged out' });
};


module.exports = {
    register, 
    login,
    logout,
    userById
}
