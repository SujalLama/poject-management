const db = require("../models");

const getAllContacts = async (req, res) => {
    try {
        const contacts = await db.Contact.findAll();
        res.json({contacts});
    } catch (error) {
        res.json({error});
    }
}

const getSingleContact = async (req, res) => {
    try {
       const contact = await db.Contact.findByPK(req.params.id);
        res.json({contact});
    } catch (error) {
        res.json({error});
    }
}

const updateContact = async (req, res) => {
    try {
      const contact = await db.Contact.findByPK(req.params.id);

      if(!contact) return res.status(400).json({message: 'contact doesn\'t exists.'})

      await db.Contact.update(req.body, {where: {id: req.params.id}});
        res.json({message: 'contact is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createContact = async (req, res) => {
    try {
        const contact = await db.Contact.create({...req.body, userId: req.user.id});
        res.json({contact});
    } catch (error) {
        res.json({error: error.message});
    }
}

const deleteContact = async (req, res) => {
    try {
        await db.Contact.destroy({where: {id: req.params.id}});
        res.json({message: 'contact is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createContact, getAllContacts, getSingleContact, deleteContact, updateContact};