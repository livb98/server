import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const currentDate = new Date();
const {accesstoken, ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET} = process.env

const expTime = Math.floor(currentDate / 60 * 1000 ) 

export const verifiedToken = (req, res, next) => {
    const accesstoken = req.cookies.token || req.headers['x-access-token']
    console.log(accesstoken);
    if(!accesstoken) return res.status(403).json({msg: 'unauthorized'})
    jwt.verify(accesstoken, ACCESS_TOKEN_SECRET , (err, decode) => {
        if(err) return res.status(404).json({msg: 'forbiden'})
        req.userid = decode.id
        req.useremail = decode.email
        next()
    })
}
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';

// dotenv.config();

// // Function to generate a user-specific secret based on some user-specific information
// const generateUserSecret = (userId) => {
//     // Example: Derive secret from user ID using bcrypt
//     return bcrypt.hashSync(userId, 10); // Hash the user ID with bcrypt
// };

// export const generateAccessToken = (userId) => {
//     // Generate user-specific secret
//     const userSecret = generateUserSecret(userId);

//     // Generate JWT token using user-specific secret
//     const accessToken = jwt.sign(
//         { id: userId },
//         userSecret,
//         { expiresIn: '1h' } // Example expiration time
//     );

//     return accessToken;
// };

// export const verifiedToken = (accessToken, userId) => {
//     // Retrieve user-specific secret based on user ID
//     const userSecret = generateUserSecret(userId);

//     try {
//         // Verify JWT token using user-specific secret
//         const decoded = jwt.verify(accessToken, userSecret);
//         return decoded;
//     } catch (error) {
//         return null; // Token verification failed
//     }
// };
