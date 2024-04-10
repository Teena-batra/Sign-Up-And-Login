const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const createPool = async() => {
    try {
        const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
        // host: "localhost",
        // user: "root",
        // password: "",
        // database: "login_and_signup"
    })
    console.log("Connected to mysql database");
    return pool;
    } catch (error) {
        console.log("Mysql connection error", error.message);
        process.exit(1);
        
    }

}

module.exports = {
    createPool,
}
