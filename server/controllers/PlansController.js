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
        Plan.findById(req.params.id).populate({ path: 'timetable.lectionId timetable.taskId teacherId' })
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

    getFilteredPlans(req, res) {
        const { schoolId, fetchType, teacherId, subjectId } = req.params;
        let filter = {};
        if (schoolId !== 'undefined') filter.schoolId = schoolId;
        if (fetchType !== 'undefined' && fetchType !== 'allPlans') {
            if (fetchType === 'allYourPlans' && teacherId !== 'undefined') {
                filter.teacherId = teacherId;
            }
        }
        if (subjectId !== 'undefined') filter.subjectId = subjectId;
        
        Plan.find(filter)
            .populate({ path: 'subjectId' })
            .populate({ path: 'teacherId', populate: { path: 'userId' }})
            .populate({ path: 'teacherId', populate: { path: 'schoolId' }})
            .populate({ path: 'timetable.lectionId timetable.taskId' })
            .then(plans => res.send(plans))
    },

    createPlan(req, res) {
        // TODO TEST (plan saving)
        const { recordId, name, groupId, subjectId, schoolId, timetable } = req.body;
        
        req.user.clients
            .then(clients => {
                const teacherId = clients.find(client => client.clientRole === 'teacher').client.id;
                const plan = new Plan({
                    name,
                    groupId,
                    teacherId,
                    subjectId,
                    schoolId,
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

    setPlan(req, res) {
        const { planId, recordId, groupId } = req.body;

        req.user.clients
            .then(clients => {
                const teacher = clients.find(client => client.clientRole === 'teacher').client;
                const teacherId = teacher._id;
                Plan.findById(planId)
                    .then(plan => {
                        if (plan.teacherId.toString() === teacherId.toString()) {
                            plan.groupId = groupId;

                            return Promise.all([
                                plan.save(),
                                Teacher.findById(teacherId)
                                    .then(teacher => {
                                        teacher.timetable = teacher.timetable.map(row => {
                                            if (row.id.toString() === recordId) {
                                                row.planId = plan.id;
                                            }
                                            return row;
                                        });
                                        return teacher.save();
                                    })
                            ]);
                        } else {
                            const copiedPlan = new Plan({
                                name: plan.name,
                                schoolId: teacher.schoolId._id,
                                groupId: groupId,
                                teacherId: teacherId,
                                subjectId: plan.subjectId,
                                timetable: plan.timetable
                            });

                            return copiedPlan.save()
                                .then(copiedPlan => {
                                    return Teacher.findById(teacherId);
                                })
                                .then(teacher => {
                                    teacher.timetable = teacher.timetable.map(row => {
                                        if (row.id.toString() === recordId) {
                                            row.planId = copiedPlan.id;
                                        }
                                        return row;
                                    });
                                    return teacher.save();
                                })
                            
                        }
                        
                    })
                    .then(() => {
                        res.status(200, { message: 'ok' }).end();
                    })
                    .catch(err => {
                        console.log(err);
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