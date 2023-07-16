
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'models', 'contacts.json');


const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error reading contacts file');
  }
};

const getById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    throw new Error('Error getting contact by ID');
  }
};

const addContact = async (newContact) => {
  try {
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    throw new Error('Error adding contact');
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  } catch (error) {
    throw new Error('Error removing contact');
  }
};

const updateContact = async (contactId, updatedFields) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
    if (contactIndex === -1) {
      return null;
    }
    const updatedContact = { ...contacts[contactIndex], ...updatedFields };
    contacts[contactIndex] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return updatedContact;
  } catch (error) {
    throw new Error('Error updating contact');
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
