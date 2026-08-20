const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//routes
const { problemRouter } = require('./routes/problem');

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const app = express();
const PORT = 4009;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Successfully connected to MongoDB via Mongoose!');
    } catch (error) {
        console.log('MongoDB connection error:', error.message);
        process.exit(1); //exit with failure
    }
};

connectDB();

// unpack packets
app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    console.log('First middleware');
    next();
});

app.use((req, res, next) => {
    console.log('Second middleware');
    next();
});


app.get('/', (req, res, next) => {
    console.log('Third middleware');
    res.send(`
        <a href="/problem/submit-form">Tap to submit problem</a>
        `)
});

app.use('/problem', problemRouter)

app.listen(PORT, () => {
    console.log(`Server is live at: http://localhost:${PORT}`)
})