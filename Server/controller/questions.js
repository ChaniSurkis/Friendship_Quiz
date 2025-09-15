import {getQuestions,addQuestion,getTextById} from '../service/questions.js'
export class Questions{
getAll = async (req, res) => {
    try {
        let q = await getQuestions();
        res.send(q);
    } catch (error) {
        console.error('there was an error:', error.message);
        res.status(500).send(error.message);
    }
};

getTextByQuestionId = async (req, res) => {
    try {
        let text = await getTextById(req.params.questionId);
        res.send(text);
    } catch (error) {
        console.error('there was an error:', error.message);
        res.status(500).send(error.message);
    }
}

add = async(req,res)=>{
    try{
        let newQuestion = req.body;
        let question = await addQuestion(newQuestion);
        res.send(question);
    }
    catch(error){
        console.log('there was an error:', error.message);
        res.status(500).send(error.message);
    }
}
}