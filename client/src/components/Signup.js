import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = ({ showAlert }) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password, cpassword } = credentials
        if (password !== cpassword) {
            showAlert("Passwords don't match", "danger")
            return;
        }
        const response = await fetch("http://localhost:5000/api/user/createuser", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        const res = await response.json()
        console.log(res);

        if (res.success) {
            //save the auth token and redirect to home page
            localStorage.setItem('token', res.authToken)
            showAlert("Account Created Successfully", "success")
            navigate("/")
        } else {
            showAlert("Invalid Details", "danger")
        }

        setCredentials({ name: "", email: "", password: "", cpassword: "" })

    }


    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='mt-2'>
            <h2>Create an account to use NoteCraft</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Your Name</label>
                    <input type="name" name='name' value={credentials.name} onChange={onChange} className="form-control" id="name" required minLength={3} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter Your Email </label>
                    <input type="email" name='email' value={credentials.email} onChange={onChange} className="form-control" id="email" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Password</label>
                    <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control" id="password" required minLength={5} />
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" name='cpassword' value={credentials.cpassword} onChange={onChange} className="form-control" id="cpassword" required minLength={5} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup