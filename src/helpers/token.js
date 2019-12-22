import env from "dotenv";
import jwt from "jsonwebtoken";

env.config();
const secret = process.env.SECRET_KEY;

// Find  out different method of expiration
const expiration = 450000;


const generateToken = ({ user_id, email, is_admin }) => jwt.sign({ user_id, email, is_admin }, secret, {
    expiresIn: expiration,
});


export default generateToken;
