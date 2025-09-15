import connectToDatabase from './database.js';
import {getQuery,getQueryByField,insertQuery,deleteQuery} from '../service/query.js'
const colums ={"AnsweredCustomerId":"int","userFriendId":"int","correctAnswerNumber":"int"};
const getAnswersQuiz = async () => {
    try {
        let answersQuiz = await getQuery("AnswersQuiz");
        console.log(answersQuiz);
       return answersQuiz;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } finally { }
};
const getCorrectAnswer = async(userFriendId) => {
    try {
        let answer = await getQueryByField("AnswersQuiz", "userFriendId", userFriendId);
        console.log(answer);
        return answer;
    } catch (error) { 
        console.error('Query failed! Error:', error); 
    }
}

const addAnswersQuiz = async (newAnswersQuiz) => {
    try {
        let nameValues = "";
        let values = "";
        for (const key in newAnswersQuiz)  {
            nameValues += key + ',';
            if (typeof newAnswersQuiz[key] === "string")
                values += `'${newAnswersQuiz[key]}',`;
            else
            values += newAnswersQuiz[key] + ',';
        }
        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        console.log(nameValues);
        console.log(values);
        let answersQuiz = await insertQuery("AnswersQuiz", nameValues, values);
        console.log(answersQuiz);
        return answersQuiz;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};

const deleteByUserId= async (userId) => {
    console.log("userId",userId);
    try {
        let user = await deleteQuery("AnswersQuiz","userFriendId",userId);
        console.log("user",user);
        return user;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};
export{getAnswersQuiz,getCorrectAnswer,addAnswersQuiz,deleteByUserId}