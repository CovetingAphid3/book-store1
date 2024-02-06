import express from "express"
import {PORT,mongoDBURL} from "./config.js"
import mongoose from "mongoose";
import router from "./routes/booksRoute";
import cors from "cors"

const app = express();

//middleware for pasing request body
app.use(express.json())

//midleware for handling cors policy
//method 1

app.use(cors())
//method 2

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type']
//     })
// )

app.get("/",(req,res)=>{
    console.log(req)
    return res.status(234).send('Hello World')
})

app.use('/books',router)

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App is connected to database')
        app.listen(PORT, ()=>{
            console.log(`App is listening to port ${PORT}`)
        })
    })
    .catch((err)=>{
        console.log(err)
    })