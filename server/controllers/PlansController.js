const Plan = require('./../models/plan');
const Teacher = require('./../models/teacher');

module.exports = {
    getAllPlans(req, res) {
        Plan.find({})
            .populate({ path: 'subjectId' })
            .populate({ path: 'teacherId', populate: { path: 'userId' }})
            .populate({ path: 'teacherId', populate: { path: 'schoolId' }})
            .populate({ path: 'timetable.lectionId timetable.taskId' })
            .then(plans => res.send(plans))
    },

    getPlanById(req, res) {
        Plan.findById(req.params.id).populate({ path: 'timetable.lectionId timetable.taskId' })
            .then(plan => {
                res.send(plan);
            })
            .catch(err => console.log(err));
    },

    getPlansByGroupId(req, res) {
        Plan.find({ groupId: req.params.id }).populate({ path: 'subjectId timetable.taskId' })
            .then(plans => {
                res.send(plans);
            })
            .catch(err => console.log(err));
    },

    createPlan(req, res) {
        // TODO TEST (plan saving)
        const { recordId, name, groupId, subjectId, timetable } = req.body;
        
        req.user.clients
            .then(clients => {
                const teacherId = clients.find(client => client.clientRole === 'teacher').client.id;
                const plan = new Plan({
                    name,
                    groupId,
                    teacherId,
                    subjectId,
                    timetable
                });
            
                plan.save(err => {
                    if (err) {
                        console.log(err);
                    }
                    if (typeof recordId === 'undefined') {
                        return res.status(200, { message: 'ok' }).end();
                    } else {
                        Teacher.findById(teacherId)
                        .then(teacher => {
                            teacher.timetable = teacher.timetable.map(row => {
                                if (row.id.toString() === recordId) {
                                    row.planId = plan.id;
                                }
                                return row;
                            });
                            teacher.save(err => {
                                if (err) {
                                    console.log(err);
                                }

                                res.status(200, { message: 'ok' }).end();
                            });
                        });
                    }
                });
            });
    },

    copyPlanById(req, res) {

    },

    updatePlan(req, res) {

    },

    deletePlan(req, res) {

    }
};