const colums={" questionId":"int","questionText":"NVARCHAR","option1":"int","option2":"int","option3":"int","option4":"int"};
import{deleteQuery,getQueryByField,getQuery,insertQuery} from './query.js'

const getQuestions=async () => {
    try {
        let question = await getQuery("Questions");
        console.log(question);
       return question;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } finally {
      
    }
};

const addQuestion = async (newQuestion) => {
    console.log("addQuestion");
    try {
        let nameValues = "";
        let values = "";
        for (const key in newQuestion) {
            nameValues += key + ',';
            if (typeof newQuestion[key] === "string")
                values += `'${newQuestion[key]}',`;
            else
            values += newQuestion[key] + ',';
        }
        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        console.log(nameValues);
        console.log(values);
        let question = await insertQuery("Questions", nameValues, values);
        console.log(question);
        return question;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};
const getTextById = async(id) => {
    try{
        let queText = await getQueryByField("Questions","questionId",id);
        console.log(queText);
        return queText;
    }
    catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    }
}

 export {getQuestions,addQuestion,getTextById};

