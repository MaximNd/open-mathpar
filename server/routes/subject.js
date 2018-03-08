const router = require('express').Router();
const SubjectsController = require('./../controllers/SubjectsController');

const Subject = require('./../models/subject');
const isAuthenticated = require('./../policies/isAuthenticated');

// Get subject by ID
router.get('/subject/:id', isAuthenticated, SubjectsController.getSubjectById);

// Get all subjects
router.get('/subjects', isAuthenticated, SubjectsController.getAllSubjects);

// Create subject
router.post('/subject', isAuthenticated, SubjectsController.createSubject);


router.get('/fetch-all-subjects', isAuthenticated, (req, res) => {
    Subject.find({})
        .then(subjects => res.send(subjects));
});    

module.exports = router;