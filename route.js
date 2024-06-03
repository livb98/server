import express from "express";
import { getAllUsers, Register, Login, getUser } from './users/controller.u.js';
import { getAllDestinations, addDestination, getDestinationsByUser, getUserByDestination } from "./destinations/controller.d.js";
import { verifiedToken } from "./middlewares/verifiedToken.js";

const router = express.Router();

router.get('/users', verifiedToken, getAllUsers);
router.post('/users/register', Register);
router.post('/users/login', Login);
router.get('/users/:id', getUser);

router.get('/destinations', getAllDestinations);
router.post('/destination/add/:user_id', verifiedToken, addDestination); 
router.get('/destinations/:user_id', getDestinationsByUser)
router.get('/destinations/users/:country',getUserByDestination)

router.get('/verify', verifiedToken, (req, res) => {
    res.sendStatus(200);
});

export default router;

