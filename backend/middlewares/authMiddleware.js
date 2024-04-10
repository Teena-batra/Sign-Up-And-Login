const jwt = require("jsonwebtoken")
const db = require("../db")
const dotenv = require("dotenv");

dotenv.config();

const verifyJWT = async(req,res,next) => {
    try {
        let token =
            req.cookies.token ||
            (req.headers.authorization &&
            req.headers.authorization.replace("Bearer", ""));

            if(!token){
                throw new Error("Token not found");
            }

            const decodedTokenValue = jwt.verify(token, SECRET_KEY);
            console.log("decoded token value", decodedTokenValue)

            const query = `SELECT * FROM signup WHERE id=?`;
            const value = [decodedTokenValue.id];
            const [row] = await db.query(query,value);
            const user = row[0];

            if(!user) {
                throw new Error("User not found");
            }
            req.user = user;
            console.log("req.user: ",req.user)
            next();
    } catch (error) {
        console.log("error in auth middleware", error);
        throw new Error(error.message);
    }

    module.exports = {
        verifyJWT
    }
}