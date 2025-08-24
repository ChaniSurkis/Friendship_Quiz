import connectToDatabase from './database.js';
import {getQuery,insertQuery,deleteQuery,updateQuery,getQueryByField} from '../service/query.js'
const colums ={"userName":"string","passwordUser":"string","email":"string"};

const getUsers = async () => {
    try {
        let users = await getQuery("Users");
        console.log(users);
       return users;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } finally {
      
    }
};

const addUser = async (newUser) => {
    console.log("addUser");
    try {
        let nameValues = "";
        let values = "";
        console.log("newUser:", newUser);
        for (const key in newUser) {
            nameValues += key + ',';
            if (typeof newUser[key] === "string")
                values += `'${newUser[key]}',`;
            else
            values += newUser[key] + ',';
        }
        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        console.log(nameValues,"123");
        console.log(values);
        let user = await insertQuery("Users", nameValues, values);
        console.log(user);
        return user;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};
// const addUser = async (newUser) => {
//     console.log("addUser");
//     try {
//         // הכנת שמות העמודות וערכים
//         const nameValues = 'userId, userName, passwordUser, email'; // שמות העמודות
//         const values = `${newUser.userId}, '${newUser.userName}', '${newUser.passwordUser}', '${newUser.email}'`; // ערכים
//         console.log(nameValues);
//         console.log(values);
        
//         // ביצוע השאילתא להוספת המשתמש
//         let user = await insertQuery("Users", nameValues, values);
//         console.log(user);
//         return user; // מחזיר את התוצאה
//     } catch (err) {
//         console.error('Query Error:', err);
//         return { "error": "err" }; // טיפול בשגיאות
//     }
// };

const updateUser = async (userId, updatedUser) => {
    console.log("updateUser");
    try {
        let updateU = "";
        for (const key in updatedUser) {
            if (typeof updatedUser[key] === "string") {
                updateU += `${key} = '${updatedUser[key]}', `;
            } else {
                updateU += `${key} = ${updatedUser[key]}, `;
            }
        }
        updateU = updateU.slice(0, -2);
        console.log(updateU);
        let user = await updateQuery("Users", updateU,"userId", userId);
        console.log(user);
        return user;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};

const deleteUser= async (userId) => {
    console.log("deleteUser");
    try {
        let user = await deleteQuery("Users", "userId", userId);
        console.log(user);
        return user;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};
    

// const addStudent = async (newStudnet) => {
//     console.log("addStudent")
//     try {
// let nameValues = "";
// let values="";
// for (const key in colums) {
//     nameValues+=  key+',';
//     if(colums[key] == "string")
//     values+=  `'${newStudnet[key]}',`;
//     else
//     values+=  newStudnet[key]+',';
// }
// nameValues = nameValues.slice(0, -1);
// values = values.slice(0, -1);
// console.log(nameValues);
// console.log(values);
//         let students = await insertQuery("student",nameValues,values);
//         console.log(students)
//        return students;
//     } catch (err) {
//         console.error('Query ');
//         return {"error":"err"};
//     } finally {
      
//     }
// };

const getTextById = async(id) => {
    try{
        let queText = await getQueryByField("Users","userId",id);
        console.log(queText);
        return queText;
    }
    catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    }
}
const getTextByEmail = async (email) => {
    try {
       
        let queText = await getQueryByField("Users", "email", `'${email}'`); 
        console.log(queText);
        return queText;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    }
}

 export { getUsers,getTextById,getTextByEmail, addUser,updateUser,deleteUser}
