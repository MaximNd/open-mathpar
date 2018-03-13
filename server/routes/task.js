const router = require('express').Router();
const TasksController = require('./../controllers/TasksController');
const Task = require('./../models/task');
const isAuthenticated = require('./../policies/isAuthenticated');
const isTeacher = require('./../policies/checkRole')('teacher');
const isStudent = require('./../policies/checkRole')('student');
const Theme = require('./../models/theme');
const Subject = require('./../models/subject');


// Get task by ID
router.get('/task/:id', TasksController.getTaskById);

// Get all tasks by teacher ID
router.get('/tasks/teacher/:id', isAuthenticated, TasksController.getTasksByTeacherId);

// Filters for tasks
// :schoolId - if(schoolId !== undefined) then { get tasks from your school } else { get all task from database }
// :fetchType - allTasks, allSR, allKR, allYourTasks, allYourSR, allYourKR
// :classNumber - (number) from 1 to 12
// :subjectId - subjectID
// :themeId - themeId of the selected subject
// :difficultyLevel - (Eazy,Middle,Hard)
router.get('/tasks/:schoolId/:fetchType/:teacherId/:classNumber/:subjectId/:themeId/:difficultyLevel', TasksController.getFilteredTasks);

// add theme
// router.post('/theme/:themeName/:themeOrder', (req, res) => {
//     const theme = new Theme({name: req.params.themeName, order: req.params.themeOrder});
//     theme.save();
//     res.send({});
// });

// router.put('/subject/:id/:themeId', (req, res) => {
//     Subject.update({ _id: req.params.id }, { $push: { themes: req.params.themeId } }, (err) => {
//         if (err) {
//             console.log(err);
//             res.send({
//                 status: 'ERR'
//             });
//         }
//         res.send({
//             status: 'OK'
//         });
//     });
// });

// router.get('/ttask/:id', (req, res) => {
//     Task.findById(req.params.id).populate('theme')
//         .then(task => res.send(task));
// });

// Chek exercise
// TODO isStudent is auth
router.get('/task/:id/check-answer/:exercise/:answer', TasksController.checkExercise);

// Show full solution
// TODO isStudent is auth
router.get('/task/:id/show-solution/:exercise', TasksController.showSolution);

// Check kr
// router.post('/task/:id/check-kr', isAuthenticated, isStudent, TasksController.checkKr);

// Create Task
router.post('/task', isAuthenticated, isTeacher, TasksController.createTask);

// Update Task
router.put('/task/:id', isAuthenticated, isTeacher, TasksController.updateTask);

// Delete Task
router.delete('/task:id', isAuthenticated, isTeacher, TasksController.deleteTask);

module.exports = router;