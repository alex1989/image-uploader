const { Router } = require('express');
const upload = require('../controllers/upload');

const router = Router();

router.post('/upload', upload.uploadFile);

module.exports = router;
