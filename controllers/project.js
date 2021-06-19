const db = require("../models");

const getAllProjects = async (req, res) => {
    try {
        const projects = await db.Project.findAll();
        res.json({projects});
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

module.exports = {createProject, getAllProjects, getSingleProject, deleteProject, updateProject};