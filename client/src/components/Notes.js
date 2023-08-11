import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const Notes = ({ showAlert }) => {
  const context = useContext(noteContext)
  var { notes, getNotes, editNote, searchNotes } = context
  const navigate = useNavigate()
  const location = useLocation()

  if (location.pathname === '/liked') {
    notes = notes.filter((item) => item.liked === true)
  }
  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" })
  const ref = useRef(null)
  const refClose = useRef(null)

  let [searchParams] = useSearchParams()
  const term = searchParams.get("term")

  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (location.pathname === '/search') searchNotes(term)
      else getNotes()
    }
    else navigate("/login")
  }, [location])

  const updateNote = (currentNote) => {
    const { title, description, tag } = currentNote
    ref.current.click()
    setNote({ id: currentNote._id, title, description, tag })
  }


  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = () => {
    editNote(note)
    showAlert("Updated Successfully", "success")
    refClose.current.click()
  }


  return (
    <div>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo model
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" value={note.title} onChange={onChange} className="form-control" id="title" name="title" minLength={5} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" value={note.description} onChange={onChange} className="form-control" name="description" id="description" minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" value={note.tag} onChange={onChange} className="form-control" name="tag" id="tag" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        {
          !notes.length ? <div className='container mx-2'> No Notes to display </div> :
            <>
              {
                notes.map((note) => (
                  <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert} />
                ))
              }
            </>
        }

      </div>
    </div>
  )
}

export default Notes