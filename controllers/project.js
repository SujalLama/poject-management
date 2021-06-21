const db = require("../models");
const {Op} = require('sequelize');

const paginate = (pageSize, pageNumber) => {
    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize 
    return {
        offset,
        limit
    }
}

const searchProjectName = async (req, res) => {
    try {
        const projectName = req.query.name;
        const projects = await db.Project.findAll({
            where: {
                project_name: {[Op.iLike]: '%' + projectName + '%'}
            }});
        res.json({projects}).status(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getProjectByCategory = async (req, res) => {
    try {
        const categoryName = req.query.category;
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;

        const projects = await db.Project.findAndCountAll({
            where: {
                category: categoryName
            },
            ...paginate(pageSize, pageNumber)
        });

        const totalPages = Math.ceil(projects.count / pageSize)

        res.json({
            projects: projects.rows,
            totalItems: projects.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllProjects = async (req, res) => {
    try {
         const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const projects = await db.Project.findAndCountAll({
            include: [db.Member, db.Team],
            ...paginate(pageSize, pageNumber),
        });

         const totalPages = Math.ceil(projects.count / pageSize)

        res.json({
            projects: projects.rows,
            totalItems: projects.count,
            totalPages, 
            pageNumber, 
            pageSize
        });
    } catch (error) {
        res.json({error});
    }
}

const getSingleProject = async (req, res) => {
    try {
       const project = await db.Project.findByPk(req.params.id);
        res.json({project});
    } catch (error) {
        res.json({error});
    }
}

const updateProject = async (req, res) => {
    try {
        const {project_name, project_desc} = req.body;
        
      const project = await db.Project.findOne({where: {userId: req.user.id, id: req.params.id}});

      if(!project) return res.status(400).json({message: 'project doesn\'t exists.'})

      await db.Project.update({project_name, project_desc}, {where: {id: req.params.id}});
        res.json({message: 'project is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createProject = async (req, res) => {
    try {
        r
        const project = await db.Project.create({...req.body, userId: req.user.id});
        res.json({project});
    } catch (error) {
        res.json({error: error.message});
    }
}

const deleteProject = async (req, res) => {
    try {
         const project = await db.Project.findOne({where: {userId: req.user.id, id: req.params.id}});
        if(!project) return res.status(400).json({message: 'project doesn\'t exists.'})
       
        await db.Project.destroy({where: {id: req.params.id, userId: req.user.id}});
        res.json({message: 'project is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createProject, getAllProjects, getSingleProject, deleteProject, updateProject, searchProjectName, getProjectByCategory};