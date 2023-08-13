import React from 'react'
import Notes from './Notes/Notes'
import AddNote from './Notes/AddNote'

const Home = ({ showAlert }) => {
  return (
    <div>
      <AddNote showAlert={showAlert} />
     
      <Notes showAlert={showAlert} />
    </div>
  )
}

export default Home