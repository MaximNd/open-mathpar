const Subject = require('./../models/subject');

module.exports = {
    getSubjectById(req, res) {

    },

    getAllSubjects(req, res) {
        Subject.find({})
            .then(subjects => res.send(subjects))
            .catch(err => console.log(err));
    },
    
    createSubject(req, res) {

    }
};