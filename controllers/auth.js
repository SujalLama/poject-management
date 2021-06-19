const db = require("../models");

const login = async (req, res) => {
    try {
        const {password, email} = req.body;
        if(!password || !email) return res.status(400).json({message: 'Empty password or username.'});
        
        const user = await db.User.findOne({where: {email}});
        if(!user) {
            return res.status(400).json({message: 'Invalid password or username.'})
        }

        // checking password
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({message: 'Invalid password or username.'})
        }

        res.status(200).json({token: user.token});
    } catch (error) {
        res.status(400).json({error: error.errors[0].message})
    }
}

const register = async (req, res) => {
    try {
        const user = await db.User.create(req.body);
        const token = user.generateToken();
        user.token = token;
        user.save()
        res.status(200).json({token});
    } catch (error) {
        res.status(400).json({error: error.errors[0].message})
    }
}

module.exports = {register, login};