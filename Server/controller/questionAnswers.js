import { getQuestionAnswers,getQuestionById, addAnswer, deleteAnswer } from '../service/questionAnswers.js';

export class QuestionAnswers {
    getAnswer = async (req, res) => {
        try {
            let qa = await getQuestionAnswers(req.params.userId, req.params.questionId);
            console.log('successfully got /tmp/hello');
            res.send(qa);
        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    getAnswerWithId = async (req, res) => {
        try {
            let qa = await getQuestionById(req.params.userId);
            console.log('successfully got /tmp/hello');
            res.send(qa);
        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    add = async (req, res) => {
        try {
            let newAnswer = req.body;
            console.log(newAnswer);
            let answers = await addAnswer(newAnswer);
            console.log(answers);
            res.send(answers);
        }
        catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    }
    delete = async (req, res) => {
        try {
            const userid = req.params.userId;
            console.log("userid", userid);
            console.log(`userIdDelete:${userid}`)
            console.log(`Deleting user with id: ${userid}`);
            let result = await deleteAnswer(userid);
            console.log(result);
            if (result.success) {
                res.send({ message: `User with id ${userid} deleted successfully` });
            } else {
                res.status(500).send({ error: 'Failed to delete user' });
            }
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

}

