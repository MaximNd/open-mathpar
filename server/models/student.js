const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Teacher = require('./teacher');

const { calculateFourNumbersBySRMark, calculateAVGFourNumbersBySRMark, calculateAVGKRMarks, calculateDispersion } = require('./../helpers/helpers');

const TaskTimeExecutionSchema = new Schema({
  exerciseIndex: {
    type: Number,
    required: true
  },
  hours: {
    type: Number,
    required: true
  },
  minutes: {
    type: Number,
    required: true
  },
  seconds: {
    type: Number,
    required: true
  }
});

const StudentSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  schoolId: {
    type: ObjectId,
    required: true,
    //ref: 'School'
    refPath: 'schoolModel'
  },
  schoolModel: {
    type: String,
    required: true,
    enum: ['School', 'University'],
    default: 'School'
  },
  groupId: {
    type: ObjectId,
    required: true,
    ref: 'Group'
  },
  classId: {
    type: ObjectId,
    required: true,
    ref: 'Class'
  },
  gradeBook: {
    type: [
      {
        taskId: {
          type: ObjectId,
          required: true,
          ref: 'Task'
        },
        mark: String,
        time: {
          type: [TaskTimeExecutionSchema],
          required: true
        }
      }
    ],
    required: false
  }
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

// Need populate gradeBook.taskId(select subjectId and isTest)
StudentSchema.virtual('avgMarks').get(function() {
  function getAllMarksBySubjectBySR(marks) {
    let marksBySubjects = {};
    marks.forEach(mark => {
      if (marksBySubjects[mark.taskId.subjectId]) {
          if (marksBySubjects[mark.taskId.subjectId][mark.taskId._id]) {
              marksBySubjects[mark.taskId.subjectId][mark.taskId._id].push(mark.mark);
          } else {
            marksBySubjects[mark.taskId.subjectId][mark.taskId._id] = [];
          }
      } else {
          marksBySubjects[mark.taskId.subjectId] = {};
          marksBySubjects[mark.taskId.subjectId][mark.taskId._id] = [];
          marksBySubjects[mark.taskId.subjectId][mark.taskId._id].push(mark.mark);
      }
    });
    return marksBySubjects;
  }
  // All mark by sr
  let srMarks = this.gradeBook.filter(mark => mark.taskId.isTest);// .map(mark => mark.mark);
  let srMarksBySubjectsBySR = getAllMarksBySubjectBySR(srMarks);
//  return srMarksBySubjectsBySR;
  
  let avgFourNumbersSRMarksBySubjectBySR = {};

  for(let subjectId in srMarksBySubjectsBySR) {
    for(let srId in srMarksBySubjectsBySR[subjectId]) {
      let firstMark = srMarksBySubjectsBySR[subjectId][srId][0];
      let lastMark = srMarksBySubjectsBySR[subjectId][srId][srMarksBySubjectsBySR[subjectId][srId].length - 1];
      let firstFourNumbersMark = calculateFourNumbersBySRMark(firstMark);
      let lastFourNumbersMark = calculateFourNumbersBySRMark(lastMark);
      if(!avgFourNumbersSRMarksBySubjectBySR[subjectId]) {
        avgFourNumbersSRMarksBySubjectBySR[subjectId] = {};
      }
      avgFourNumbersSRMarksBySubjectBySR[subjectId][srId] = {};
      avgFourNumbersSRMarksBySubjectBySR[subjectId][srId].first = firstFourNumbersMark;
      avgFourNumbersSRMarksBySubjectBySR[subjectId][srId].last = lastFourNumbersMark;
      avgFourNumbersSRMarksBySubjectBySR[subjectId][srId].avgAll = calculateAVGFourNumbersBySRMark([firstFourNumbersMark, lastFourNumbersMark]);
    }
  }

  // return avgFourNumbersSRMarksBySubjectBySR;
  
  // All marks by kr
  let krMarks = this.gradeBook.filter(mark => !mark.taskId.isTest);// .map(mark => mark.mark);
  let krMarksBySubject = {};

  krMarks.forEach(mark => {
    if (krMarksBySubject[mark.taskId.subjectId]) {
      krMarksBySubject[mark.taskId.subjectId].push(mark.mark);
    } else {
        krMarksBySubject[mark.taskId.subjectId] = [];
        krMarksBySubject[mark.taskId.subjectId].push(mark.mark);
    }
  });

  let krAVGMarksBySubject = {};
  for (let subjectId in krMarksBySubject) {
    krAVGMarksBySubject[subjectId] = calculateAVGKRMarks(krMarksBySubject[subjectId]);
  }
  
  // return krMarksBySubject;

  let avgAllSRBySubject = {};
  for (let subjectId in avgFourNumbersSRMarksBySubjectBySR) {
    let avgFourNumbersAll = [];
    let avgFourNumbersFirst = [];
    let avgFourNumbersLast = [];
    for (let srId in avgFourNumbersSRMarksBySubjectBySR[subjectId]) {
      avgFourNumbersAll.push(avgFourNumbersSRMarksBySubjectBySR[subjectId][srId].avgAll);
      avgFourNumbersFirst.push((avgFourNumbersSRMarksBySubjectBySR[subjectId][srId].first));
      avgFourNumbersLast.push((avgFourNumbersSRMarksBySubjectBySR[subjectId][srId].last));
    }
    avgAllSRBySubject[subjectId] = {
      avgAll: calculateAVGFourNumbersBySRMark(avgFourNumbersAll),
      first: calculateAVGFourNumbersBySRMark(avgFourNumbersFirst),
      last: calculateAVGFourNumbersBySRMark(avgFourNumbersLast)
    }
  }

  // return avgAllSRBySubject;

  let avgAllSR = {};
  let avgAllSRFourNumbers = [];
  for (let subjectId in avgAllSRBySubject) {
    avgAllSRFourNumbers.push(avgAllSRBySubject[subjectId].avgAll);
  }
  let avgAllSRFirst = [];
  let avgAllSRLast = [];
  // return avgFourNumbersSRMarksBySubjectBySR;
  for (let subjectId in avgFourNumbersSRMarksBySubjectBySR) {
    for (let srId in avgFourNumbersSRMarksBySubjectBySR[subjectId]) {
      avgAllSRFirst.push(avgFourNumbersSRMarksBySubjectBySR[subjectId][srId].first);
      avgAllSRLast.push(avgFourNumbersSRMarksBySubjectBySR[subjectId][srId].last);
    }
  }

  avgAllSR.first = calculateAVGFourNumbersBySRMark(avgAllSRFirst);
  avgAllSR.last = calculateAVGFourNumbersBySRMark(avgAllSRLast);
  avgAllSR.avgAll = calculateAVGFourNumbersBySRMark(avgAllSRFourNumbers);

  let avgAllKR;
  let avgAllKRArr = [];
  for (let subjectId in krAVGMarksBySubject) {
    avgAllKRArr.push(krAVGMarksBySubject[subjectId]);
  }

  avgAllKR = calculateAVGKRMarks(avgAllKRArr);

  return {
    sr: avgFourNumbersSRMarksBySubjectBySR,
    avgAllSRBySubject,
    avgAllSR,
    kr: krAVGMarksBySubject,
    avgAllKR
  };
});

StudentSchema.virtual('avgDispercion').get(function() {
  let marksBySubjectBySR = this.avgMarks.sr;
  let marksBySubject = {};

  for (let subjectId in marksBySubjectBySR) {
    marksBySubject[subjectId] = {
      first: [],
      last: [],
      avgAll: []
    };
    for (let srId in marksBySubjectBySR[subjectId]) {
      marksBySubject[subjectId].first.push(marksBySubjectBySR[subjectId][srId].first);
      marksBySubject[subjectId].last.push(marksBySubjectBySR[subjectId][srId].last);
      marksBySubject[subjectId].avgAll.push(marksBySubjectBySR[subjectId][srId].avgAll);
    }
  }

  let dispersionSRBySubject = {};

  for (let subjectId in marksBySubject) {
    let firstFirstNumbers = marksBySubject[subjectId].first.map(fourNumbers => fourNumbers.firstNumber);
    let firstSecondNumbers = marksBySubject[subjectId].first.map(fourNumbers => fourNumbers.secondNumber);
    let firstThirdNumbers = marksBySubject[subjectId].first.map(fourNumbers => fourNumbers.thirdNumber);
    let firstFourthNumbers = marksBySubject[subjectId].first.map(fourNumbers => fourNumbers.fourthNumber);

    let lastFirstNumbers = marksBySubject[subjectId].last.map(fourNumbers => fourNumbers.firstNumber);
    let lastSecondNumbers = marksBySubject[subjectId].last.map(fourNumbers => fourNumbers.secondNumber);
    let lastThirdNumbers = marksBySubject[subjectId].last.map(fourNumbers => fourNumbers.thirdNumber);
    let lastFourthNumbers = marksBySubject[subjectId].last.map(fourNumbers => fourNumbers.fourthNumber);

    let avgFirstNumbers = marksBySubject[subjectId].avgAll.map(fourNumbers => fourNumbers.firstNumber);
    let avgSecondNumbers = marksBySubject[subjectId].avgAll.map(fourNumbers => fourNumbers.secondNumber);
    let avgThirdNumbers = marksBySubject[subjectId].avgAll.map(fourNumbers => fourNumbers.thirdNumber);
    let avgFourthNumbers = marksBySubject[subjectId].avgAll.map(fourNumbers => fourNumbers.fourthNumber);

    dispersionSRBySubject[subjectId] = {
      first: {
        firstNumber: calculateDispersion(firstFirstNumbers),
        secondNumber: calculateDispersion(firstSecondNumbers),
        thirdNumber: calculateDispersion(firstThirdNumbers),
        fourthNumber: calculateDispersion(firstFourthNumbers)
      },
      last: {
        firstNumber: calculateDispersion(lastFirstNumbers),
        secondNumber: calculateDispersion(lastSecondNumbers),
        thirdNumber: calculateDispersion(lastThirdNumbers),
        fourthNumber: calculateDispersion(lastFourthNumbers)
      },
      avgAll: {
        firstNumber: calculateDispersion(avgFirstNumbers),
        secondNumber: calculateDispersion(avgSecondNumbers),
        thirdNumber: calculateDispersion(avgThirdNumbers),
        fourthNumber: calculateDispersion(avgFourthNumbers)
      }
    };
  }

  let allDispersionBySR = {};
  let allDispersionBySRArr = [];
  for (let subjectId in dispersionSRBySubject) {
    allDispersionBySRArr.push(dispersionSRBySubject[subjectId].avgAll);
  }
  allDispersionBySR = calculateAVGFourNumbersBySRMark(allDispersionBySRArr);

  let marksBySubjectByKR = this.gradeBook.filter(mark => !mark.taskId.isTest)
    .reduce((krBySubject, mark) => {
      if (krBySubject[mark.taskId.subjectId]) {
        krBySubject[mark.taskId.subjectId].push(mark.mark);
      } else {
        krBySubject[mark.taskId.subjectId] = [];
        krBySubject[mark.taskId.subjectId].push(mark.mark);
      }
      return krBySubject;
    }, {});
  
  let dispersionKrBySubject = {};
  let allDispersionByKR = 0;
  let allDispersionByKRArr = [];

  for (let subjectId in marksBySubjectByKR) {
    dispersionKrBySubject[subjectId] = calculateDispersion(marksBySubjectByKR[subjectId]);
  }
  for (let subjectId in dispersionKrBySubject) {
    allDispersionByKRArr.push(dispersionKrBySubject[subjectId]);
  }
  allDispersionByKR = calculateDispersion(allDispersionByKRArr);


  // return marksBySubjectByKR;
  return {
    sr: dispersionSRBySubject,
    kr: dispersionKrBySubject,
    allKr: allDispersionByKR,
    allSr: allDispersionBySR
  };
});

StudentSchema.methods.subjects = function(groupId) {
  return new Promise((res, rej) => {
    return Teacher.find({ 'timetable.groupId': groupId })
      .populate({ path: 'userId' })
      .populate({ path: 'timetable.subjectId' })
      .populate({ path: 'timetable.planId', populate: { path: 'timetable.lectionId timetable.taskId', select: 'name text isTest isAllow' } })
      .then(teachers => {
        let subjects = [];
        teachers.forEach(teacher => {
          let filteredTimetable = teacher.timetable.filter(lesson => lesson.groupId.toString() === groupId.toString());
          let resSubjects = filteredTimetable.map(lesson => ({
            subject: {
              id: lesson.subjectId._id,
              name: lesson.subjectId.name,
              plan: lesson.planId,
              teacher: {
                id: teacher.userId._id,
                fullName: teacher.userId.fullName
              }
            }
          }));
          subjects = subjects.concat(resSubjects);
        });
        res(subjects);
      })
      .catch(err => rej(err));
  });
};

const Student = module.exports = mongoose.model('Student', StudentSchema);
// {
//   "_id" : ObjectId("5a160734fbc1c14dd81c2e0f"),
//   "mark" : "0000000000",
//   "taskId" : ObjectId("5a14cb44ae56241d50fc8e0f")
// }, 
// {
//   "_id" : ObjectId("5a160784fbc1c14dd81c2e10"),
//   "mark" : "AAAAAAAAAA",
//   "taskId" : ObjectId("5a14cb44ae56241d50fc8e0f")
// }, 
// {
//   "_id" : ObjectId("5a1607fcfbc1c14dd81c2e11"),
//   "mark" : "iiiiiiiiii",
//   "taskId" : ObjectId("5a14cb44ae56241d50fc8e0f")
// }, 
// {
//   "_id" : ObjectId("5a16cf7e308acc222cb03bef"),
//   "mark" : "e4b5d12122",
//   "taskId" : ObjectId("5a14cb44ae56241d50fc8e0f")
// }, 
// {
//   "_id" : ObjectId("5a16cff6308acc222cb03bf0"),
//   "mark" : "abc732iA11",
//   "taskId" : ObjectId("5a14cb44ae56241d50fc8e0f")
// }