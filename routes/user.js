const { getAllUsers, createUser, updateUser, deleteUser, getSingleUser } = require('../controllers/user');

const router = require('express').Router();

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .put(updateUser)
    .delete(deleteUser)
    .get(getSingleUser);

module.exports = router