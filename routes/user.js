const { getAllUsers, createUser, updateUser, deleteUser, getSingleUser, searchUserName } = require('../controllers/user');

const router = require('express').Router();

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/search').get(searchUserName);

router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
    

module.exports = router