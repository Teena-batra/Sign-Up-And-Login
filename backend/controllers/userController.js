const db = require("../db");
const mysql = require("mysql2/promise");

const insertion = async(req,res) => {
    try {
        //console.log("req",req.body)
        const {username, email, password} = req.body;
        console.log("in Insertion")
        const query = `INSERT INTO signup(Username, Email, Password ) VALUES(?,?,?)`
        const values = [username,email,password];
        const connection = await db.createPool(); // Assuming connectDB returns the pool
        const [row] = await connection.query(query, values)
    
        if(row.affectedRows === 0){
            throw new Error(400,"Failed to insert data");
        }else{
            return res.status(200).json(row);
        }
    } catch (error) {
        console.error("Error in insertion:", error);
        return res.status(500).json({ error: "Internal server error" });
        
    }
}


const login = async(req,res)=> {
    try {
       // console.log("req",req.body)
        const {email, password} = req.body;
        console.log("in login")
        const query = `SELECT * FROM signup WHERE email=? AND password=?`
        const values = [email,password];
        const connection = await db.createPool(); // Assuming connectDB returns the pool
        console.log("dbCon")
        const [row] = await connection.query(query, values)
        
    
        if(row.length === 0){
            throw new Error(400,"Invalid email or password");
        }else{
            return res.status(200).json("Success");
        }
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ error: "Internal server error" });
        
    }

}

module.exports = {
    insertion,
    login
}