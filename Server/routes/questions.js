import express from "express";
import { Questions } from "../controller/questions.js";
const  questionsRouter = express.Router();
const questionController = new Questions();
questionsRouter.get("/",questionController.getAll)
questionsRouter.get("/:questionId",questionController.getTextByQuestionId)
questionsRouter.post("/",questionController.add)
export {questionsRouter}