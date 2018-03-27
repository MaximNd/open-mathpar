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

    async createTeacher(req, res) {
        try {
            const user = req.body.user;
            const timetable = req.body.teacher.timetable;
            const teacherUser = new User(user);
            await teacherUser.save();
            req.user.clients
                .then(async clients => {
                    try {
                        const teacher = new Teacher({
                            userId: teacherUser._id,
                            schoolId: findShoollId(clients, 'headTeacher'),
                            timetable
                        });
                    
                        await teacher.save();

                        res.status(200, { message: 'ok' }).end();
                    } catch (error) {
                        console.log(error);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    },

    updateTeacher(req, res) {

    },

    deleteTeacher(req, res) {
        
    }
};