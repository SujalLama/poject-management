const { getAllTeams, createTeam, updateTeam, deleteTeam, getSingleTeam } = require('../controllers/team');
const protect = require('../middleware/protect');

const router = require('express').Router();

router.route('/')
    .get(getAllTeams)
    .post(protect, createTeam);

router.route('/:id')
    .get(getSingleTeam)
    .put(protect, updateTeam)
    .delete(protect, deleteTeam);
    

module.exports = router