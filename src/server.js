import express from 'express'
import { connection as sql } from './configurations/mysql.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import router from './router.js'
import configureMq from './configurations/rabbitmq.js'

dotenv.config()
const app = express()



app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use('/', router)
configureMq()

sql.connect(err => {
    if (err) {
        throw err
    }
})
app.listen(process.env.PORT, err => console.log(err ? err : "Server started : " + process.env.PORT))
