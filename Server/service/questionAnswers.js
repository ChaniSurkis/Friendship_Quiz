// import connectToDatabase from './database.js';
// import {getQuery2,insertQuery,deleteQuery} from '../service/query.js'


const colums ={"userid":"int","questionId":"int","correct_answer_number":"int"};
import { getQuery2 ,getQueryByField,insertQuery,deleteQuery} from './query.js';

const getQuestionAnswers = async (id1,id2) => {
    try {
        let users = await getQuery2("QuestionAnswers","correctAnswerNumber","userId","questionId",id1,id2);
        console.log(users);
        return users;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    }
};

const getQuestionById = async (id1) => {
    try {
        let users = await getQueryByField("QuestionAnswers","userId",id1);
        console.log(users);
        return users;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    }
};





const addAnswer = async(newAnswer)=>{
    console.log("addAnswer");
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
    console.log("deleteUser");
    try {
        let user = await deleteQuery("QuestionAnswers","userId",userId);
        console.log(user);
        return user;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};
    
export { getQuestionAnswers,getQuestionById,addAnswer,deleteAnswer };
// const getQuestionAnswers = async () => {
//     try {
//         let users = await getQuery2("Users", "correct_answer_number");
//         console.log(users);
//        return users;
//     } catch (err) {
//         console.error('Query failed! Error:', err);
//         return [];
//     } finally {
//     }
// };

// export {getQuestionAnswers}
