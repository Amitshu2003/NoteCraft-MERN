import express from 'express'
const router = express.Router()
import { body } from 'express-validator'
import { createUser, getUser, loginUser } from '../controllers/user.js'
import { verifyUser } from '../middlewares/verifyUser.js'

// 1. create a user -> post request ('/api/user/createuser')
router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], createUser)


// 2. login a user -> post('/api/user/login')
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], loginUser)


// 3. Protected Route -> get user details -> get('/api/user/getuser')
router.get("/getuser",verifyUser, getUser)

export default router