const router = require('express').Router();
const HeadTeacherController = require('./../controllers/HeadTeachersController');
const isDirector = require('./../policies/checkRole')('director');
const isSelf = require('./../policies/checkRole');
const isAuthenticated = require('./../policies/isAuthenticated');
const isHeadTeacher = require('./../policies/checkRole')('headTeacher');



// Get HeadTeacher by user ID
router.get('/head-teacher/:id', isAuthenticated, HeadTeacherController.getHeadTeacherByID);

// Create head-teacher
router.post('/head-teacher', isAuthenticated, isDirector, HeadTeacherController.createHeadTeacher);

// Update head-teacher
router.put('/head-teacher/:id', isAuthenticated, isHeadTeacher, isSelf, HeadTeacherController.updateHeadTeacher);

// Delete head-teacher
router.delete('/head-teacher/:id', isAuthenticated, isDirector, HeadTeacherController.deleteHeadTeacher);

module.exports = router;
