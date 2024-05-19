const UserService = require('../services/User-service')

const userService = new UserService()

const create = async(req,res)=>{
    try {
        
        const user = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        res.status(201).json({
            data: user,
            success: true, 
            message: 'successfully registered',
            error: {}
        })
    } catch (error) {
        console.log('something went wrong in service layer')
        res.status(500).json({
            data: {},
            success: false, 
            message: 'faild to register user',
            error: error
        })
    }
}

module.exports = {
    create
}