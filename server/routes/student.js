const router = require('express').Router();
const StudentsController = require('./../controllers/StudentsController');
const isHeadTeacher = require('./../policies/checkRole')('headTeacher');

const isAuthenticated = require('./../policies/isAuthenticated');
const isStudent = require('./../policies/checkRole')('student');

// router.use((req, res, next) => {
//   const authorization = req.authorization;
//   const token = authorization.slice(7);

//   global._user = jwt.decode(token);
// });

// const isStudent = (req, res, next) => {
//   user.indexOf('student') === -1 ? res.status(403).end('Forbidden') : next();
// }

// Get student by user ID
router.get('/student/:id', isAuthenticated, StudentsController.getStudentByID);

// Get student subjects by user ID
router.get('/student/:id/subjects', isAuthenticated, StudentsController.getStudentsSubjectById);

// Get student gradebook by student ID
router.get('/student/:id/gradebook', isAuthenticated, StudentsController.getStudentGradebookById);

router.get('/student/:id/tasks-full-answers/:task_id', isAuthenticated, StudentsController.getStudentTasksFullAnswers);

// Create student
router.post('/student', isAuthenticated, isHeadTeacher, StudentsController.createStudent);

// Set mark by task
router.put('/student/set-mark', isAuthenticated, StudentsController.setMarkByTask);


// Update student
router.put('/student/:id', isAuthenticated, StudentsController.updateStudent);

// Delete student
router.delete('/student/:id', isAuthenticated, StudentsController.deleteStudent);


module.exports = router;
