const Users = require("../models/Users");
module.exports = class UsersService{
    static async createUser(data){
        try{
            const newUser = {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
            }
            const response = await new Users(newUser).save();
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async getUserbyEmail(email){
        try {
            const userFound =  await Users.findOne({email: email});
            return userFound;
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }

    static async getUserbyId(userId) {
        try {
            const result = await Users.findById({ _id: userId }).select("-password");
            return result;
        } catch (error) {
            console.log(`User not found. ${error}`);
        }
    }
}