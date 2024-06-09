import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const currentDate = new Date();
const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY} = process.env

const expTime = Math.floor(currentDate / 60 * 1000 ) 


export const verifiedToken = (req, res, next) => {
    const accesstoken = req.cookies.token || req.headers['x-access-token']
    if(!accesstoken) return res.status(403).json({msg: 'unauthorized'})
    jwt.verify(accesstoken, ACCESS_TOKEN_SECRET, (err, decode) => {
        if(err) return res.status(404).json({msg: 'forbiden'})
        req.userid = decode.id
        req.useremail = decode.email
        next()
        console.log(accesstoken);
    })
}