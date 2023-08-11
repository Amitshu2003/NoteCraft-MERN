import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const url = "http://localhost:5000"

  const [notes, setNotes] = useState([])
 

  // GET all notes
  const getNotes = async () => {

    const response = await fetch(`${url}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const res = await response.json()
    setNotes(res)
  }


  // Search notes
  const searchNotes = async (searchTerm) => {

    const response = await fetch(`${url}/api/notes/search?term=${searchTerm}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const res = await response.json()
    console.log(res);
    setNotes(res)
  }

  // Add a note
  const addNote = async ({ title, description, tag }) => {

    const response = await fetch(`${url}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    const note = await response.json()

    setNotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = async (id) => {

    const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })

    const newNotes = notes.filter((note) => note._id !== id)
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = async (note) => {
    const { id, title, description, tag } = note

    const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    const res = await response.json()
    // console.log(res);

    // this will create a new copy of notes array so that we can update notes state using setState
    let newNotes = JSON.parse(JSON.stringify(notes))

    newNotes.map((note) => {
      if (note._id === id) {
        note.title = title
        note.description = description
        note.tag = tag
      }
    })
    setNotes(newNotes)
  }


  // Like a note
  const likeNote = async ({ id, liked }) => {
    const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ liked })
    })
    const res = await response.json()
    // console.log(res);

    // this will create a new copy of notes array so that we can update notes state using setState
    let newNotes = JSON.parse(JSON.stringify(notes))

    newNotes.map((note) => {
      if (note._id === id) {
        note.liked = liked
      }
    })

    setNotes(newNotes)
  }

  return (
    <noteContext.Provider value={{ notes, getNotes, searchNotes, addNote, editNote, likeNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState