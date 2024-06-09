import { _getAllUsers, _getUser, _register, _login } from './model.u.js'
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();

const currentDate = new Date();
currentDate.setHours(23, 59, 59, 999);
const expTime = Math.floor(currentDate / 60 * 100 ) 

export const getAllUsers = async(req,res) => {
    try {
        const users = await _getAllUsers()
        res.json(users)

    } catch (error) {
        console.log(`error cont => ${error}`);
        res.status(404).json({msg:'not found'})
    }
}

const {ACCESS_TOKEN_SECRET} = process.env

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const user = await _getUser(id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(404).json({ msg: 'Wrong password' });

        const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            ACCESS_TOKEN_SECRET, 
            { expiresIn: expTime }
        );

        res.cookie('token', accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.json({ token: accessToken, user: user });
    } catch (error) {
        console.error('Error in getUser:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};


export const Register = async(req,res) => {
    const {fname,lname,username,date_birth, password} = req.body
    try {
        const lowfname = fname.toLowerCase();
        const lowlname = lname.toLowerCase();
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password + "", salt);
        const newuser = await _register({
          fname: lowfname,
          lname: lowlname,
          username: username,
          date_birth: date_birth,
          password: hashpassword,
        })
        res.json(newuser);


    } catch(error) {
        console.log(`error register cont  => ${error}`);
        res.status(404).json({msg:'not found register'})
    }
}

export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await _login(username);
        if (!user) return res.status(404).json({ msg: 'user not found' });
        const isMatch = bcrypt.compareSync(password + '', user.password);
        if (!isMatch) return res.status(404).json({ msg: 'wrong password' });

        
        const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            user.password, 
            { expiresIn: expTime } 
        );

        res.cookie('token', accessToken, {
            httpOnly: true,
            maxAge: 60 * 10000
        });

        res.json({ token: accessToken, user: user });
    } catch (error) {
        console.log("login=>", error);
        res.status(404).json({ msg: "login failed" });
    }
};
console.log('ACCESS_TOKEN_SECRET:',ACCESS_TOKEN_SECRET);