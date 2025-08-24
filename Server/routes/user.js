import express from "express";
import { User } from  "../controller/user.js"
import { readFile, writeFile } from 'node:fs/promises';
const userRouter = express.Router();
const userController = new User();
 
userRouter.get("/user",userController.getAll)
userRouter.get("/user/:userFriendId",userController.getTextByUserFriendId)
userRouter.get("/user/email/:email",userController.getTextByUserEmail)

//userRouter.get("/user/:id",userController.getAll)
userRouter.post("/user",userController.add)
userRouter.put("/user/:userId",userController.update)
userRouter.delete("/user/:userId",userController.delete)


export { userRouter }

// studentRouter.post("/",StudentController.add )

// familyRouter.delete("/:id_number", async (req, res) => {

//     try {
//        let id = req.params.id_number;
//         //  add validate
//         let students = await readFile('students.json');
//         students = JSON.parse(students);
//         let index = students.findIndex((s) => id == s.id_number);
//         if (index <0) {
//             res.status(500).send("user  not exist");
//         }
//         else {
//             students.splice(index,1)
//             try {
//                 await writeFile('students.json', JSON.stringify(students), "utf-8");
//             }
//             catch (error) {
//                 console.error('there was an error:', error.message);
//                 res.status(500).send(error.message);
//             }
//             console.log('successfully deleted /tmp/hello');
//             res.send({ date: "user deleted in success" });
//         }



//     } catch (error) {
//         console.log('there was an error:', error.message);
//         res.status(500).send(error.message);

//     }


// })


// studentRouter.put("/", async (req, res) => {

//     try {
//         let editStudent = req.body;
//         //  add validate
//         let students = await readFile('students.json');
//         students = JSON.parse(students);
//         let sexist = false;
//         for (let index = 0; index < students.length; index++) {
//             if (students[index].id_number == editStudent.id_number) {
//                 sexist = true;
//                 for (const key in editStudent) {
                    
//                     students[index][key]  = editStudent[key];
                        
//                 }
//                 break;
//             }

//         }
//         if (!sexist) {
//             res.status(500).send("user not  exist");
//         }
//         else {
           
//             try {
//                 await writeFile('students.json', JSON.stringify(students), "utf-8");
//             }
//             catch (error) {
//                 console.error('there was an error:', error.message);
//                 res.status(500).send(error.message);
//             }
//             console.log('successfully deleted /tmp/hello');
//             res.send({ date: "user updated in success" });
//         }

//     } catch (error) {
//         console.log('there was an error:', error.message);
//         res.status(500).send(error.message);

//     }


// })



