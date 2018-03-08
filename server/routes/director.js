const router = require('express').Router();
const DirectorController = require('./../controllers/DirectorsController');
const isAuthenticated = require('./../policies/isAuthenticated');
const isDirector = require('./../policies/checkRole')('director');


// Find Director by user ID
router.get('/director/:id', isAuthenticated, DirectorController.getDirectorById);

// Find Director by school ID
router.get('/director/school/:id', isAuthenticated, DirectorController.getDirectorBySchoolId);

// Create Director
router.post('/director', DirectorController.createDirector);

// Update Director by user ID
router.put('/director/:id', isAuthenticated, isDirector, DirectorController.updateDirector);

// Delete Director by user Id
// Maybe it is not necessary
//router.delete('/director/:id', isAuthenticated, DirectorController.deleteDirector);

module.exports = router;
