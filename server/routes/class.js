const router = require('express').Router();
const ClassesController = require('./../controllers/ClassesController');
const isAuthenticated = require('./../policies/isAuthenticated');
const isDirector = require('./../policies/checkRole')('director');

// Get all info about class by ID
router.get('/class/:id', isAuthenticated, ClassesController.getClassById);

// Create class
router.post('/class', isAuthenticated, isDirector, ClassesController.createClass);

// Update class by ID
router.put('/class/:id', isAuthenticated, ClassesController.updateClass);

// Delete class by ID
router.delete('/class/:id', isAuthenticated, ClassesController.deleteClass);

module.exports = router;