const express = require('express')
const {PORT, DB_SYNC} = require('./config/serverConfig')

const app = express()

const apiRoutes = require('./routes/index')
const bodyParser = require('body-parser')
const db = require('./models')
const { User, Role}= require('./models/index')

const prepareAndStartServer = async()=>{

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.use('/api',apiRoutes)

    if(DB_SYNC){
        db.sequelize.sync({alter: true})
    }

    const u1 = await User.findByPk(3)
    const r1 = await Role.findByPk(1)
    u1.addRole(r1)

    app.listen(PORT,()=>{
        console.log(`server running on PORT no. ${PORT}`)
    })
}

prepareAndStartServer()