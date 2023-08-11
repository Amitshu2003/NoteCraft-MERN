import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRouter from './routes/auth.js'
import notesRouter from './routes/notes.js'


const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/user",authRouter)
app.use("/api/notes", notesRouter)



mongoose.connect("mongodb://localhost:27017/iNoteMERN")
.then(()=>app.listen(5000,()=>console.log('server running on port 5000')))
.catch((err)=>console.log(err))