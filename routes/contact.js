const router = require('express').Router();
const User = require('../models/user');
const {Contact} = require('../models/index');
// const db = require('../models/Con');

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.findAll({include: User});
        res.json({contacts});
    } catch (error) {
        res.json({error});
    }
})

module.exports = router