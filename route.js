import express from "express";
import { getAllUsers, Register, Login, getUser } from './users/controller.u.js';
import { getAllDestinations, addDestination, getDestinationsByUser, getUserByDestination } from "./destinations/controller.d.js";
import { verifiedToken } from "./middlewares/verifiedToken.js";
import {  sendMessage, getAllChat, getChat, newChat } from "./chat/controller.c.js";

const router = express.Router();

router.get('/users', verifiedToken, getAllUsers);
router.post('/users/register', Register);
router.post('/users/login', Login);
router.get('/users/:id', getUser);

router.get('/destinations/users/:country', getAllDestinations);
router.post('/destination/add/:user_id', addDestination); 
router.get('/destinations/:user_id', getDestinationsByUser)
router.get('/destinations/:user_id/:country',getUserByDestination)


router.post('/chat/:chat_id/:sender_id/:getmsg_id', sendMessage)
router.get('/chat/users/:user_id', getAllChat)
router.get('/chat/:chat_id/:sender_id/:user2_id', getChat);
router.post('/chat/new/:user1_id/:user2_id', newChat)


router.get('/verify', verifiedToken, (req, res) => {
    res.sendStatus(200);
});

export default router;
