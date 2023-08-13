import User from "../models/User.js"
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => {
    let success = false
    // if there are errors return bad request with errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: errors.array() })
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, message: "Sorry a user with this email already exists" })
        }

        //protecting the password
        const salt = await bcrypt.genSalt(10)
        const securedPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        })

        // sending token 
        const authToken = jwt.sign({ id: user.id }, 'secret')
        success = true
        res.json({ success, authToken })    

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

export const loginUser = async (req, res) => {
    let success = false
    // if there are errors return bad request with errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: errors.array() })
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) return res.status(400).json({ success, error: "Invalid Credentials" })

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) return res.status(400).json({ success, error: "Invalid Credentials" })

        // sending token 
        const authToken = jwt.sign({ id: user.id }, 'secret')
        success = true
        res.json({ success: true, authToken })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.userId
        //selecting everything except password
        const user = await User.findById(userId).select("-password")
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}