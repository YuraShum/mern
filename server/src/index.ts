import express, { Application } from "express"
import path from "path"
import { config, corsOptions } from "./config"
import { apiRoutes } from './routes'
import { errorHandler, logger } from "./middleware"
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app: Application = express()

const { port} = config

app.use(express.json())

//!! Перевірити працездатність обмежень корсу
app.use(cors(corsOptions))
app.use(cookieParser())
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})