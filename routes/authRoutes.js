const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddlware=require('../middlewares/authMiddleware')

// User login route
router.post('/login',authController.loginUser);
router.get('/home', authMiddlware,authController.getHome);
router.post('/addBook', authMiddlware,authController.addBook);
router.delete('/deleteBook', authMiddlware,authController.deleteBook);


module.exports = router;