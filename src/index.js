const express = require('express')
const {PORT} = require('./config/serverConfig')

const app = express()

const apiRoutes = require('./routes/index')
const bodyParser = require('body-parser')


const prepareAndStartServer = async()=>{

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.use('/api',apiRoutes)


    

    app.listen(PORT,()=>{
        console.log(`server running on PORT no. ${PORT}`)
    })
}

prepareAndStartServer()