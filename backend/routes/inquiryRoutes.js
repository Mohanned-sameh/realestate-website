const inquiryController = require('../controllers/inquiryController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { check } = require('express-validator');
const router = express.Router();

router.get(
  '/',
  adminMiddleware,
  authMiddleware,
  inquiryController.getAllInquiries
);

router.get(
  '/:id',
  adminMiddleware,
  authMiddleware,
  inquiryController.getInquiry
);

router.post(
  '/',
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('message', 'Message is required').not().isEmpty(),
  ],
  inquiryController.createInquiry
);

router.delete(
  '/:id',
  adminMiddleware,
  authMiddleware,
  inquiryController.deleteInquiry
);

module.exports = router;
