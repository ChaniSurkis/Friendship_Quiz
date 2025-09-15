import express from "express";
import { AnswersQuiz } from  "../controller/answersQuiz.js"

const  answersQuizRouter = express.Router()
const answersQuizController = new  AnswersQuiz();

answersQuizRouter.get("/",answersQuizController.getAll)
answersQuizRouter.get("/:userFriendId",answersQuizController.getByFriendId)
answersQuizRouter.post("/",answersQuizController.add)
answersQuizRouter.delete("/:userId",answersQuizController.delete)

export{answersQuizRouter}