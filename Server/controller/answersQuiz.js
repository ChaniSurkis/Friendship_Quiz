import {getAnswersQuiz,getCorrectAnswer,addAnswersQuiz,deleteByUserId}from '../service/answersQuiz.js'
export class AnswersQuiz
{
    getAll = async (req, res) => {
        try {
            let answersQuiz = await getAnswersQuiz();
            res.send(answersQuiz);
        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
}
getByFriendId = async(req,res) => {
    try{
        let friendAnswers = await getCorrectAnswer(req.params.userFriendId);
        res.send(friendAnswers);
    }
    catch (error) {
        console.error('there was an error:', error.message);
        res.status(500).send(error.message);

    }
}

add = async(req,res)=>{
    try{
        let newAnswersQuiz = req.body;
        let answersQuiz = await addAnswersQuiz(newAnswersQuiz);
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
        let result = await deleteByUserId(userId);
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