import express from 'express'
import { fetchAllNotes, addNote, updateNote,deleteNote, fetchNotesBySearchQuery } from '../controllers/notes.js'
const router = express.Router()
import { verifyUser } from '../middlewares/verifyUser.js'
import { body } from 'express-validator'

// 1. get all notes -> get ('/api/notes/fetchallnotes')
router.get('/fetchallnotes', verifyUser, fetchAllNotes)

// 2. add a note -> post ('/api/notes/addnote')
router.post('/addnote', verifyUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })
],
    addNote)


// 3. update a note -> put ('/api/notes/updatenote/:id')
router.put('/updatenote/:id', verifyUser, updateNote)


// 4. delete a note -> delete ('/api/notes/deletenote/:id')
router.delete('/deletenote/:id', verifyUser, deleteNote)

// 5. Search Notes -> get ('/api/notes/search?term='xyz'')
router.get('/search',verifyUser, fetchNotesBySearchQuery)



export default router