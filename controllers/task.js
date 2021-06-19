const { Op } = require("sequelize");
const db = require("../models");

//check community
const checkProject = async (req, res) => {
    const project = await db.Project.findByPk(req.params.id);
    if(!project) return res.status(400).json({message: 'Project doesn\'t exists.' })
}

const getAllTasks = async (req, res) => {
    try {
        checkProject(req, res);
        const tasks = await db.Task.findAll({where: {projectId: req.params.id}});
        res.json({tasks});
    } catch (error) {
        res.json({error});
    }
}

const getSingleTask = async (req, res) => {
    try {
        checkProject(req, res);
       const task = await db.Task.findOne({
        where: {projectId: req.params.id, id: req.params.taskId}
       });

       if(!task) return res.status(400).json({message: 'Task doesn\'t exits.'})
        res.json({task});
    } catch (error) {
        res.json({error});
    }
}

const updateTask = async (req, res) => {
    try {
        checkProject(req, res);
        
      const task = await db.Task.findOne({where: {projectId: req.params.id, id: req.params.taskId}});

      if(!task) return res.status(400).json({message: 'task doesn\'t exists.'})

      await db.Task.update({...req.body}, {where: {id: req.params.taskId}});
        res.json({message: 'task is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createTask = async (req, res) => {
    try {
        checkProject(req, res);
        const oldTask = await db.Task.findOne({
            where: {
                task_name: {[Op.eq]: req.body.task_name},
                projectId: req.params.id
                }
        })
        if(oldTask) return res.status(400).json('Task already exists.');
        const task = await db.Task.create({...req.body, projectId: req.params.id});
        res.json({task});
    } catch (error) {
        res.json({error: error.message});
    }
}

const deleteTask = async (req, res) => {
    try {
        checkProject(req, res);
         const task = await db.Task.findOne({where: {projectId: req.params.id, id: req.params.taskId}});
        if(!task) return res.status(400).json({message: 'task doesn\'t exists.'})
       
        await db.Task.destroy({where: {id: req.params.taskId, projectId: req.params.id}});
        res.json({message: 'task is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createTask, getAllTasks, getSingleTask, deleteTask, updateTask};