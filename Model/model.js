require("dotenv").config()
const mongoose = require("mongoose")

const connection = mongoose.connect(process.env.url)

const userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    age: Number,
    location: String
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel,
    connection
}
