import { _sendMessage, _getAllChat, _getChat } from "./model.c.js";
import { getUser } from "../users/controller.u.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();

export const getChat = async(req,res) =>{
    const {chat_id} = req.params
    try {
        const chat = await _getChat(chat_id)
        res.json(chat)

    } catch (error) {
        console.log(`chat cont => ${error}`);
        res.status(404).json({msg:'not found'})
    }
}

export const getAllChat = async(req,res) => {
    const { user_id } = req.params;
    try {
        const chatDetails = await _getAllChat(user_id);
        res.json(chatDetails);
    } catch (error) {
        console.log(`Chat details controller error => ${error}`);
        res.status(404).json({ msg: 'Not found' });
    }
}

export const sendMessage = async (req, res) => {
    const {  chat_id, sender_id,message } = req.body;
    try {
        const chat = await _sendMessage({ chat_id, sender_id, message });
        res.json(chat);
    } catch (error) {
        console.log(`send msg cont => ${error}`);
        res.status(404).json({ msg: 'not found' });
    }
};