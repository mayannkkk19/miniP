const express = require("express");
const problemRouter = express.Router();

Problem = require("../models/problem");

const validateProblem = function ({
    title,
    statement,
    inputFormat,
    outputFormat,
    constraints,
    samples,
}) {

    if(samples.length === 0 || title === '' || statement === '' || inputFormat === '' || outputFormat === '' || constraints === '') {
        console.log("Not valid");
        return {
            success: false,
            message: 'Problem validation failed'
        }
    }

    return {
        success: true,
        message: 'Problem validation successful'
    }
};

problemRouter.get("/submit-form", (req, res, next) => {
    res.send(`
            <form action="/problem/submit" method="POST">
                <input name="title" type="text" placeholder="title">
                <br>
                <input name="statement" type="text" placeholder="statement">
                <br>
                <input name="inputFormat" type="text" placeholder="inputFormat">
                <br>
                <input name="outputFormat" type="text" placeholder="outputFormat">
                <br>
                <input name="constraints" type="text" placeholder="constraints">
                <br>
                <input name="samples" type="text" placeholder="samples">
                <br>
                <input type="submit">
            </form>
    `);
});

problemRouter.post("/submit", (req, res, next) => {
    console.log("Came to post a problem");

    const validation = validateProblem(req.body);

    if(!validation.success) {
        res.status(400);
        return res.send (`<h1>Problem upload failed, invalid data</h1>`);
    }

    const problem = new Problem(req.body);
    console.log(problem);
    res.status(201);
    return res.send(`<h1>Problem uploaded</h1>`);
});

module.exports = { problemRouter };
