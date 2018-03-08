const router = require('express').Router();
const TasksController = require('./../controllers/TasksController');
const Task = require('./../models/task');
const isAuthenticated = require('./../policies/isAuthenticated');
const isTeacher = require('./../policies/checkRole')('teacher');
const isStudent = require('./../policies/checkRole')('student');



// Get task by ID
router.get('/task/:id', TasksController.getTaskById);

// Get all tasks by teacher ID
router.get('/tasks/teacher/:id', isAuthenticated, TasksController.getTasksByTeacherId);

// Chek exercise
// TODO isStudent is auth
router.get('/task/:id/check-answer/:exercise/:answer', TasksController.checkExercise);

// Show full solution
// TODO isStudent is auth
router.get('/task/:id/show-solution/:exercise', TasksController.showSolution);

// Check kr
router.post('/task/:id/check-kr', isAuthenticated, isStudent, TasksController.checkKr);

// Create Task
router.post('/task', isAuthenticated, isTeacher, TasksController.createTask);

// Update Task
router.put('/task/:id', isAuthenticated, isTeacher, TasksController.updateTask);

// Delete Task
router.delete('/task:id', isAuthenticated, isTeacher, TasksController.deleteTask);

module.exports = router;