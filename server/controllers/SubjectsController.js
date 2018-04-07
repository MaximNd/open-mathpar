const Subject = require('./../models/subject');
const Theme = require('./../models/theme');
const { findShoollId } = require('./../helpers/helpers');

module.exports = {
    getSubjectById(req, res) {

    },

    getAllSubjects(req, res) {
        req.user.clients
            .then(clients => findShoollId(clients, 'teacher'))
            .then(school => Subject.find().populate({ path: 'themes', match: { school } }))
            .then(subjects => res.send(subjects))
            .catch(err => console.log(err));    
    },
    
    createSubject(req, res) {
        const { name } = req.body;
        const subject = new Subject({ name });
        subject.save(err => {
            if (err) {
                console.log(err);
            }

            res.send({
                status: 'OK'
            });
        });
    },

    addThemesToSubject(req, res) {
        const { themes } = req.body;
        const subjectId = req.params.id;

        Theme.insertMany(themes, (err, themes) => {
            if (err) {
                res.send({
                    status: 'ERR',
                    err
                });
            }
            
            Subject.update({ _id: subjectId }, { $push: { themes: { $each: themes.map(theme => theme._id) } } }, (err) => {
                if (err) {
                    console.log(err);
                    res.send({
                        status: 'ERR',
                        err
                    });
                }

                res.send({
                    status: 'OK',
                    themes
                });
            });
        });
    }
};