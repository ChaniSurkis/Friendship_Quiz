const colums ={"userid":"int","questionId":"int","correct_answer_number":"int"};
import { getQuery2 ,getQueryByField,insertQuery,deleteQuery} from './query.js';
const getQuestionAnswers = async (id1,id2) => {
    try {
        let questionAnswers = await getQuery2("QuestionAnswers","correctAnswerNumber","userId","questionId",id1,id2);
        console.log(questionAnswers);
        return questionAnswers;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    }
};
const getQuestionById = async (id) => {
    try {
        let questionAnswers = await getQueryByField("QuestionAnswers","userId",id);
        console.log(questionAnswers);
        return questionAnswers;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    }
};
const addAnswer = async(newAnswer)=>{
    try {
        let nameValues = "";
        let values = "";
        for (const key in newAnswer) {
            nameValues += key + ',';
            if (typeof newAnswer[key] === "string")
                values += `'${newAnswer[key]}',`;
            else
            values += newAnswer[key] + ',';
        }
        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        console.log(nameValues);
        console.log("values:",values);
        let answer = await insertQuery("QuestionAnswers", nameValues, values);
        console.log(answer);
        return answer;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    } 
}
const deleteAnswer= async (userId) => {
    try {
        let q = await deleteQuery("QuestionAnswers","userId",userId);
        console.log(q);
        return q;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};
    
export { getQuestionAnswers,getQuestionById,addAnswer,deleteAnswer };
