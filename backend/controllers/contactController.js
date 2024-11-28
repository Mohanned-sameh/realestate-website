const Contact = require('../models/Contactus');

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const contact = new Contact({
      name,
      email,
      phone,
      message,
    });
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createContact, getContacts, getContactById };
