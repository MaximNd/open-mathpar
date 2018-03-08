const router = require('express').Router();
const SchoolsController = require('./../controllers/SchoolsController');
const isAuthenticated = require('./../policies/isAuthenticated');
const isDirector = require('./../policies/checkRole')('director');
const isAdmin = require('./../policies/checkRole')('admin');

// Get all date about school by ID
router.get('/school/:id', isAuthenticated, SchoolsController.getSchoolById);

// Get all groups by school ID
router.get('/school/:id/groups', isAuthenticated, SchoolsController.getGroups);

// Get all classes by school ID
router.get('/school/:id/classes', isAuthenticated, SchoolsController.getClasses);

// Create school
router.post('/school', SchoolsController.createSchool);

// Update school by ID
router.put('/school/:id', isAuthenticated, isDirector, SchoolsController.updateSchool);

// Delete school by ID
router.delete('/school/:id', isAuthenticated, isAdmin, SchoolsController.deleteSchool);

module.exports = router;