const Class = require('./../models/class');
const { findShoollId } = require('./../helpers/helpers');

module.exports = {
    getClassById(req, res) {
        Class.findById(req.params.id)
            .then(class_ => {
                class_.students(class_._id)
                    .then(({ students }) => {
                        //console.log(students);
                        let studentsAVGSRMarks = students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll);
                        let studentsAVGKRMarks = students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllKR);
                        let studentAVGSRDispersion = students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr);
                        let studentAVGKRDispersion = students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allKr);

                        let classAVGMarks = class_.avgMarks(studentsAVGSRMarks, studentsAVGKRMarks);
                        let classAVGDispersion = class_.avgDispersion(studentAVGSRDispersion, studentAVGKRDispersion);

                        res.send({ 'class': class_, students, classAVGMarks, classAVGDispersion })
                    })
                    .catch(err => console.log(err));
            })
    },

    createClass(req, res) {
        const name = req.body.class.name;
        req.user.clients
            .then(clients => {
                const role = clients.find(client => client.clientRole === "dean")
                            ? "dean"
                            : "director";
                const _class = new Class({
                    name,
                    schoolId: findShoollId(clients, role),
                    schoolModel: role === 'dean' ? "University" : "School",
                });
                _class.save(err => {
                    if (err) {
                        console.log(err);
                    }
                    res.status(200, { message: 'ok' }).end();
                });
            });
    },

    updateClass(req, res) {

    },

    deleteClass(req, res) {

    }
};