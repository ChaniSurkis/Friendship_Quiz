import connectToDatabase from './database.js';
import {getQuery,insertQuery,deleteQuery,updateQuery,getQueryByField,getQuery2} from '../service/query.js'
const colums ={"userName":"string","passwordUser":"string","email":"string"};
const getUsers = async () => {
    try {
        let users = await getQuery("Users");
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
        let user = await insertQuery("Users", nameValues, values);
        console.log(user);
        return user;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};
const login=async(email,passwordUser)=>{
try{
    let user = await getQuery2("Users","*","email","passwordUser",`'${email}'`,`'${passwordUser}'`);
    console.log(user);
    if(user.length===0){
        return {error:"User not found"};
    }
    if(user[0].passwordUser!==passwordUser){
        return {error:"Invalid password"};
    }
    return user;
}
catch(err){
    console.error('Query Error:', err);
    return { "error": "err" };
}}
const updateUser = async (userId, updatedUser) => {
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
    

const getTextById = async(id) => {
    try{
        let userText = await getQueryByField("Users","userId",id);
        return userText;
    }
    catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    }
}
const getTextByEmail = async (email) => {
    try {
        let userText = await getQueryByField("Users", "email", `'${email}'`);
        console.log(userText,'222222222222222222222222');
        return userText;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    }
}

 export { getUsers,getTextById,getTextByEmail, addUser,updateUser,deleteUser,login}
