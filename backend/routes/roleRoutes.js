const router = require('express').Router();
const {
  addRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} = require('../controller/roleController');
const {
  adminMiddleware,
  authMiddleware,
} = require('../middleware/authMiddleware');

router.post('/roles', authMiddleware, adminMiddleware, addRole);
router.get('/roles', authMiddleware, adminMiddleware, getRoles);
router.get('/roles/:id', authMiddleware, adminMiddleware, getRole);
router.put('/roles/:id', authMiddleware, adminMiddleware, updateRole);
router.delete('/roles/:id', authMiddleware, adminMiddleware, deleteRole);

module.exports = router;
