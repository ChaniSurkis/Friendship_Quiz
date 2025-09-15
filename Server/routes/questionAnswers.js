import express from "express";
import { QuestionAnswers } from "../controller/questionAnswers.js"; 
import connectToDatabase from '../service/database.js';
import sql from 'mssql'; 
const questionAnswersRouter = express.Router();
const questionAnswersController = new QuestionAnswers();
questionAnswersRouter.get("/:userId/:questionId", questionAnswersController.getAnswer);
questionAnswersRouter.get("/:userId", questionAnswersController.getAnswerWithId);
questionAnswersRouter.post("/", questionAnswersController.add);
questionAnswersRouter.delete("/:userId", questionAnswersController.delete);

questionAnswersRouter.post("/submit-answer", async (req, res) => {
    const { userId, questionId, correctAnswerNumber } = req.body;

    if (!userId || !questionId || !correctAnswerNumber) {
        return res.status(400).send('חסרים נתונים');
    }

    try {
        const pool = await connectToDatabase();  // קבלת החיבור למסד הנתונים

        const query = `
            INSERT INTO QuestionAnswers (userId, questionId, correctAnswerNumber)
            VALUES (@userId, @questionId, @correctAnswerNumber)
        `;

        const request = pool.request();
        request.input('userId', sql.Int, userId);
        request.input('questionId', sql.Int, questionId);
        request.input('correctAnswerNumber', sql.Int, correctAnswerNumber);

        await request.query(query);  // הרצת השאילתא

        res.status(200).send('הנתונים נשמרו בהצלחה');
    } catch (error) {
        console.error('שגיאה בשמירת הנתונים ל-SQL:', error);
        res.status(500).send('שגיאה בשמירת הנתונים');
    }
});

export { questionAnswersRouter };
