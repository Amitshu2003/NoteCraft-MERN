import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = ({showAlert}) => {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch("https://notecraft.onrender.com/api/user/login",{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({email,password})
        })
        const res = await response.json()

        if(res.success){
            //save the auth token and redirect to home page
            localStorage.setItem('token', res.authToken)
            showAlert("Logged in Successfully", "success")
            navigate("/")

        }else{
            showAlert("Invalid Credentials", "danger")
        }

        setEmail("")
        setPassword("")
    }

    return (
        <div className='mt-2'>
            <h2>Login to continue to NoteCraft</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" name='email' id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name='password' className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login