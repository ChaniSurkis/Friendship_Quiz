import express from "express";
import { User } from  "../controller/user.js"
import { use } from "react";
const userRouter = express.Router();
const userController = new User(); 
userRouter.get("/",userController.getAll)
userRouter.get("/:userFriendId",userController.getTextByUserFriendId)
userRouter.get("/email/:email",userController.getTextByUserEmail)
userRouter.post("/",userController.add)
userRouter.put("/:userId",userController.update)
userRouter.delete("/:userId",userController.delete)
userRouter.post("/login/",userController.login_)
export { userRouter }
