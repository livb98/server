import { _sendMessage, _getAllChat, _getChat, _newChat } from "./model.c.js";
import { getUser } from "../users/controller.u.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

export const getChat = async (req, res) => {
    const { chat_id, sender_id, getmsg_id } = req.params;
    try {
        const chat = await _getChat(chat_id, sender_id, getmsg_id);
        res.json(chat);
    } catch (error) {
        console.log(`Chat controller error => ${error}`);
        res.status(404).json({ msg: 'Chat not found' });
    }
}

export const getAllChat = async (req, res) => {
    const { user_id } = req.params;
    try {
        const chatDetails = await _getAllChat(user_id);
        res.json(chatDetails);
    } catch (error) {
        console.log(`Chat details controller error => ${error}`);
        res.status(404).json({ msg: 'Chat details not found' });
    }
}

export const sendMessage = async (req, res) => {
    const {  chat_id, sender_id,getmsg_id,message } = req.body;
    try {
        const chat = await _sendMessage({ chat_id, sender_id,getmsg_id, message });
        // res.json(chat);
        req.params.chat_id = chat_id
        req.params.sender_id = sender_id
        req.params.getmsg_id = getmsg_id
        getChat(req,res)
    } catch (error) {
        console.log(`send msg cont => ${error}`);
        res.status(404).json({ msg: 'not found' });
    }
};

export const newChat = async(req,res) => {
    const {chat_id} = req.params
    const {fk_user1, fk_user2} = req.body
    try {
        const newchat = await _newChat({fk_user1,fk_user2})
        res.json(newchat)
    } catch(error) {
        console.log(`new chat cont => ${error}`);
        res.status(404).json({ msg: 'not found' });
    }
}