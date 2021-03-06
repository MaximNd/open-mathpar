const router = require('express').Router();
const PlansController = require('./../controllers/PlansController');
const isAuthenticated = require('./../policies/isAuthenticated');
const isTeacher = require('./../policies/checkRole')('teacher');


// Get all plans
// router.get('/plans', isAuthenticated, PlansController.getAllPlans);

// Get plan by ID
router.get('/plan/:id', isAuthenticated, PlansController.getPlanById);

// Get plans by group ID
router.get('/plans/group/:id', isAuthenticated, PlansController.getPlansByGroupId);

// Get filtered plans
router.get('/plans/:schoolId/:fetchType/:teacherId/:subjectId/', isAuthenticated, isTeacher, PlansController.getFilteredPlans);

// Create plan
router.post('/plan', isAuthenticated, isTeacher, PlansController.createPlan);

// Copy already existed plan
router.post('/plan/:id', isAuthenticated, isTeacher, PlansController.copyPlanById);

// Update plan by ID
router.put('/plan/:id', isAuthenticated, isTeacher, PlansController.updatePlan);

// Set plan 
router.put('/plan/:id/set', isAuthenticated, isTeacher, PlansController.setPlan);

// Delete plan by ID
router.delete('/plan/:id', isAuthenticated, isTeacher, PlansController.deletePlan);

module.exports = router;