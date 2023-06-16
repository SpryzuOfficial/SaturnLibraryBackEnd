const { Router } = require('express');
const { check } = require('express-validator');

const { validateBodyFields } = require('../middlewares/validateBodyFields');
const { upload, download, edit, remove } = require('../controllers/articles');

const router = Router();

router.post('/upload', [check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    validateBodyFields
], upload);

router.get('/download', download);

router.post('/edit', edit);

router.delete('/remove', remove);

module.exports = router;