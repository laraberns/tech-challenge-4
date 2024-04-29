const express = require('express')
const cors = require('cors')
const app = express()

var corsOptions = {
    origin: 'https:localhost:8081'
}

// middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routers
const userRouters = require('./routes/user')

app.use('/api/users', userRouters)

//server
app.listen(8081, () => console.log('server is running on 8081'))