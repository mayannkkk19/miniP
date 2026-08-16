const Problem = require("../models/problem");
const ProblemService = require('../services/problemService');
const AiService = require('../services/aiService');

const problemService = new ProblemService();
const aiService = new AiService();

exports.saveProblem = async (req, res, next) => {
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
        const problemObject = await problemService.saveProblem(problem);
        console.log(problemObject);
        //AiService.analyzeProblem(problemObject);
        aiService.analyzeProblem(problemObject);
    } catch (error) {
        console.log(error.message);
        res.status(400);
        return res.send(`<h1>Problem upload failed, invalid data</h1>`)
    }
    res.status(201);
    return res.send(`<h1>Problem uploaded</h1>`);
}