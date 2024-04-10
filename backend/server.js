const express = require("express")
const cors = require("cors");
const db = require("./db");
const insertion = require("./controllers/userController");
const login = require("./controllers/userController");

db.createPool();

const app = express();
app.use(express.json());
//const router = express.Router();

app.use(cors());

app.post("/signup", insertion.insertion)

app.post("/login",login.login)




app.listen(process.env.PORT, ()=> {
    console.log(`Server is listening on port: ${process.env.PORT}`);
})