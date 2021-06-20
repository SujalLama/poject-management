const { getAllMembers, createMember, updateMember, 
    deleteMember, getSingleMember } = require('../controllers/member');
const protect = require('../middleware/protect');

const router = require('express').Router();

router.route('/')
    .get(getAllMembers)
    .post(protect, createMember);

router.route('/:id')
    .get(getSingleMember)
    .put(protect, updateMember)
    .delete(protect, deleteMember);
    

module.exports = router