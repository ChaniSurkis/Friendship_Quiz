import express from "express";

import { Questions } from "../controller/questions.js";

const  questionsRouter = express.Router();
const questionController = new Questions();

questionsRouter.get("/question",questionController.getAll)
questionsRouter.get("/question/:questionId",questionController.getTextByQuestionId)
questionsRouter.post("/question",questionController.add)

export {questionsRouter}