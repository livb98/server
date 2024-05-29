import {_getAll} from './model.js'
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();

// const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = process.env

export const getAll = async(req,res) => {
    try {
        const users = await _getAll()
        res.json(users)

    } catch (error) {
        console.log(`error cont => ${error}`);
    }
}