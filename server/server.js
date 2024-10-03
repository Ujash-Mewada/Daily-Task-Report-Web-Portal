const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskReportRoutes = require('./routes/reportRoutes');
const cors = require('cors');


dotenv.config();

const PORT = process.env.PORT;

const app = express();

// Middleware

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));


// Routes
app.use('/', authRoutes);
app.use('/task-reports', taskReportRoutes);


// Database connection
const url = process.env.MONGO_URI;

mongoose.connect(url, {useNewUrlParser: true})
.then(()=> {
console.log('Database connected successfully.')
}).catch((error)=> {
console.log(error, "Error while connecting to database");
});


// Server setup
app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);
}); 



