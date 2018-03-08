const Plan = require('./../models/plan');
const Teacher = require('./../models/teacher');

module.exports = {
    getPlanById(req, res) {
        console.time('2');
        Plan.findById(req.params.id).populate({ path: 'timetable.lectionId timetable.taskId' })
            .then(plan => {
                res.send(plan)
                console.timeEnd('2');
            })
            .catch(err => console.log(err));
    },

    createPlan(req, res) {
        // TODO TEST (plan saving)
        const { recordId, name, groupId, subjectId, timetable } = req.body;
        
        req.user.clients
            .then(clients => {
                const teacherId = clients.find(client => client.clientRole === 'teacher').client.id;
                console.log(teacherId.toString());
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