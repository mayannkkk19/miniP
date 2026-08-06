const express = require('express');
const app = express();
const PORT = 4009;

const { problemRouter } = require('./routes/problem');

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