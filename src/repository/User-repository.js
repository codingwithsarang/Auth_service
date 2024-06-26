const  ValidationError  = require('../utils/validation-error.js')
const {User, Role} = require('../models/index.js')

class UserRepository{
    async create(data){
        try {
            const user = await User.create(data)
            return user
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                return new ValidationError(error)
            }
            console.log('something went wrong in repository layer')
            throw error
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            })
            return true
        } catch (error) {
            console.log('something went wrong in repository layer')
            throw error
        }
    }
    async getById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes: ['id',"email"]
            })
            return user
        } catch (error) {
            console.log('something went wrong in repository layer')
            throw error
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{
                    email: userEmail
                }
            })
            return user
        } catch (error) {
            console.log('something went wrong in repository layer')
            throw error
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId)
            const adminRole = await Role.findOne({
                where: {
                    name : 'Admin'
                }
            })
            return user.hasRole(adminRole)
        } catch (error) {
            console.log(error)
            console.log('something went wrong in repository layer')
            throw error
        }
    }
}


module.exports = UserRepository