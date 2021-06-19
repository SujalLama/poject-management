const { getAllContacts, createContact, updateContact, deleteContact, getSingleContact } = require('../controllers/contact');
const protect = require('../middleware/protect');

const router = require('express').Router();

router.route('/')
    .get(getAllContacts)
    .post(protect, createContact);

router.route('/:id')
    .get(getSingleContact)
    .put(protect, updateContact)
    .delete(protect, deleteContact);
    

module.exports = router