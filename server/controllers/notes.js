import Notes from "../models/Note.js"
import { validationResult } from 'express-validator'
import paginate from 'jw-paginate'


export const fetchAllNotes = async (req, res) => {
    const data = await Notes.find({ user: req.userId })
    res.send(data)
}

export const fetchNotesBySearchQuery = async (req, res) => {
    const { term } = req.query

    try {
        const title = new RegExp(term, 'i') 
        const result = await Notes.find({ user: req.userId, title: title })
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

export const addNote = async (req, res) => {
    // if there are errors return bad request with errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    const { title, description, tag } = req.body
    try {
        const note = new Notes({ title, description, tag, user: req.userId })
        const savedNote = await note.save()

        res.send(savedNote)

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

export const updateNote = async (req, res) => {
    const newNote = req.body
    const { id } = req.params

    try {
        var note = await Notes.findById(id)
        if (!note) return res.status(404).send("Not Found")

        if (note.user.toString() !== req.userId) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(id, newNote, { new: true })
        res.send(note)

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}



export const deleteNote = async (req, res) => {
    const { id } = req.params

    try {
        var note = await Notes.findById(id)
        if (!note) return res.status(404).send("Not Found")

        if (note.user.toString() !== req.userId) {
            return res.status(401).send("Not Allowed")
        }

        await Notes.findByIdAndDelete(id)
        res.send("note deleted successfully")

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}
