const express = require('express');
const { generateSortUrl } = require('../controllers/url');
const router = express.Router();


router.post('/', generateSortUrl);




module.exports = router;