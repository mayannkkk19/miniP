const express = require("express");
const problemRouter = express.Router();

const { saveProblem } = require('../controller/problemController');

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

problemRouter.post("/submit", saveProblem);

module.exports = { problemRouter };
