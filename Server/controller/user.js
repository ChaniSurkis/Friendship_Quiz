import { readFile, writeFile } from 'node:fs/promises';
import {getUsers,getTextById,addUser,updateUser,deleteUser, getTextByEmail} from '../service/user.js';
import { body, validationResult } from 'express-validator';

export class User {
    getAll = async (req, res) => {

        try {
            let users = await getUsers();
            console.log('successfully get /tmp/hello');
            res.send(users);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);

        }



    };
    
    getTextByUserFriendId = async (req, res) => {
        try {
            let text = await getTextById(req.params.userFriendId); 
            console.log('successfully get /tmp/hello');
            res.send(text);
        } catch (error) { 
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    }
    getTextByUserEmail = async (req, res) => {
        try {
            let email = req.params.email; // כאן אנחנו מקבלים את הסיסמה מתוך ה-URL
            let text = await getTextByEmail(email); // מעבירים את הסיסמה לפונקציה שמבצעת את השאילתה
            console.log('successfully get user by password');
            res.send(text); // מחזירים את התוצאה לפוסטמן
        } catch (error) {
            console.error('There was an error:', error.message);
            res.status(500).send(error.message); // אם יש שגיאה, מחזירים הודעת שגיאה
        }
    }
    
    
    add = async (req, res) => {
        try {
          // שלב 1: הוספת הבדיקות (לא צריך await)
          await body('email').isEmail().withMessage('Email is invalid').run(req);
          await body('passwordUser').isLength({min:6}).withMessage('password is invalid').run(req);
          // בדיקת שגיאות לאחר ריצה של הבדיקות
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
      
          // אם הקלט תקין, המשך עם פעולת ההוספה
          let newUser = req.body;
          console.log(newUser);
      
          // שלב 2: הוספה למסד הנתונים
          let users = await addUser(newUser); 
          console.log(users);
      
          // שלב 3: החזרת התשובה
          res.send(users);
        } catch (error) {
          console.log('There was an error:', error.message);
          res.status(500).send(error.message);
        }
      };
    


    update=async(req,res)=>
        {
            try{
                const userId=req.params.userId;
                let updatedUser=req.body;
                console.log(updatedUser);
                let updatedUsers=await updateUser(userId,updatedUser);
                console.log(updatedUsers);
                res.send(updatedUsers);
            }
            catch (error) {
            console.log('There was an error:', error.message);
            res.status(500).send(error.message);
            }
    
        }
        
    delete = async (req, res) => {
        try {
            const userId = req.params.userId;
            console.log(`Deleting user with id: ${userId}`);
            let result = await deleteUser(userId); 
            console.log(result);
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
    


    // add =async (req, res) => {

    //     try {
    //         let newStudent = req.body;
    //         console.log(newStudent)
    //         //  add validate
    //         let students = await addStudent(newStudent);
    //         console.log(students);
    //         res.send(students);
    
    //     } catch (error) {
    //         console.log('there was an error:', error.message);
    //         res.status(500).send(error.message);
    
    //     }
    
    
    // }
}
