const router = require('express').Router();
const TeachersController = require('./../controllers/TeachersController');
const isHeadTeacher = require('./../policies/checkRole')('headTeacher');
const isMethodist = require('./../policies/checkRole')('methodist');

const Lection = require('./../models/lection');
const Plan = require('./../models/plan');
const Task = require('./../models/task');
const Teacher = require('./../models/teacher');
const isAuthenticated = require('./../policies/isAuthenticated');
const isTeacher = require('./../policies/checkRole')('teacher');
const { findShoollId } = require('./../helpers/helpers');

// router.use((req, res, next) => {
//   const authorization = req.authorization;
//   const token = authorization.slice(7);

//   global._user = jwt.decode(token);
// });

// const isTeacher = (req, res, next) => {
//   user.indexOf('teacher') === -1 ? res.status(403).end('Forbidden') : next();
// }

// Get teacher by ID
router.get('/teacher/:id', isAuthenticated, TeachersController.getTeacherById);

// Get teacher timetable
router.get('/teacher/:id/timetable', isAuthenticated, TeachersController.getTeacherTimetable);

// Create teacher
router.post('/teacher', isAuthenticated, isHeadTeacher, TeachersController.createTeacher);

// Create teacher in University
router.post('/teacher-u', isAuthenticated, isMethodist, TeachersController.createTeacher);

// Update teacher
router.put('/teacher/:id', isAuthenticated, TeachersController.updateTeacher);

// Delete teacher
router.delete('/teacher/:id', isAuthenticated, TeachersController.deleteTeacher);

module.exports = router;
