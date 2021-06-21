const { Op } = require("sequelize");
const db = require("../models");
const fs = require('fs')

const paginate = (pageSize, pageNumber) => {
    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize 
    return {
        offset,
        limit
    }
}

const searchUserName = async (req, res) => {
    try {
        const userName = req.query.name;
        const users = await db.User.findAll({where: {name: {[Op.iLike]: '%' + userName + '%'}}});
        res.json({users}).status(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const users = await db.User.findAndCountAll({
            include: db.Contact,
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(users.count / pageSize)
        res.json({
            users: users.rows,
            totalItems: users.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleUser = async (req, res) => {
    try {
       const user = await db.User.findByPk(req.params.id);
        res.json({user});
    } catch (error) {
        res.json({error});
    }
}

const updateUser = async (req, res) => {
    try {
         let filename = ''
        if(req.file) {
            filename = req.file.filename
        }

        const img = fs.readFileSync(req.file.path);
        const encode_image = img.toString('base64');

        const finalImg = {
            contentType: req.file.mimetype,
            image: Buffer.from(encode_image, 'base64')
        };
        console.log(finalImg);
        
        // if(!file) return res.status(400).json('Please upload a file');
        const { name, email, password} = req.body;

        if(password) return res.json({message: 'not allowed to update.'});
        const user = await db.User.update({profile_path: filename, profile_file: finalImg}, 
        {where: {id: req.params.id}})
        res.json({message: 'user is successfully updated.', user});

    } catch (error) {
        res.json({error});
    }
}

const createUser = async (req, res) => {
    try {
        let filename = ''
        if(req.file) {
            filename = req.file.filename
        }
        const users = await db.User.create({...req.body, profile_pic: 'uploads/' + filename}, {include: db.Contact});
        res.json({users});
    } catch (error) {
        res.json({error});
    }
}

const deleteUser = async (req, res) => {
    try {
        await db.User.destroy({where: {id: req.params.id}});
        res.json({message: 'user is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createUser, getAllUsers, getSingleUser, deleteUser, updateUser, searchUserName};