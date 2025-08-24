import { readFile, writeFile } from 'node:fs/promises';
import {getAnswersQuiz,getCorrectAnswer,addAnswersQuiz,deleteByUserId}from '../service/answersQuiz.js'

export class AnswersQuiz
{
    getAll = async (req, res) => {

        try {
            let answersQuiz = await getAnswersQuiz();
            console.log('successfully get /tmp/hello');
            res.send(answersQuiz);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);

        }

}
getByFriendId = async(req,res) =>{

    try{
        let frienAnswers = await getCorrectAnswer(req.params.userFriendId);
        console.log('successfully get /tmp/hello');
        res.send(frienAnswers);
    }
    catch (error) {
        console.error('there was an error:', error.message);
        res.status(500).send(error.message);

    }
}

add = async(req,res)=>{
    try{
        let newAnswersQuiz = req.body;
        console.log(newAnswersQuiz);
        let answersQuiz = await addAnswersQuiz(newAnswersQuiz);
        console.log(answersQuiz);
        res.send(answersQuiz);
    }
    catch(error){
        console.log('there was an error:', error.message);
        res.status(500).send(error.message);
    }
}
delete = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("userId delete" , userId)
        console.log(`Deleting user with id: ${userId}`);
        let result = await deleteByUserId(userId); 
        console.log(result);
        if (result.success) {
            res.send({ message: `User with id ${userId} deleted successfully` });
        } else {
            res.status(500).send({ error: 'Failed to delete user' });
        }
    } catch (error) {
        console.log('There was an error:', error.message);
        res.status(500).send(error.message);
    }
};
}