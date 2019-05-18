const router = require('express').Router();
const MethodistController = require('../controllers/MethodistController');
const isDean = require('../policies/checkRole')('dean');
const isSelf = require('../policies/checkRole');
const isAuthenticated = require('../policies/isAuthenticated');
const isHeadTeacher = require('../policies/checkRole')('headTeacher');



// // Get HeadTeacher by user ID
// router.get('/head-teacher/:id', isAuthenticated, HeadTeacherController.getHeadTeacherByID);

// Create head-teacher
router.post('/methodist', isAuthenticated, isDean, MethodistController.createMethodist);

// // Update head-teacher
// router.put('/head-teacher/:id', isAuthenticated, isHeadTeacher, isSelf, HeadTeacherController.updateHeadTeacher);

// // Delete head-teacher
// router.delete('/head-teacher/:id', isAuthenticated, isDirector, HeadTeacherController.deleteHeadTeacher);

module.exports = router;
