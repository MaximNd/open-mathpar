const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const User = require('./user');

const { calculateAVGFourNumbersBySRMark, calculateAVGKRMarks } = require('./../helpers/helpers');

// Group Schema
const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: Number,
        required: true
    },
    schoolId: {
        type: ObjectId,
        required: true,
        ref: 'School'
    }
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

GroupSchema.methods.students = function(groupId) {
    return new Promise((res, rej) => {
        return User.find({ role: 'student' })
            .then(users => {
                let promises = [];
                users.forEach(user => {
                    promises.push(user.clients);
                });

                Promise.all(promises)
                    .then(allClients => {
                        let resUsers = [];
                        users.forEach(user => {
                            let resClients = allClients.filter(clients => clients.find(client => client.client.userId.toString() === user.id));
                            resUsers.push({ user, clients: resClients[0] });
                        });
                        resUsers = resUsers.filter(student => student.clients.find(client => client.clientRole === 'student').client.groupId.toString() === groupId.toString());    
                        //console.log(users, clients);
                        return res({ students: resUsers })
                    });
            })
            .catch(err => rej(err));
    });
};

GroupSchema.methods.teachers = function(groupId) {
    // console.log(typeof groupId);
    // console.log(groupId);
    return new Promise((res, rej) => {
        return User.find({ role: 'teacher' })
            .then(users => {
                let promises = [];
                users.forEach(user => {
                    promises.push(user.clients);
                });

                Promise.all(promises)
                    .then(allClients => {
                        let resUsers = [];
                        users.forEach(user => {
                            let resClients = allClients
                                .filter(clients => clients.find(client => client.client.userId.toString() === user.id))
                                //.filter(clients => clients.find(client => client.client.timetable.find(lesson => lesson.groupId === groupId)));
                            resUsers.push({ user, clients: resClients[0] });
                        });
                        //console.log(resUsers)
                        resUsers = resUsers.filter(teacher => teacher.clients.find(client => client.clientRole === 'teacher').client.timetable.find(lesson => lesson.groupId._id.toString() === groupId.toString()));
                        //console.log(users, clients);
                        return res({ teachers: resUsers })
                    });
            })
            .catch(err => rej(err));
    });
};

GroupSchema.methods.avgMarks = function(sr, kr) {
    let fourNumbersAVGForGroup = calculateAVGFourNumbersBySRMark(sr);
    let AVGKRMarks = calculateAVGKRMarks(kr);
    return { avgSR: fourNumbersAVGForGroup, avgKR: AVGKRMarks };
};

GroupSchema.methods.avgDispersion = function(sr, kr) {
    let fourNumbersAVGForGroup = calculateAVGFourNumbersBySRMark(sr);
    let AVGKRMarks = calculateAVGKRMarks(kr);
    return { avgSR: fourNumbersAVGForGroup, avgKR: AVGKRMarks };
}

const Group = module.exports = mongoose.model('Group', GroupSchema);