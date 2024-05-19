const UserRepository = require('../repository/User-repository.js')

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
}

module.exports = UserService