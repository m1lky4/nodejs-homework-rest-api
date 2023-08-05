const express = require('express');
const router = express.Router();
const Contact = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: 'missing required name field' });
      return;
    }
    const newContact = {
      name,
      email,
      phone,
    };
    const createdContact = await Contact.create(newContact);
    res.status(201).json(createdContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    if (deletedContact) {
      res.status(200).json({ message: 'contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const updatedFields = req.body;
    if (!updatedFields || Object.keys(updatedFields).length === 0) {
      res.status(400).json({ message: 'missing fields' });
      return;
    }
    const updatedContact = await Contact.findByIdAndUpdate(contactId, updatedFields, { new: true });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
