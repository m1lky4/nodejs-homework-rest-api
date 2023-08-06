const express = require('express');
const router = express.Router();
const Contact = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findOne({ _id: contactId, owner: req.user._id });
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
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    const newContact = {
      name,
      email,
      phone,
      owner: req.user._id,
    };
    const contact = await Contact.create(newContact);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findOneAndDelete({ _id: contactId, owner: req.user._id });
    if (contact) {
      res.status(200).json({ message: 'Contact deleted' });
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
      res.status(400).json({ message: 'Missing fields' });
      return;
    }
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: req.user._id },
      updatedFields,
      { new: true }
    );
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
