
import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { userRouter } from "./Server/routes/user.js";
import { questionAnswersRouter } from "./Server/routes/questionAnswers.js";
import { answersQuizRouter } from "./Server/routes/answersQuiz.js";
import { questionsRouter } from "./Server/routes/questions.js";
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 




const app = express();
// const port = process.env.PORT || 3000; 
app.use(express.json()); 

const PORT = 3000;
app.use('/js', express.static(path.join(__dirname, 'client/js')));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
app.
use(cors({
  origin: '*', // מאפשר לכל מקור לגשת
}));
app.use(express.static(path.join(__dirname, 'client'))); 

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf/; 
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb('Error: Only images and PDF files are allowed!');
    }
  },
});


app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
});
app.use('/js', express.static(path.join(__dirname, 'client/js')));

app.use(express.static(path.join(__dirname, 'client'))); 
app.use('/js', express.static(path.join(__dirname, 'client/js')));
app.use('/html', express.static(path.join(__dirname, 'client/html')));

app.use(express.static('client')); 


app.use(express.static('client/html')); 
app.use(express.static('client/js'));  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//app.use(express.urlencoded({ extended: true })); // הוספת התמחות לקבלת נתונים

//app.use("/", router); // הוסף את ה-router

app.use("/", userRouter);
app.use("/user", userRouter);
app.use("/user/:userId", userRouter);
//app.use("/user/:passwordUser/", userRouter);
app.use("user/email/:email",userRouter)
//app.use("/",questionsRouter);
app.use("/user",questionsRouter);

app.use("/", questionsRouter);
app.use("/question", questionsRouter);

app.use("/", questionAnswersRouter);
app.use("/questionAnswers", questionAnswersRouter);
app.use("/questionAnswers/:id/:id", questionAnswersRouter);
app.use("/questionAnswers/:id", questionAnswersRouter);

app.use("/", answersQuizRouter);
app.use("/answersQuiz", answersQuizRouter);
app.use("/answersQuiz/:userFriendId",answersQuizRouter);
app.use("/answersQuiz/:answersQuizId", answersQuizRouter);

