const express = require("express")
const notesRouter = express.Router()
const {NoteModel} = require("../Model/note.model")
const jwt = require("jsonwebtoken")

notesRouter.get("/get", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, "Masai")
    try {
        if (decoded) {
            const notes = await NoteModel.find({"userID": decoded.userID})
            res.status(200).send(notes)
        }

    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})

notesRouter.post("/add", async (req, res) => {
    console.log("id", req.body);
    try {
        const note = new NoteModel(req.body)
        // console.log("note",note);
        await note.save()
        res.status(200).send({"Msg": "Note Added"})
    } catch (error) {
        res.status(400).send({"Msg": error.message})
    }
})

notesRouter.patch("/update/:noteID", async (req, res) => { // console.log(req.params)
    const {noteID} = req.params
    try {
        await NoteModel.findByIdAndUpdate({
            _id: noteID
        }, req.body)
        res.status(200).send({"msg": "Particular Notes Updates"})
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})

notesRouter.delete("/delete/:noteID", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, "Masai")
    const {noteID} = req.params
    const req_id = decoded.userID
    const note = NoteModel.findOne({_id: noteID})
    const userID_in_note = note.userID;
    try {
        if (req_id === userID_in_note) {
            await NoteModel.findByIdAndRemove({_id: noteID})
            res.status(200).send({"msg": "Particular Note has been Deleted"})
        } else {
            res.status(400).send({"msg": "Not authorized"})
        }
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})

module.exports = {
    notesRouter
}
