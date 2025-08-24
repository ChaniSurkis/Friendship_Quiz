import express from "express";
import { AnswersQuiz } from  "../controller/answersQuiz.js"
import { readFile, writeFile } from 'node:fs/promises';
const  answersQuizRouter = express.Router()
const answersQuizController = new  AnswersQuiz();

answersQuizRouter.get("/answersQuiz",answersQuizController.getAll)
answersQuizRouter.get("/answersQuiz/:userFriendId",answersQuizController.getByFriendId)
answersQuizRouter.post("/answersQuiz",answersQuizController.add)
answersQuizRouter.delete("/answersQuiz/:userId",answersQuizController.delete)

export{answersQuizRouter}