import express, { Application } from "express"
import path from "path"
import { config, corsOptions } from "./config"
import { apiRoutes } from './routes'
import { errorHandler, logger } from "./middleware"
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { connectDB } from "./config"
import mongoose from "mongoose"
import { logEvents } from "./middleware"
import { LOGGER_MONOGO_ERROR_FILE_NAME } from "./constants"

//!! Поправити імпорти у файлах

const app: Application = express()

const { port } = config

app.use(express.json())

//!! Перевірити працездатність обмежень корсу
app.use(cors(corsOptions))
app.use(cookieParser())
// Підяключення до бази даних
connectDB()
app.use(logger)

app.use('/', express.static(path.join(__dirname, '../public')))
app.use('/api', apiRoutes)


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('✅ MongoDB connected successfully');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, LOGGER_MONOGO_ERROR_FILE_NAME)
})
