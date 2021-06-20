const { Op } = require("sequelize");
const db = require("../models");

//check community
// const checkProject = async (req, res) => {
//     const project = await db.Project.findByPk(req.params.id);
//     if(!project) return res.status(400).json({message: 'Project doesn\'t exists.' })
// }

const paginate = (pageSize, pageNumber) => {
    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize 
    return {
        offset,
        limit
    }
}

const searchTeamName = async (req, res) => {
    try {
        const teamName = req.query.name;
        const teams = await db.Team.findAll({where: {team_name: {[Op.iLike]: '%' + teamName + '%'}}});
        res.json({teams}).status(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllTeams = async (req, res) => {
    try {
        // checkProject(req, res);
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const teams = await db.Team.findAndCountAll({
            include: [db.Project],
            ...paginate(pageSize, pageNumber),
        });

        const totalPages = Math.ceil(teams.count / pageSize);

        res.json({
            teams: teams.rows,
            totalItems: teams.count,
            totalPages, 
            pageNumber, 
            pageSize
        });
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

module.exports = {createTeam, getAllTeams, 
    getSingleTeam, deleteTeam, 
    updateTeam, searchTeamName};