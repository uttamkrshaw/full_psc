const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if (token) {
        const decoded = jwt.verify(token, "Masai")
        if (decoded) {
            //console.log("userID decoded",decoded.userID);
            req.body.userID = decoded.userID
            next()
        } else {
            res.satus(400).send({"msg": "Decoded message Error"})
        }
        // res.satus(400).send({"msg": "No Token Found"})

    } else {
        res.satus(400).send({"msg": "No Token Found"})
    }
}

module.exports = {
    auth
}
