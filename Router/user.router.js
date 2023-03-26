const express = require("express")
const {UserModel} = require("../Model/model")
const userRouter = express.Router()
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// login
userRouter.post("/login", async (req, res) => {
    const {username, password} = req.body
   // console.log(req.body)
    try {
        const user = await UserModel.findOne({username})
        console.log(user)
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => { // result == true
                console.log(result)
                if (result) {
                    res.status(200).send({"msg": "Login Successful","token": jwt.sign({"userID":user._id},"Masai")})
                } else {
                    res.status(400).send({"msg": "Login Denied Password Wrong"})
                }
            });
        }
        // user.length > 0? : res.send(400).send({"msg": "Login Failed User Not Found"})

    } catch (error) {
        res.send({"msg": error.message})
    }
})

// registration
userRouter.post("/register", async (req, res) => {
    const {
        email,
        password,
        username,
        age,
        location
    } = req.body
    try {
        // const user = UserModel(req.body)
        // await user.save()
        bcrypt.hash(password, 3, async (err, hash) => { // Store hash in your password DB.
            const user = new UserModel({
                email,
                password: hash,
                username,
                location,
                age
            })
            await user.save()
            res.status(200).send({"msg": "User Added"})
        });
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})


module.exports = {
    userRouter
}
