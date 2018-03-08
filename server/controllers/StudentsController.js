const Student = require('./../models/student');
const User = require('./../models/user');
const { findShoollId } = require('./../helpers/helpers');

module.exports = {
    getStudentByID(req, res) {

    },

    getStudentsSubjectById(req, res) {
        Student.findById(req.params.id)
            .then(user => user.subjects(user.groupId))
            .then(subjects => res.send(subjects))
            .catch(err => console.log(err));
    },

    createStudent(req, res) {
        const { user, groupId, classId }  = req.body;
        User.createUser(new User(user), (err, userId) => {
            if (err) {
                console.log(err);
            }

            req.user.clients
                .then(clients => {
                    const student = new Student({
                        userId,
                        schoolId: findShoollId(clients, 'headTeacher'),
                        groupId,
                        classId
                    });
                
                    student.save(err => {
                        if (err) {
                            console.log(err);
                        }
                
                        res.status(200, { message: 'ok' }).end();
                    });
                });
        });
    },

    updateStudent(req, res) {

    },

    deleteStudent(req, res) {

    },

    setMarkByTask(req, res) {
        const taksResult = req.body.taksResult;
        
        req.user.clients
            .then(clients => {
                Student.update({ _id: clients.find(client => client.clientRole === 'student').client.id, }, { $push: { gradeBook: taksResult } }, (r1, r2, r3, r4) => {
                    console.log(r2, r2, r3, r4);
                });
            });
    }
}