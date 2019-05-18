const router = require('express').Router();
const GroupsController = require('./../controllers/GroupsController');
const isAuthenticated = require('./../policies/isAuthenticated');
const isHeadTeacher = require('./../policies/checkRole')('headTeacher');
const isMethodist = require('./../policies/checkRole')('methodist');


// Get all data about group by ID
router.get('/group/:id', isAuthenticated, GroupsController.getGroupById);

// Get all groups by school ID
// router.get('/groups/school/:id', isAuthenticated, GroupsController.getGroupsBySchoolId);

// Get students by group ID
router.get('/groups/:id/students', isAuthenticated, GroupsController.getStudents);

// Get teachers by group ID
// router.get('/group/:id/teachers', isAuthenticated, GroupsController.getTeachers);

// Create group
router.post('/group', isAuthenticated, isHeadTeacher, GroupsController.createGroup);

// Create group in University
router.post('/group-u', isAuthenticated, isMethodist, GroupsController.createGroup);

// Update group by ID
router.put('/group/:id', isAuthenticated, isHeadTeacher, GroupsController.updateGroup);

// Delete group by ID
router.delete('/group/:id', isAuthenticated, isHeadTeacher, GroupsController.deleteGroup);

module.exports = router;