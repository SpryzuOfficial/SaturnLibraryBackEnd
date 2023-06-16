const { Router } = require('express');
const { check } = require('express-validator');

const { validateBodyFields } = require('../middlewares/validateBodyFields');
const { validateUniqueEmail } = require('../middlewares/validateUniqueEmail');

const { signup, login } = require('../controllers/auth');

const router = Router();

router.post('/signup', [check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateUniqueEmail,
    validateBodyFields
], signup);

router.post('/login', [check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateBodyFields
], login);

module.exports = router;