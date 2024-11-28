const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');

const {
  createContact,
  getContacts,
  getContactById,
} = require('../controllers/contactController');

router.route('/').post(createContact).get(adminMiddleware, getContacts);
router.route('/:id').get(getContactById);

module.exports = router;
