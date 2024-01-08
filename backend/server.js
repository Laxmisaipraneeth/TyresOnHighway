const express = require('express')
const mongoose = require('mongoose')
const tollRouter = require('./routes/toll')
const manuRouter = require('./routes/manu')
const userRouter = require('./routes/user')
const cors = require('cors')
const PORT = 5000

const app = express()
app.use(express.json())
app.use(cors())

app.use('/toll',tollRouter)
app.use('/manu',manuRouter)
app.use('/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
