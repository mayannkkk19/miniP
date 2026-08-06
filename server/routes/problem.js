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
        return false;
    }

    return true;
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

    const isValid = validateProblem(req.body);

    if(isValid) {
        const problem = new Problem(req.body);
        console.log(problem);
        return res.send(`<h1>Problem uploaded</h1>`);
    }

    return res.send (`<h1>Problem upload failed, invalid data</h1>`)
});

module.exports = { problemRouter };
