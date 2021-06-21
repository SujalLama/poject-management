const { getAllUsers, createUser, updateUser, deleteUser, getSingleUser, searchUserName } = require('../controllers/user');
const {upload} = require('../helpers/filehelpers');
const db = require('../models');
const fs = require('fs')

const router = require('express').Router();

router.get('/profile/:id', async (req, res) => {
    const result = await db.User.findOne({where: {id: req.params.id}});
    // fs.writeFileSync(result.profile_file.image, buffer)
    const {data} = result.profile_file.image;
    const img = result.profile_path;
    res.send(img);
    
})
router.route('/')
    .get(getAllUsers)
    .post(upload.single('profile'), createUser);

router.route('/search').get(searchUserName);

router.route('/:id')
    .get(getSingleUser)
    .put(upload.single('profile'), updateUser)
    .delete(deleteUser);
    

module.exports = router