const { Op } = require("sequelize");
const db = require("../models");

//check community
// const checkProject = async (req, res) => {
//     const project = await db.Project.findByPk(req.params.id);
//     if(!project) return res.status(400).json({message: 'Project doesn\'t exists.' })
// }

const getAllTeams = async (req, res) => {
    try {
        // checkProject(req, res);
        const teams = await db.Team.findAll();
        res.json({teams});
    } catch (error) {
        res.json({error});
    }
}

const getSingleTeam = async (req, res) => {
    try {
        // checkProject(req, res);
       const team = await db.Team.findByPk(req.params.id);

       if(!team) return res.status(400).json({message: 'Team doesn\'t exits.'})
        res.json({team});
    } catch (error) {
        res.json({error});
    }
}

const updateTeam = async (req, res) => {
    try {
        // checkProject(req, res);
        
      const team = await db.Team.findOne({where: {id: req.params.id}});

      if(!team) return res.status(400).json({message: 'team doesn\'t exists.'})

      await db.Team.update({...req.body}, {where: {id: req.params.id}});
        res.json({message: 'team is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createTeam = async (req, res) => {
    try {
        // checkProject(req, res);
        const oldTeam = await db.Task.findOne({
            where: {
                task_name: {[Op.eq]: req.body.team_name},
                }
        })
        if(oldTeam) return res.status(400).json('Team already exists.');
        const task = await db.Team.create({...req.body});
        res.json({task});
    } catch (error) {
        res.json({error: error.message});
    }
}

const deleteTeam = async (req, res) => {
    try {
        // checkProject(req, res);
         const team = await db.Team.findByPk(req.params.id);
        if(!team) return res.status(400).json({message: 'team doesn\'t exists.'})
       
        await db.Team.destroy({where: {id: req.params.id}});
        res.json({message: 'team is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createTeam, getAllTeams, getSingleTeam, deleteTeam, updateTeam};