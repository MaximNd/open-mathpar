const router = require('express').Router();
const LectionController = require('./../controllers/LectionsController');
const isTeacher = require('./../policies/checkRole')('teacher');

const Lection = require('./../models/lection');
const isAuthenticated = require('./../policies/isAuthenticated');



// Get lection by ID
router.get('/lection/:id', isAuthenticated, LectionController.getLectionById);

// Get lections by teacher ID
router.get('/lection/teacher/:id', isAuthenticated, LectionController.getLectionByTeacherId);

// Create lection
router.post('/lection', isAuthenticated, isTeacher, LectionController.createLection);

// Update Lection
router.put('/lection/:id', isAuthenticated, isTeacher, LectionController.updateLection);

// Delete lection
router.delete('/lection/:id', isAuthenticated, isTeacher, LectionController.deleteLection);  

module.exports = router;