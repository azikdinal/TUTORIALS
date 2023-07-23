import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'}))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

const start = async () => {
    try {
        connectDB(process.env.MONGO_DB_URL)
        app.listen(8080, () => console.log('Server has started on port 8080'))
    } catch (e) {
        console.log(e)
    }
}

start()