var express = require('express');
var router = express.Router();

var urlController = require('../controllers/urlController');

router.get('/', urlController.list);

router.get('/:urlID', urlController.getTiny);

module.exports = router;