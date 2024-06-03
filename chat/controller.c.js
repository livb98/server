import { _getChat } from "./model.c.js";
import { getUser } from "../users/controller.u.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();

export const getChat = async(req,res) =>{
    const {user_id1,user_id2} = req.params
    try {
        const chat = await _getChat(user_id1,user_id2)
        res.json(chat)

    } catch (error) {
        console.log(`chat cont => ${error}`);
        res.status(404).json({msg:'not found'})
    }
}
