
const express = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    
    const contact = await getById(contactId);
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
      id: generateId(), 
      name,
      email,
      phone
    };
    
    await addContact(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    
    const deletedContact = await removeContact(contactId);
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
    
    const updatedContact = await updateContact(contactId, updatedFields);
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
