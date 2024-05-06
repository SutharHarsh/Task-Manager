const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
})