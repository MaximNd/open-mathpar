const Task = require('./../models/task');
const Student = require('./../models/student');
const request = require('request');
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getTasksByTeacherId(req, res) {
        Task.find({ teacherId: req.params.id })
            .then(tasks => res.send(tasks))
            .catch(err => console.log(err));
    },
    // :schoolId - if(true) then { get tasks from your school } else { get all task from database }
    // :fetchType - allTasks, allSR, allKR, allYourTasks, allYourSR, allYourKR
    // :teacherId - teacherID
    // :classNumber - (number) from 1 to 12
    // :subjectId - subjectID
    // :themeId - themeId of the selected subject
    // :difficultyLevel - (Eazy,Middle,Hard)
    getFilteredTasks(req, res) {
        const { schoolId, fetchType, teacherId, classNumber, subjectId, themeId, difficultyLevel } = req.params;
        let filter = {};
        if (schoolId !== 'undefined') filter.schoolId = schoolId;
        if (fetchType !== 'undefined' && fetchType !== 'allTasks') {
            if (fetchType === 'allSR') {
                filter.isTest = true;
            } else if (fetchType === 'allKR') {
                filter.isTest = false;
            } else if (fetchType === 'allYourTasks' && teacherId !== 'undefined') {
                filter.teacherId = teacherId;
            } else if (fetchType === 'allYourSR' && teacherId !== 'undefined') {
                filter.teacherId = teacherId;
                filter.isTest = true;
            } else if (fetchType === 'allYourKR' && teacherId !== 'undefined') {
                filter.teacherId = teacherId;
                filter.isTest = false;
            }
        }
        if (classNumber !== 'undefined') filter.class = parseInt(classNumber);
        if (subjectId !== 'undefined') filter.subjectId = subjectId;
        if (themeId !== 'undefined') filter.theme = themeId;
        if (difficultyLevel !== 'undefined') filter.difficultyLevel = difficultyLevel;
        
        // { theme: req.params.themeId, subjectId: req.params.subjectId, class: req.params.class }
        Task.find(filter)
            .populate({ path: 'subjectId' })
            .populate({ path: 'teacherId', populate: { path: 'userId' } })
            .populate({ path: 'teacherId', populate: { path: 'schoolId' } })
            .populate({ path: 'theme' })
            .select('-exercises')
            .then(task => { res.send(task) });
    },

    getTaskById(req, res) {
        // Student.find().populate('gradeBook.taskId', 'isTest subjectId').then(student => {
        //     student[0].subjects(student[0].groupId)
        //         .then(result => res.send(result));
                
        // });
        let query = Task.findById(req.params.id)
            .populate({ path: 'subjectId' })
            .populate({ path: 'teacherId', populate: { path: 'userId' } });
        req.user.clients
            .then(clients => {
                if(!clients.find(client => client.clientRole === 'teacher')) {
                    query.select('-exercises.answer -exercises.fullSolution');            
                }
                return query;
            }).then(task => {
                res.send(task);
            });
    },

    getTaskByIdWithOneVariant(req, res) {
        Task.aggregate([
            { $match: { _id: ObjectId(req.params.id) } },
            { $unwind: '$exercises' },
            { $match: { 'exercises.variant': parseInt(req.params.variant) } },
            { $group: {
                _id: '$_id',
                schoolId: { $first: '$schoolId' },
                subjectId: { $first: '$subjectId' },
                teacherId: { $first: '$teacherId' },
                isTest: { $first: '$isTest' },
                isAllow: { $first: '$isAllow' },
                class: { $first: '$class' },
                difficultyLevel: { $first: '$difficultyLevel' },
                theme: { $first: '$theme' },
                name: { $first: '$name' },
                order: { $first: '$order' },
                countOfVariants: { $first: '$countOfVariants' },
                exercises: { $push: {
                    _id: '$exercises._id',
                    text: '$exercises.text',
                    variant: '$exercises.variant',
                    images: '$exercises.images'
                }}
            }},
            { $lookup: {
                from: 'subjects',
                localField: 'subjectId',
                foreignField: '_id',
                as: 'subjectId'
            }},
            { $lookup: {
                from: 'teachers',
                localField: 'teacherId',
                foreignField: '_id',
                as: 'teacherId'
            }},
            { $unwind: '$subjectId' },
            { $unwind: '$teacherId' },
            {
                $project: {
                    schoolId: '$schoolId',
                    subjectId: '$subjectId',
                    teacherId: '$teacherId',
                    isTest: '$isTest',
                    isAllow: '$isAllow',
                    class: '$class',
                    difficultyLevel: '$difficultyLevel',
                    theme: '$theme',
                    name: '$name',
                    order: '$order',
                    countOfVariants: '$countOfVariants',
                    exercises: '$exercises'
                }
            }
        ])
        .then(tasks => {
            res.send(tasks[0]);
        });
    },
    // checkKr(req, res) {
    //     console.log(req.body);
    //     Task.findById(req.params.id)
    //         .then(task => {
    //             let numberOfCorrectAnswers = 0;
    //             task.exercises.forEach((exercise, index) => {
    //                 if (exercise.answer === req.body.results[index]) {
    //                     numberOfCorrectAnswers += 1;
    //                 }
    //             });
    //             res.send({ finalMark: numberOfCorrectAnswers * 10 });
    //         })
        
    // },

    createTask(req, res) {
        const task = new Task(req.body);
        task.save(err => {
            if (err) {
                console.log(err);
            } 
            res.status(200, { message: 'ok' }).end();
        });
    },
    // TODO update variants
    updateTask(req, res) {
        const taskId = req.params.id;
        const { name, isTest, isAllow, difficultyLevel, order,  exercises } = req.body;
        
        Task.update({ _id: taskId }, { $set: { name, isTest, isAllow, difficultyLevel, order,  exercises } }, (err) => {
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
    },

    deleteTask(req, res) {
        
    },

    checkExercise(req, res) {
        Task.findById(req.params.id)
            .then(task => {
                request.post({
                    headers: { 
                        'content-type': 'application/json',
                        'Accept': 'application/json',
                        'Accept-Charset': 'utf-8',
                    },
                    url: 'http://localhost:8080/api-app/check',
                    json: true,
                    body: {
                        userAnswer: req.params.answer,
                        dbSolutionAnswer: task.exercises.find(exercise => exercise._id.toString() === req.params.exerciseId).answer
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
                    solution: task.exercises.find(exercise => exercise._id.toString() === req.params.exerciseId).fullSolution
                });
            });
    }
};