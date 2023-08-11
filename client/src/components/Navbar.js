import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'


const Navbar = () => {
    const location = useLocation()
    // console.log(location.pathname);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchTerm("")
        navigate(`/search?term=${searchTerm}`)
    }


    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NoteCraft</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' && 'active'}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' && 'active'}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <form className="d-flex me-5" onSubmit={handleSearch}>
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control me-2" type="search" placeholder="Search By Title" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                    <button className="btn btn-outline-danger mx-1" onClick={()=>navigate("/liked")}>My Favs</button>
                    {!token ? <form className="d-flex">
                        <Link to='/login' className="btn btn-primary mx-1" role='button'>Login</Link>
                        <Link to='/signup' className="btn btn-primary mx-1" role='button'>Signup</Link>
                    </form> : <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>

    )
}

export default Navbar