const express = require('express');
const router = express.Router();
const orszagController = require('../controllers/orszagController');

router.get('/', orszagController.getAllOrszagok);
router.get('/regio/:regio', orszagController.getByRegion);
router.get('/szures', orszagController.filterOrszagok);
router.get('/:id', orszagController.getById);



module.exports = router;
