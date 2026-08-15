const express = require("express");
const problemRouter = express.Router();

const ProblemService = require('../services/problemService');
const Problem = require("../models/problem");


const problemService = new ProblemService();

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

problemRouter.post("/submit", async (req, res, next) => {
    console.log("Came to post a problem");

    const validation = problemService.validateProblem(req.body);

    if(!validation.success) {
        console.log(validation.message);
        res.status(400);
        return res.send (`<h1>Problem upload failed, invalid data</h1>`);
    }else{
        console.log(validation.message);
    }

    const problem = new Problem(req.body);
    //console.log(problem);

    try{
        await problemService.saveProblem(problem);
    } catch (error) {
        console.log(error.message);
        res.status(400);
        return res.send(`<h1>Problem upload failed, invalid data</h1>`)
    }
    res.status(201);
    return res.send(`<h1>Problem uploaded</h1>`);
});

module.exports = { problemRouter };
