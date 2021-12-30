const UsersService = require("../services/UsersService");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { Result } = require("express-validator");

module.exports = class Users{

    static async apiCreateUser(req, res, next){
        try {
            
            let user = await UsersService.getUserbyEmail(req.body.email);
            if (user) {
                return res.status(400).json({ error: 'Sorry a user with this email already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

            const createUser = await UsersService.createUser(req.body).then((result) => {
                const data = {
                    user: {
                        id: result.id
                    }
                }
                const authToken = jwt.sign(data, process.env.SECRET_KEY);
                res.json({ authtoken: authToken });
            });

            //res.json(createUser);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async apiUserLogin(req, res) {
        try {

            const email = req.body.email;

            const user = await UsersService.getUserbyEmail(email);
            if (!user) {
                return res.status(400).json({ error: "Please provide a corrent credentials." });
            }

            const passwordCompare = await bcrypt.compare(req.body.password, user.password);

            if (!passwordCompare) {
                return res.status(400).json({ error: "Please provide a corrent credentials." });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, process.env.SECRET_KEY, {expiresIn: '1800s'});
            res.json({ authtoken: authToken });
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error!");
        }
    }

    static async apiGetUserById(req, res, next) {
        try {
            let id = req.user.id || {};
            const user = await UsersService.getUserbyId(id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}