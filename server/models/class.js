const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const User = require('./user');

const { calculateAVGFourNumbersBySRMark, calculateAVGKRMarks } = require('./../helpers/helpers');

// Class Schema
const ClassSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  schoolId: {
      type: ObjectId,
      required: true,
      ref: 'School'
  }
});

ClassSchema.methods.students = function(classId) {
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
                resUsers = resUsers.filter(student => student.clients.find(client => client.clientRole === 'student').client.classId.toString() === classId.toString());       
                //console.log(users, clients);
                return res({ students: resUsers })
            });
      })
      .catch(err => rej(err))
  });
};

ClassSchema.methods.avgMarks = function(sr, kr) {
  let fourNumbersAVGForGroup = calculateAVGFourNumbersBySRMark(sr);
  let AVGKRMarks = calculateAVGKRMarks(kr);
  return { avgSR: fourNumbersAVGForGroup, avgKR: AVGKRMarks };
};

ClassSchema.methods.avgDispersion = function(sr, kr) {
  let fourNumbersAVGForGroup = calculateAVGFourNumbersBySRMark(sr);
  let AVGKRMarks = calculateAVGKRMarks(kr);
  return { avgSR: fourNumbersAVGForGroup, avgKR: AVGKRMarks };
}

const Class = module.exports = mongoose.model('Class', ClassSchema);