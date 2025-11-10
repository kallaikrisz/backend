const express = require('express');
const router = express.Router();
const orszagController = require('../controllers/orszagController');

router.get('/', orszagController.getAllOrszagok);
router.get('/regio/:regio', orszagController.getByRegion);
router.get('/:id', orszagController.getById);
router.get('/szures', orszagController.filterOrszagok);


module.exports = router;
