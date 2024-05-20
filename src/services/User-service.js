const jwt = require('jsonwebtoken')
const UserRepository = require('../repository/User-repository.js')
const {JWT_KEY} = require('../config/serverConfig.js')

class UserService{
    constructor(){
        this.userRepository = new UserRepository() 
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data)
            return user
        } catch (error) {
            console.log('something went wrong in service layer')
            console.log(error)
            throw error
        }
    }
    async destroy(data){
        try {
            await this.userRepository.destroy(data)
            return true
        } catch (error) {
            console.log('something went wrong in service layer')
            throw error
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'})
            return result
        } catch (error) {
            console.log('something went wrong in token creation ')
            throw error
        }
    }
    verifyToken(token){
        try {
            const result = jwt.verify(token, JWT_KEY)
            return result
        } catch (error) {
            console.log('something went wrong in token validations')
            throw error
        }
    }
}

module.exports = UserService