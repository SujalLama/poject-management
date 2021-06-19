const router = require('express').Router();
const db = require('../models');
const { sequelize } = require('../config/db');
// const db = require('../models/Con');

router.get('/', async (req, res) => {
    try {
        const users = await db.User.findAll({include: db.Contact});
        res.json({users});
    } catch (error) {
        res.json({error});
    }
})

router.post('/', async (req, res) => {
    try {
        const users = await db.User.create({...req.body}, {include: db.Contact});
        res.json({users});
    } catch (error) {
        res.json({error});
    }
})

router.put('/:id', async (req, res) => {
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
})

router.delete('/:id', async (req, res) => {
    try {
        await db.User.destroy({where: {id: req.params.id}});
        res.json({message: 'user is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
})

module.exports = router