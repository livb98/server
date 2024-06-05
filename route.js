import express from "express";
import { getAllUsers, Register, Login, getUser } from './users/controller.u.js';
import { getAllDestinations, addDestination, getDestinationsByUser, getUserByDestination } from "./destinations/controller.d.js";
import { verifiedToken } from "./middlewares/verifiedToken.js";
import {  sendMessage, getAllChat, getChat } from "./chat/controller.c.js";

const router = express.Router();

router.get('/users', verifiedToken, getAllUsers);
router.post('/users/register', Register);
router.post('/users/login', Login);
router.get('/users/:id', getUser);

router.get('/destinations/users/:country', getAllDestinations);
router.post('/destination/add/:user_id', addDestination); 
router.get('/destinations/:user_id', getDestinationsByUser)
router.get('/destinations/:user_id/:country',getUserByDestination)


router.post('/chat/:user1_id/:user2_id', sendMessage)
router.get('/chat/:chat_id',getChat)
router.get('/chat/users/:user_id', getAllChat)
router.get('/verify', verifiedToken, (req, res) => {
    res.sendStatus(200);
});

export default router;
