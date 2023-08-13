import React, { useState, useContext } from 'react'
import noteContext from '../../context/notes/noteContext'


const AddNote = ({showAlert}) => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note)
        setNote({ title: "", description: "", tag: "" })
        showAlert("Note Added Successfully","success")
    }

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <div className='container'>
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" onChange={onChange} className="form-control" id="title" name="title" minLength={5} required value={note.title}/>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" onChange={onChange} className="form-control" name="description" id="description" minLength={5} required value={note.description}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" onChange={onChange} className="form-control" name="tag" id="tag" minLength={5} required value={note.tag}/>
                    </div>

                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote