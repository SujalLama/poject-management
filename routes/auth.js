const router = require('express').Router();
const db = require('../models');

router.post('/login', async (req, res) => {
    try {
        const user = await db.User(req.body);
        res.status(200).json({user});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router;