import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'


const Home = ({showAlert}) => {
  return (
    <div>
      <AddNote showAlert={showAlert} />
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home