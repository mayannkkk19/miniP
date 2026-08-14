const ProblemModel = require("../models/problemSchema");

class ProblemService {
    async saveProblem (problemObject) {
        try {
            const newProblem = new ProblemModel(problemObject);
            return await newProblem.save();
        } catch (error) {
            throw new Error (`Failed to save problem :${error.message}`);
        }
    }

    async getProblem (problemId) {
        try {
            const problem = await ProblemModel.findById(problemId);
            if(!problem) throw new Error ('Problem not found');
            return problem;
        } catch (error) {
            throw new Error (`Error fetching problem: ${error.message}`);
        }
    }
}

module.exports = ProblemService;