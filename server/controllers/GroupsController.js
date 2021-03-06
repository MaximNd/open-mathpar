const Group = require('./../models/group');
const Student = require('./../models/student');
const { findShoollId } = require('./../helpers/helpers');

module.exports = {
    getGroupById(req, res) {
        Group.findById(req.params.id)
            .then(group => {
                let promises = [group.students(group._id), group.teachers(group._id)];
                Promise.all(promises)
                    .then(members => {
                        let studentsAVGSRMarks = members.find(membersType => membersType.students).students
                        .map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll);

                        let studentsAVGKRMarks = members.find(membersType => membersType.students).students
                        .map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllKR);
                        // console.log(studentsAVGSRMarks, studentsAVGKRMarks);
                        let groupAVGMarks = group.avgMarks(studentsAVGSRMarks, studentsAVGKRMarks);

                        let studentAVGSRDispersion = members.find(membersType => membersType.students).students
                        .map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr);

                        let studentAVGKRDispersion = members.find(membersType => membersType.students).students
                        .map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allKr);
                        
                        let groupAVGDispersion = group.avgDispersion(studentAVGSRDispersion, studentAVGKRDispersion);
                        
                        return res.send({ group, members, groupAVGMarks, groupAVGDispersion });
                    })
                    .catch(err => console.log(err));
            });
    },
    // getGroupsBySchoolId(req, res) {
        
    // },
    getStudents(req, res) {
        Student.find({ groupId: req.params.id }).populate({ path: 'userId' })
            .then(students => {
                res.send(students);
            })
            .catch(console.log);
    },
    // getTeachers(req, res) {

    // },
    createGroup(req, res) {
        const { name, course } = req.body;

        req.user.clients
            .then(clients => {
                const role = clients.find(client => client.clientRole === "methodist")
                            ? "methodist"
                            : "headTeacher";
                const group = new Group({
                    name,
                    schoolId: findShoollId(clients, role),
                    course,
                    schoolModel: role === 'methodist' ? "University" : "School",
                });
                group.save(err => {
                    if (err) {
                        console.log(err);
                    }
                    res.status(200, { message: 'ok' }).end();
                });
            });
    },
    updateGroup(req, res) {

    },
    deleteGroup(req, res) {

    }
};