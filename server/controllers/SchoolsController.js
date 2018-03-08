const School = require('./../models/school');
const Group = require('./../models/group');
const Class = require('./../models/class');
const Subject = require('./../models/subject');

module.exports = {
    getSchoolById(req, res) {
        console.time('1');
        School.findById(req.params.id).populate({ path: 'directorId', populate: { path: 'userId' } })
            .then(school => {
                let promises = [
                    School.find({ parentSchool: school._id }).populate({ path: 'directorId', populate: { path: 'userId' } }),
                    school.headTeacher(school._id),
                    school.teachers(school._id),
                    school.students(school._id),
                    school.groups(school._id)
                ];
                Promise.all(promises)
                    .then(result => {
                        let filials = result[0];
                        let headTeachers = result[1].headTeachers;
                        let teachers = result[2].teachers;
                        let students = result[3].students;
                        let groups = result[4];

                        let schoolAVGMarks = school.avgMarks(
                            students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll),
                            students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllKR)
                        );

                        let schoolAVGDispersion = school.avgDispersion(
                            students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr),
                            students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allKr)
                        );

                        let promises = [];
                        groups.forEach(group => promises.push(group.students(group._id), group.teachers(group._id)));
                        Promise.all(promises)
                            .then(members => {
                                groups = groups.map((group, index) => {
                                    let currentStudents = members[index * 2].students;
                                    let currentTeachers = members[(index * 2) + 1].teachers;

                                    let studentsCount = currentStudents.length;
                                    let teachersCount = currentTeachers.length;

                                    let studentsAVGSRMarks = currentStudents.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll);
                                    let studentsAVGKRMarks = currentStudents.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllKR);

                                    let groupAVGMarks = group.avgMarks(studentsAVGSRMarks, studentsAVGKRMarks);

                                    let studentAVGSRDispersion = currentStudents.map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr);
                                    let studentAVGKRDispersion = currentStudents.map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allKr);

                                    let groupAVGDispersion = group.avgDispersion(studentAVGSRDispersion, studentAVGKRDispersion);

                                    return { group, studentsCount, teachersCount, groupAVGMarks, groupAVGDispersion };
                                });
                                console.timeEnd('1');
                                return res.send({ school, schoolAVGMarks, schoolAVGDispersion, filials, headTeachers, teachers, students, groups });
                            });
                    });
            })
            .catch(err => console.log(err));
    },

    getGroups(req, res) {
        console.log(req.params.id);
        Group.find({ schoolId: req.params.id })
            .then(groups => {
                let promises = [];
                groups.forEach(group => promises.push(group.students(group._id), group.teachers(group._id)));
                Promise.all(promises)
                    .then(members => {
                        groups = groups.map((group, index) => {
                            let currentStudents = members[index * 2].students;
                            let currentTeachers = members[(index * 2) + 1].teachers;

                            let studentsCount = currentStudents.length;
                            let teachersCount = currentTeachers.length;

                            let studentsAVGSRMarks = currentStudents.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll);
                            let studentsAVGKRMarks = currentStudents.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllKR);

                            let groupAVGMarks = group.avgMarks(studentsAVGSRMarks, studentsAVGKRMarks);

                            let studentAVGSRDispersion = currentStudents.map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr);
                            let studentAVGKRDispersion = currentStudents.map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allKr);

                            let groupAVGDispersion = group.avgDispersion(studentAVGSRDispersion, studentAVGKRDispersion);

                            return { group, studentsCount, teachersCount, groupAVGMarks, groupAVGDispersion };
                        });
                        return res.send({ groups });
                    });
            });
    },

    getClasses(req, res) {
        Class.find({ schoolId: req.params.id })
            .then(classes => res.send(classes));
    },

    createSchool(req, res) {

    },

    updateSchool(req, res) {

    },

    deleteSchool(req, res) {
        
    }
};