import { getQuestionAnswers,getQuestionById, addAnswer, deleteAnswer } from '../service/questionAnswers.js';

export class QuestionAnswers {
    getAnswer = async (req, res) => {
        try {
            let qa = await getQuestionAnswers(req.params.userId, req.params.questionId);
            res.send(qa);
        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    getAnswerWithId = async (req, res) => {
        try {
            let qa = await getQuestionById(req.params.userId);
            res.send(qa);
        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    add = async (req, res) => {
        try {
            let newAnswer = req.body;
            let answers = await addAnswer(newAnswer);
            res.send(answers);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }
    delete = async (req, res) => {
        try {
            const userid = req.params.userId;
            let result = await deleteAnswer(userid);
            if (result.success) {
                res.send({ message: `User with id ${userid} deleted successfully` });
            } else {
                res.status(500).send({ error: 'Failed to delete user' });
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
}

