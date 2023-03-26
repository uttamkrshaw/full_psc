require("dotenv").config()
const express = require("express")
var cors = require('cors')
const {connection} = require("mongoose")
const {notesRouter} = require("./Router/notes.router")
const {userRouter} = require("./Router/user.router")
const {auth} = require("./Middleware/auth")
const app = express()
app.use(express.json())
app.use(cors())

app.use("/user", userRouter)
app.use(auth)
app.use("/notes", notesRouter)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Server Is Running");
    } catch (error) {
        console.log(error.message);
    }
})
