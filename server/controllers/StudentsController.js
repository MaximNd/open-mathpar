const Student = require('./../models/student');
const User = require('./../models/user');
const Task = require('./../models/task');
const { findShoollId } = require('./../helpers/helpers');
const request = require('request');

module.exports = {
    getStudentByID(req, res) {

    },

    getStudentsSubjectById(req, res) {
        Student.findById(req.params.id)
            .then(user => user.subjects(user.groupId))
            .then(subjects => res.send(subjects))
            .catch(err => console.log(err));
    },

    getStudentGradebookById(req, res) {
        Student.findById(req.params.id)
            .select('gradeBook')
            .populate({ path: 'gradeBook.taskId', select: 'name subjectId isTest', populate: { path: 'subjectId', select: 'name' } })
            .then(gradeBookData => {
                res.send(gradeBookData.gradeBook);
            })
            .catch(err => console.log(err));
    },

    async createStudent(req, res) {
        try {
            const { user, groupId, classId }  = req.body;
            const studentUser = new User(user);
            await studentUser.save();

            req.user.clients
                .then(async clients => {
                    try {
                        const role = clients.find(client => client.clientRole === "methodist")
                            ? "methodist"
                            : "headTeacher";
                        const student = new Student({
                            userId: studentUser._id,
                            schoolId: findShoollId(clients, role),
                            groupId,
                            classId,
                            schoolModel: role === 'methodist' ? "University" : "School",
                        });
                        await student.save();
                        res.status(200, { message: 'ok' }).end();
                    } catch (error) {
                        console.log(error);  
                    }
                });
        } catch (error) {
            console.log(error);
        }
    },

    updateStudent(req, res) {

    },

    deleteStudent(req, res) {

    },

    setMarkByTask(req, res) {
        let { taskId, isTest, mark, time, studentResult } = req.body.taksResult;
        if (!isTest && studentResult) {
            Task.findById(taskId)
            .then(task => {
                mark = 0;
                let promises = [];
                function makeRequest(result, index) {
                    return new Promise((resolve, reject) => {
                        request.post({
                            headers: { 
                                'content-type': 'application/json',
                                'Accept': 'application/json',
                                'Accept-Charset': 'utf-8',
                            },
                            url: 'http://mathpar.ukma.edu.ua/api/check',
                            json: true,
                            body: {
                                userAnswer: result,
                                dbSolutionAnswer: task.exercises[index].answer
                            }
                        }, function(error, response, body) {
                            if (body.result === 'YES') {
                                ++mark;
                            }
                            resolve();
                        });
                    });
                }
                
                studentResult.forEach((result, index) => {
                    promises.push(makeRequest(result, index));
                });

                Promise.all(promises)
                    .then(() => {
                        mark = mark * 100 / studentResult.length;
                        return req.user.clients;
                    })
                    .then(clients => {
                        Student.update({ _id: clients.find(client => client.clientRole === 'student').client.id, }, { $push: { gradeBook: { taskId, mark, time } } }, (err) => {
                            if (err) {
                                console.log(err);
                                res.send({
                                    status: 'ERR'
                                });
                            }
                            res.send({
                                status: 'OK'
                            });
                        });
                    });;
            });
        } else {
            req.user.clients
                .then(clients => {
                    Student.update({ _id: clients.find(client => client.clientRole === 'student').client.id, }, { $push: { gradeBook: { taskId, mark, time } } }, (err) => {
                        if (err) {
                            console.log(err);
                            res.send({
                                status: 'ERR'
                            });
                        }
                        res.send({
                            status: 'OK'
                        });
                    });
                });
        }
    }
}