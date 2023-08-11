import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert'
import Login from './components/Login'
import Signup from './components/Signup'
import Notes from './components/Notes'


const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <div className='container'>
          <Routes>
            <Route path='/' exact element={<Home showAlert={showAlert} />} />
            <Route path='/search' exact element={<Notes showAlert={showAlert} />} />
            <Route path='/liked' exact element={<Notes showAlert={showAlert} />} />
            <Route path='/about' exact element={<About />} />
            <Route path='/login' exact element={<Login showAlert={showAlert} />} />
            <Route path='/signup' exact element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </NoteState>
    </>
  )
}

export default App