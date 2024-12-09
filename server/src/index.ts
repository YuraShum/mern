import express, { Application } from "express"
import path from "path"
import { config } from "./config"
import {apiRoutes} from './routes'

const app: Application = express()

const {port} = config

app.use(express.json())
app.use('/', express.static(path.join(__dirname, '../public')))
app.use('/api', apiRoutes)


app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views', '404.html'))
    } else if (req.accepts('json')){
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})