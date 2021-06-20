const { getAllProjects, updateProject, deleteProject, getSingleProject,
     createProject, searchProjectName, getProjectByCategory } = require('../controllers/project');
const protect = require('../middleware/protect');


const router = require('express').Router();

router.route('/')
    .get(getAllProjects)
    .post(protect, createProject);

router.route('/search').get(searchProjectName);
router.route('/filter').get(getProjectByCategory);

router.route('/:id')
    .get(getSingleProject)
    .put(protect, updateProject)
    .delete(protect, deleteProject);
    

module.exports = router