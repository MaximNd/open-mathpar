const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const User = require('./user');
const Group = require('./group');

const { calculateAVGFourNumbersBySRMark, calculateAVGKRMarks } = require('../helpers/helpers');

const UniversitySchema = new Schema({
  rectorId: {
      type: ObjectId,
      ref: 'Director',
      required: true
  },
  country: String,
  region: String,
  city: String,
  district: {
      type: String,
      required: false
  },
  address: String,
  name: String,
  accreditationLevel: {
    type: Number,
    required: false
  }
});

UniversitySchema.methods.headTeacher = function (schoolId) {
  return new Promise((res, rej) => {
    return User.find({ role: 'headTeacher' })
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
                    resUsers = resUsers.filter(headTeacher => headTeacher.clients.find(client => client.clientRole === 'headTeacher').client.schoolId._id.toString() === schoolId.toString());  
                    //console.log(users, clients);
                    return res({ headTeachers: resUsers })
                });
        })
        .catch(err => rej(err));
  });
};

UniversitySchema.methods.teachers = function (schoolId) {
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
                        let resClients = allClients.filter(clients => clients.find(client => client.client.userId.toString() === user.id));
                        resUsers.push({ user, clients: resClients[0] });
                    });
                    resUsers = resUsers.filter(teacher => teacher.clients.find(client => client.clientRole === 'teacher').client.schoolId._id.toString() === schoolId.toString());  
                    //console.log(users, clients);
                    return res({ teachers: resUsers })
                });
        })
        .catch(err => rej(err));
  });
};

UniversitySchema.methods.students = function (schoolId) {
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
                    resUsers = resUsers.filter(student => student.clients.find(client => client.clientRole === 'student').client.schoolId._id.toString() === schoolId.toString());  
                    //console.log(users, clients);
                    return res({ students: resUsers })
                });
        })
        .catch(err => rej(err));
  });
};

UniversitySchema.methods.groups = function (schoolId) {
  return new Promise((res, rej) => {
    return Group.find({ schoolId })
        .then(groups => res(groups))
        .catch(err => rej(err));
  });
};

UniversitySchema.methods.avgMarks = function(sr, kr) {
  let fourNumbersAVGForGroup = calculateAVGFourNumbersBySRMark(sr);
  let AVGKRMarks = calculateAVGKRMarks(kr);
  return { avgSR: fourNumbersAVGForGroup, avgKR: AVGKRMarks };
};

UniversitySchema.methods.avgDispersion = function(sr, kr) {
  let fourNumbersAVGForGroup = calculateAVGFourNumbersBySRMark(sr);
  let AVGKRMarks = calculateAVGKRMarks(kr);
  return { avgSR: fourNumbersAVGForGroup, avgKR: AVGKRMarks };
}

module.exports = mongoose.model('University', UniversitySchema);
