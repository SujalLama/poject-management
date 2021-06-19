const db = require("../models");

const getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll({include: db.Contact});
        res.json({users});
    } catch (error) {
        res.json({error});
    }
}

const getSingleUser = async (req, res) => {
    try {
       const user = await db.User.findByPk(req.params.id);
        res.json({user});
    } catch (error) {
        res.json({error});
    }
}

const updateUser = async (req, res) => {
    try {
        const { contact, name, email, password} = req.body;
        const [newContact] = contact;

        const result = await sequelize.transaction(async (t) => {
        const updatedUser =  await db.User.update({name, email, password}, 
                    {where: {id: req.params.id}}, {transaction: t});
            await Contact.update(newContact, {where: {userId: req.params.id}}, {transaction: t})
            return updatedUser
        })

        res.json({message: 'user is successfully updated.', result});

    } catch (error) {
        res.json({error});
    }
}

const createUser = async (req, res) => {
    try {
        const users = await db.User.create({...req.body}, {include: db.Contact});
        res.json({users});
    } catch (error) {
        res.json({error});
    }
}

const deleteUser = async (req, res) => {
    try {
        await db.User.destroy({where: {id: req.params.id}});
        res.json({message: 'user is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createUser, getAllUsers, getSingleUser, deleteUser, updateUser};