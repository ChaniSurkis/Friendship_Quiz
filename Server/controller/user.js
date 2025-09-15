import {getUsers,getTextById,addUser,updateUser,deleteUser, getTextByEmail,login} from '../service/user.js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export class User {
    getAll = async (req, res) => {
        try {
            let users = await getUsers();
            res.send(users);
        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    
    getTextByUserFriendId = async (req, res) => {
        try {
            let text = await getTextById(req.params.userFriendId); 
            res.send(text);
        } catch (error) { 
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    }
    getTextByUserEmail = async (req, res) => {
        try {
            let email = req.params.email;
            let text = await getTextByEmail(email); 
        //    const token=jwt.sign({"id":text[0].userId,"email":email,"name":text[0].userName},
        //     process.env.JWT_SECRET,
        //     {expiresIn: process.env.JWT_EXPIRES_IN}
        //     )
        //     res.json({token}); 
        res.send(text);
        } catch (error) {
            console.error('There was an error:', error.message);
            res.status(500).send(error.message); 
        }
    }
    
    
    add = async (req, res) => {
        try {
          await body('email').isEmail().withMessage('Email is invalid').run(req);
          await body('passwordUser').isLength({min:6}).withMessage('password is invalid').run(req);
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          let newUser = req.body;
          let users = await addUser(newUser);  
         const token=jwt.sign(
            {"id":users[0].userId,"email":newUser.email,"name":newUser.userName},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
          )
          res.json({ token });
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
                let updatedUsers=await updateUser(userId,updatedUser);
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
            let result = await deleteUser(userId); 
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

    login_=async(req,res)=>{
        try{
            const {email,passwordUser}=req.body;
            let user = await login(email,passwordUser);
            if(user.error){
                return res.status(401).send(user.error);
            }
            const token=jwt.sign({"id":user[0].userId,"email":email,"name":user[0].userName},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
            )
            res.json({token});
        } catch (error) {
            console.error('There was an error:', error.message);
            res.status(500).send(error.message);
        }}
    }
