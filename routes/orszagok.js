const express = require('express');
const router = express.Router();
const orszagController = require('../controllers/orszagController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// --------------------
// Publikus végpontok (nem regisztrált felhasználó)
// --------------------
router.get('/', orszagController.getAllOrszagok);              // mindenki elérheti
router.get('/regio/:regio', orszagController.getByRegion);     // mindenki elérheti
router.get('/szures', orszagController.filterOrszagok);        // mindenki elérheti
router.get('/paged', orszagController.getPagedOrszagok);       // mindenki elérheti
router.get('/:id', orszagController.getById);                  // mindenki elérheti

// --------------------
// Regisztrált + admin
// --------------------
router.get('/protected/list', auth, roleCheck(['registered', 'admin']), orszagController.getAllOrszagok);

// --------------------
// Csak admin
// --------------------
router.get('/protected/admin', auth, roleCheck(['admin']), orszagController.getPagedOrszagok);

module.exports = router;
