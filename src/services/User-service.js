const jwt = require('jsonwebtoken')
const UserRepository = require('../repository/User-repository.js')
const {JWT_KEY} = require('../config/serverConfig.js')
const bcrypt = require('bcrypt')
const AppError = require('../utils/error-handler.js')

class UserService{
    constructor(){
        this.userRepository = new UserRepository() 
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data)
            return user
        } catch (error) {
            if(error.name = 'SequelizeValidationError'){
                throw error
            }
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

    #createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'})
            return result
        } catch (error) {
            console.log('something went wrong in token creation ')
            throw error
        }
    }

    async signIn(email, plainPassword){
        try {
            // --> step1 fetch the user using email
            const user = await this.userRepository.getByEmail(email)
            // --> step2 compare incoming plain password to encrypted stored password
            const passwordsMatch = this.#checkPassword(plainPassword, user.password)

            if(!passwordsMatch){
                console.log('password does not match')
                throw {error: 'incorrect password'}
            }

            // --> step3 create a new jwt token and pass to client
            const newJwt = this.#createToken({email: user.email , id: user.id})

            return newJwt

        } catch (error) {
            console.log('something went wrong in signin process',error)
            throw error
            
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token)
            if(!response){
                throw {error: 'Invalid token'}
            }

            const user = this.userRepository.getById(response.id)
            if(!user){
                throw {error: 'No user with this corresponding token exists'}
            }
            return user.id 
        } catch (error) {
            console.log('something went wrong auth process',error)
            throw error
        }
    }


    verifyToken(token){
        try {
            const result =  jwt.verify(token, JWT_KEY)
            return result
        } catch (error) {
            console.log('something went wrong in token validations',error)
            throw error
        }
    }

    #checkPassword(userInputPlainPassword, encryptPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptPassword)
        } catch (error) {
            console.log('Something went wrong in password comparison')
            throw err
        }
    }

    async isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId)
             
        } catch (error) {
            console.log('Something went wrong in service layer')
            throw err
        }
    }
}

module.exports = UserService