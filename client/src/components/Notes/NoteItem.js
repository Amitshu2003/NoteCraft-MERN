import React, { useContext, useState } from 'react'
import noteContext from '../../context/notes/noteContext'

const NoteItem = ({ note, updateNote, showAlert }) => {
    const context = useContext(noteContext)
    const { likeNote, deleteNote } = context
    const { title, description, liked } = note
    const [likeItem, setlikeItem] = useState(liked)

    const handleDelete = () => {
        deleteNote(note._id)
        showAlert("Note Deleted Successfully", "success")
    }

    const handleLike = () => {
        setlikeItem(!likeItem)
        likeNote({ id: note._id, liked: !likeItem })
    }


    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title mt-2">{title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updateNote(note)}></i>
                        <i className={"fa-heart" + (likeItem ? ' fa-solid' : ' fa-regular')} onClick={handleLike} ></i>
                    </div>

                    <p className="card-text">{description} </p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem