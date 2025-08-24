import {getQuestions,addQuestion,getTextById} from '../service/questions.js'
import { readFile, writeFile } from 'node:fs/promises';
export class Questions{
getAll = async (req, res) => {

    try {
        let q = await getQuestions();
        console.log('successfully get /tmp/hello');
        res.send(q);

    } catch (error) {
        console.error('there was an error:', error.message);
        res.status(500).send(error.message);

    }



};

getTextByQuestionId = async (req, res) => {
    try {
        let text = await getTextById(req.params.questionId); // אם צריך לעביר id לפונקציה
        console.log('successfully get /tmp/hello');
        res.send(text);
    } catch (error) { // כאן נוסיף את המשתנה error
        console.error('there was an error:', error.message);
        res.status(500).send(error.message);
    }
}


add = async(req,res)=>{
    try{
        let newQuestion = req.body;
        console.log(newQuestion);
        let question = await addQuestion(newQuestion);
        console.log(question);
        res.send(question);
    }
    catch(error){
        console.log('there was an error:', error.message);
        res.status(500).send(error.message);
    }
}
}