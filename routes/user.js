const { getAllUsers, createUser, updateUser, deleteUser, getSingleUser } = require('../controllers/user');

const router = require('express').Router();

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
    

module.exports = router