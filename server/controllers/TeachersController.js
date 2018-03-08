const Teacher = require('./../models/teacher');
const User = require('./../models/user');
const { findShoollId } = require('./../helpers/helpers');

module.exports = {
    getTeacherById(req, res) {

    },

    getTeacherTimetable(req, res) {
        const teacherId = req.params.id;

        Teacher.find({ _id: teacherId })
            .populate('timetable.groupId')
            .populate('timetable.subjectId')
            .populate({ path: 'timetable.planId', populate: { path: 'timetable.lectionId timetable.taskId' } })
            .then(timatable => res.send(timatable[0].timetable));
    },

    createTeacher(req, res) {
        const user = req.body.user;
        const timetable = req.body.teacher.timetable;

        User.createUser(new User(user), (err, userId) => {
            if (err) {
                console.log(err);
            }

            req.user.clients
                .then(clients => {
                    const teacher = new Teacher({
                        userId,
                        schoolId: findShoollId(clients, 'headTeacher'),
                        timetable
                    });
                
                    teacher.save(err => {
                        if (err) {
                            console.log(err);
                        }
                        res.status(200, { message: 'ok' }).end();
                    });
                });
        });
    },

    updateTeacher(req, res) {

    },

    deleteTeacher(req, res) {
        
    }
};