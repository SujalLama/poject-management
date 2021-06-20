const { Op } = require("sequelize");
const db = require("../models");

//check community
const checkProject = async (req, res) => {
    const project = await db.Project.findByPk(req.params.id);
    if(!project) return res.status(400).json({message: 'Project doesn\'t exists.' })
}

const paginate = (pageSize, pageNumber) => {
    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize 
    return {
        offset,
        limit
    }
}

const searchTaskName = async (req, res) => {
    try {
        const taskName = req.query.name;
        const tasks = await db.Task.findAll({
            where: 
            {
                task_name: {[Op.iLike]: '%' + taskName + '%'},
                projectId: req.params.id
            }
        });
        res.json({tasks}).status(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllTasks = async (req, res) => {
    try {
        checkProject(req, res);
         const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const tasks = await db.Task.findAndCountAll({
            where: {projectId: req.params.id},
            ...paginate(pageSize, pageNumber),
        });

         const totalPages = Math.ceil(tasks.count / pageSize)

        res.json({
            tasks: tasks.rows,
            totalItems: tasks.count,
            totalPages, 
            pageNumber, 
            pageSize
        });
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

module.exports = {createTask, getAllTasks, getSingleTask, deleteTask, updateTask, searchTaskName};