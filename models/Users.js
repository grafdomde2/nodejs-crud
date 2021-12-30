const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = Schema({
    name:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    password:{
        type: String,
        required: true,
    },

    phone:{
        type: String,
        required: true,
    },

    date:{
        type: Date,
        default: Date.now()
    }
});

//module.exports = Users = mongoose.model("Users", usersSchema);
const Users = mongoose.model('Users', usersSchema);
Users.createIndexes();
module.exports = Users;