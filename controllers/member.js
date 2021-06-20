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

const getAllMembers = async (req, res) => {
    try {
        // checkProject(req, res);
         const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const members = await db.Member.findAndCountAll({
            include: [db.Project, db.Team, db.User],
            ...paginate(pageSize, pageNumber),
        });

         const totalPages = Math.ceil(members.count / pageSize)

        res.json({
            members: members.rows,
            totalItems: members.count,
            totalPages, 
            pageNumber, 
            pageSize
        });
    } catch (error) {
        res.json({error});
    }
}

const getSingleMember = async (req, res) => {
    try {
        // checkProject(req, res);
       const member = await db.Member.findByPk(req.params.id);

       if(!member) return res.status(400).json({message: 'Member doesn\'t exits.'})
        res.json({member});
    } catch (error) {
        res.json({error});
    }
}

const updateMember = async (req, res) => {
    try {
        // checkProject(req, res);
        const {userId, projectId, teamId} = req.body;
      const member = await db.Member.findOne({where: {id: req.params.id}});

      if(!member) return res.status(400).json({message: 'member doesn\'t exists.'})

      const oldmember = await db.Member.findOne({where: {userId, teamId, projectId}});
        if(oldmember) return res.status(400).json({message: 'member already exists.'});

      await db.Member.update({...req.body}, {where: {id: req.params.id}});
        res.json({message: 'member is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createMember = async (req, res) => {
    try {
        const {userId, teamId, projectId} = req.body;
        const oldmember = await db.Member.findOne({where: {userId, teamId, projectId}});
        if(oldmember) return res.status(400).json({message: 'member already exists.'});
        const member = await db.Member.create({...req.body});
        res.json({member});
    } catch (error) {
        res.json({error: error.message});
    }
}

const deleteMember = async (req, res) => {
    try {
        // checkProject(req, res);
         const member = await db.Member.findByPk(req.params.id);
        if(!member) return res.status(400).json({message: 'member doesn\'t exists.'})
       
        await db.Member.destroy({where: {id: req.params.id}});
        res.json({message: 'member is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createMember, getAllMembers, getSingleMember, deleteMember, updateMember};