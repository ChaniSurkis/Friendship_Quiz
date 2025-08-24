// // import express from "express";
// // import { QuestionAnswers } from  "../controller/questionAnswers"


// // import { readFile, writeFile } from 'node:fs/promises';
// // const questionAnswersRouter = express.Router();
// // const questionAnswersController = new QuestionAnswers();
 
// // questionAnswersRouter.get("/questionAnswers/:userId/:questionId",questionAnswersController.getAnswer)
// //  //userRouter.get("/user/:id",userController.getAll)
// //  questionAnswersRouter.post("/questionAnswers",questionAnswersController.add)
// //  questionAnswersRouter.put("/questionAnswers/:questionAnswersId",questionAnswersController.update)
// //  questionAnswersRouter.delete("/questionAnswers/:questionAnswersId",questionAnswersController.delete)

// // import express from "express";
// // import { QuestionAnswers } from "../controller/questionAnswers.js";

// // const questionAnswersRouter = express.Router();
// // const questionAnswersController = new QuestionAnswers();

// // questionAnswersRouter.get("/questionAnswers/:userId/:questionId", questionAnswersController.getAnswer);
// // questionAnswersRouter.post("/questionAnswers", questionAnswersController.add);
// // // questionAnswersRouter.put("/questionAnswers/:questionAnswersId", questionAnswersController.update);
// //  questionAnswersRouter.delete("/questionAnswers/:userId", questionAnswersController.delete);

// // export { questionAnswersRouter };

// import express from "express";
// import { QuestionAnswers } from "../controller/questionAnswers.js"; // מחלקת QuestionAnswers שמכילה את הלוגיקה
// import connectToDatabase from '../service/database.js';


// const questionAnswersRouter = express.Router();
// const questionAnswersController = new QuestionAnswers();

// // מסלול לקבלת תשובה מסוימת לפי userId ו-questionId
// questionAnswersRouter.get("/questionAnswers/:userId/:questionId", questionAnswersController.getAnswer);

// // מסלול להוספת תשובה חדשה למסד הנתונים
// questionAnswersRouter.post("/questionAnswers", questionAnswersController.add);

// // מסלול למחיקת תשובות לפי userId
// questionAnswersRouter.delete("/questionAnswers/:userId", questionAnswersController.delete);

// // מסלול להוספת תשובה למסד הנתונים בזמן אמת (הפונקציה החדשה שלנו)
// // questionAnswersRouter.post("/submit-answer", async (req, res) => {
// //     const { userId, questionId, correctAnswerNumber } = req.body; // קבלת המידע מהלקוח

// //     // וידוא שכל השדות קיימים
// //     if (!userId || !questionId || !correctAnswerNumber) {
// //         return res.status(400).send('חסרים נתונים');
// //     }
// //     try {
// //         const pool = await connectToDatabase(); // חיבור למסד הנתונים
// //         const query = `
// //             INSERT INTO QuestionAnswers (userId, questionId, correctAnswerNumber)
// //             VALUES (@userId, @questionId, @correctAnswerNumber)
// //         `;
    
// //         await pool.request()
// //             .input('userId', sql.Int, userId)
// //             .input('questionId', sql.Int, questionId)
// //             .input('correctAnswerNumber', sql.Int, correctAnswerNumber)
// //             .query(query);
    
// //         res.status(200).send('הנתונים נשמרו בהצלחה');
// //     } catch (error) {
// //         console.error('שגיאה בשמירת הנתונים ל-SQL:', error);
// //         res.status(500).send('שגיאה בשמירת הנתונים');
// //     }
// // });

// questionAnswersRouter.post("/submit-answer", async (req, res) => {
//     const { userId, questionId, correctAnswerNumber } = req.body;

//     if (!userId || !questionId || !correctAnswerNumber) {
//         return res.status(400).send('חסרים נתונים');
//     }

//     try {
//         const pool = await connectToDatabase();  // קבלת החיבור למסד הנתונים

//         const query = `
//             INSERT INTO QuestionAnswers (userId, questionId, correctAnswerNumber)
//             VALUES (@userId, @questionId, @correctAnswerNumber)
//         `;

//         const request = pool.request();
//         request.input('userId', sql.Int, userId);
//         request.input('questionId', sql.Int, questionId);
//         request.input('correctAnswerNumber', sql.Int, correctAnswerNumber);

//         await request.query(query);  // הרצת השאילתא

//         res.status(200).send('הנתונים נשמרו בהצלחה');
//     } catch (error) {
//         console.error('שגיאה בשמירת הנתונים ל-SQL:', error);
//         res.status(500).send('שגיאה בשמירת הנתונים');
//     }
// });


// export { questionAnswersRouter };

import express from "express";
import { QuestionAnswers } from "../controller/questionAnswers.js"; // מחלקת QuestionAnswers שמכילה את הלוגיקה
import connectToDatabase from '../service/database.js';
import sql from 'mssql'; // ייבוא מודול mssql

const questionAnswersRouter = express.Router();
const questionAnswersController = new QuestionAnswers();

// מסלול לקבלת תשובה מסוימת לפי userId ו-questionId
questionAnswersRouter.get("/questionAnswers/:userId/:questionId", questionAnswersController.getAnswer);
questionAnswersRouter.get("/questionAnswers/:userId", questionAnswersController.getAnswerWithId);

// מסלול להוספת תשובה חדשה למסד הנתונים
questionAnswersRouter.post("/questionAnswers", questionAnswersController.add);

// מסלול למחיקת תשובות לפי userId
questionAnswersRouter.delete("/questionAnswers/:userId", questionAnswersController.delete);

// מסלול להוספת תשובה למסד הנתונים בזמן אמת
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
