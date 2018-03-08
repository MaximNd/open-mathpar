const Task = require('./../models/task');
const Student = require('./../models/student');
const request = require('request');

module.exports = {
    getTasksByTeacherId(req, res) {
        Task.find({ teacherId: req.params.id })
            .then(tasks => res.send(tasks))
            .catch(err => console.log(err));
    },

    getTaskById(req, res) {
        // Student.find().populate('gradeBook.taskId', 'isTest subjectId').then(student => {
        //     student[0].subjects(student[0].groupId)
        //         .then(result => res.send(result));
                
        // });
        Task.findById(req.params.id).populate({ path: 'subjectId' }).populate({ path: 'teacherId', populate: { path: 'userId' } }).select('-exercises.answer -exercises.fullSolution')
            .then(task => {
                res.send(task);
            });
    },

    checkKr(req, res) {
        console.log(req.body);
        Task.findById(req.params.id)
            .then(task => {
                let numberOfCorrectAnswers = 0;
                task.exercises.forEach((exercise, index) => {
                    if (exercise.answer === req.body.results[index]) {
                        numberOfCorrectAnswers += 1;
                    }
                });
                res.send({ finalMark: numberOfCorrectAnswers * 10 });
            })
        
    },

    createTask(req, res) {
        const { subjectId, name, isTest, exercises } = req.body;

        req.user.clients
            .then(clients => {
                const task = new Task({
                    subjectId,
                    teacherId: clients.find(client => client.clientRole === 'teacher').client.id,
                    name,
                    isTest,
                    isAllow: isTest,
                    exercises
                });
            
                task.save(err => {
                    if (err) {
                        console.log(err);
                    }
                    
                    res.status(200, { message: 'ok' }).end();
                });
            });
    },

    updateTask(req, res) {

    },

    deleteTask(req, res) {
        
    },

    checkExercise(req, res) {
        console.log(req.params);
        Task.findById(req.params.id)
            .then(task => {
                console.log(task.exercises[req.params.exercise].answer)
                request.post({
                    headers: { 
                        'content-type': 'application/json',
                        'Accept': 'application/json',
                        'Accept-Charset': 'utf-8',
                    },
                    url: 'http://localhost:8084/mathpar/api/check',
                    json: true,
                    body: {
                        userAnswer: req.params.answer,
                        dbSolutionAnswer: task.exercises[req.params.exercise].answer
                    }
                }, function(error, response, body) {
                    if (body.result === 'YES') {
                        res.send({
                            correct: true
                        });
                    } else {
                        res.send({
                            correct: false
                        });
                    }

                });
                
            });
    },

    showSolution(req, res) {
        Task.findById(req.params.id)
            .then(task => {
                res.send({
                    solution: task.exercises[req.params.exercise].fullSolution
                });
            });
    }
};