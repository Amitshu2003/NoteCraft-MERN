import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRouter from './routes/auth.js'
import notesRouter from './routes/notes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.use("/api/user",authRouter)
app.use("/api/notes", notesRouter)


mongoose.connect(process.env.MONGO_URL)
.then(()=>app.listen(PORT,()=>console.log(`server running on port ${PORT}`)))
.catch((err)=>console.log(err))