const Authority = require('./../models/authority');
const School = require('./../models/school');
const Subject = require('./../models/subject');
const Student = require('./../models/student');
const Group = require('./../models/group');

const { calculateAVGFourNumbersBySRMark, calculateAVGKRMarks } = require('./../helpers/helpers');

const conformity = {
    schools: School,
    subjects: Subject,
    students: Student,
    groups: Group
};

const mapOfVariations = {
    countries: {
        schools: function() {
            return new Promise((res, rej) => {
                return School.find({})
                    .then(schools => {
                        let promises = [];
                        schools.forEach(school => promises.push(school.students(school._id)));
                        
                        Promise.all(promises)
                            .then(students => {
                                let schoolsWithMarks = schools.map((school, index) => {
                                    let schoolAVGMarks = school.avgMarks(
                                        students[index].students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll),
                                        students[index].students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllKR)
                                    );
            
                                    let schoolAVGDispersion = school.avgDispersion(
                                        students[index].students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr),
                                        students[index].students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgDispercion.allKr)
                                    );
                                    return { school, schoolAVGMarks, schoolAVGDispersion};
                                    //res({schoolAVGMarks, schoolAVGDispersion});
                                });
                                let groupedSchools = schoolsWithMarks.reduce((grouped, school) => {
                                    if (!grouped[school.school.country]) {
                                        grouped[school.school.country] = [];
                                    }
                                    grouped[school.school.country].push(school);
                                    return grouped;
                                }, {});
                                res(groupedSchools);
                            });
                    })
                    .catch(err => console.log(err)); 
            });
            // return {
            //     avgSRAll: '',
            //     avgKR: '',
            //     avgSRDispersion: '',
            //     avgKRDispersion: ''
            // };
        },
        subjects: function() {
            // Берем все школы, берем всех учинеков, берем у них средние оценки по предмету, групируем по стране, у каждой страны свой список предметов с оценками
            return new Promise((res, rej) => {
                return School.find({}) 
                    .then(schools => {
                        let promises = [];
                        schools.forEach(school => promises.push(school.students(school._id)));
                        
                        Promise.all(promises)
                            .then(students => {
                                let schoolsWithMarks = schools.map((school, index) => {
                                    let avgAllSRBySubject = students[index].students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSRBySubject);
                                    let avgAllKRBySubject = students[index].students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.kr);
                                    
                                    return { school, avgAllSRBySubject, avgAllKRBySubject};
                                    //res({schoolAVGMarks, schoolAVGDispersion});
                                });
                                let schoolAVGMarksBySubject = schoolsWithMarks.map(school => {
                                    // --------------------- SR -----------------
                                    let SRMarksBySubjectArr = school.avgAllSRBySubject.reduce((subjectsMarks, studentMarksBySubjects) => {
                                        for (let subjectId in studentMarksBySubjects) {
                                            if (!subjectsMarks[subjectId]) {
                                                subjectsMarks[subjectId] = {
                                                    first: [],
                                                    last: [],
                                                    avgAll: []
                                                };
                                            }
                                            subjectsMarks[subjectId].first.push(studentMarksBySubjects[subjectId].first);
                                            subjectsMarks[subjectId].last.push(studentMarksBySubjects[subjectId].last);
                                            subjectsMarks[subjectId].avgAll.push(studentMarksBySubjects[subjectId].avgAll);
                                        }
                                        return subjectsMarks;
                                    }, {});
                                    let SRMarksBySubject = {};
                                    for (let subjectId in SRMarksBySubjectArr) {
                                        SRMarksBySubject[subjectId] = {
                                            first: calculateAVGFourNumbersBySRMark(SRMarksBySubjectArr[subjectId].first),
                                            last: calculateAVGFourNumbersBySRMark(SRMarksBySubjectArr[subjectId].last),
                                            avgAll: calculateAVGFourNumbersBySRMark(SRMarksBySubjectArr[subjectId].avgAll)
                                        };
                                    }
                                    // --------------------- KR -----------------
                                    let KRMarksBySubjectArr = school.avgAllKRBySubject.reduce((subjectsMarks, studentMarksBySubjects) => {
                                        for (let subjectId in studentMarksBySubjects) {
                                            if(!subjectsMarks[subjectId]) {
                                                subjectsMarks[subjectId] = [];
                                            }
                                            subjectsMarks[subjectId].push(studentMarksBySubjects[subjectId]);
                                        }
                                        return subjectsMarks;
                                    }, {});
                                    let KRMarksBySubject = {};
                                    for (let subjectId in KRMarksBySubjectArr) {
                                        KRMarksBySubject[subjectId] = calculateAVGKRMarks(KRMarksBySubjectArr[subjectId]);
                                    }

                                    return { school: school.school, SRMarksBySubject, KRMarksBySubject};
                                });
                                let groupedSchools = schoolAVGMarksBySubject.reduce((grouped, school) => {
                                    if (!grouped[school.school.country]) {
                                        grouped[school.school.country] = [];
                                    }
                                    grouped[school.school.country].push(school);
                                    return grouped;
                                }, {});
                                res(groupedSchools);
                            });
                    })
                    .catch(err => console.log(err));
            });
            return {
                avgSRAll: '',
                avgSRFirst: '',
                avgSRLast: '',
                avgKR: ''
            };
        }
    },
    schools: {
        subjects: function() {
            return new Promise((res, rej) => {
                return School.find({}) 
                .then(schools => {
                    let promises = [];
                    schools.forEach(school => promises.push(school.students(school._id)));
                    
                    Promise.all(promises)
                        .then(students => {
                            let schoolsWithMarks = schools.map((school, index) => {
                                let avgAllSRBySubject = students[index].students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSRBySubject);
                                let avgAllKRBySubject = students[index].students.map(student => student.clients.find(client => client.clientRole === 'student').client.avgMarks.kr);

                                return { school, avgAllSRBySubject, avgAllKRBySubject};
                                //res({schoolAVGMarks, schoolAVGDispersion});
                            });
                            let schoolAVGMarksBySubject = schoolsWithMarks.map(school => {
                                // --------------------- SR -----------------
                                let SRMarksBySubjectArr = school.avgAllSRBySubject.reduce((subjectsMarks, studentMarksBySubjects) => {
                                    for (let subjectId in studentMarksBySubjects) {
                                        if (!subjectsMarks[subjectId]) {
                                            subjectsMarks[subjectId] = {
                                                first: [],
                                                last: [],
                                                avgAll: []
                                            };
                                        }
                                        subjectsMarks[subjectId].first.push(studentMarksBySubjects[subjectId].first);
                                        subjectsMarks[subjectId].last.push(studentMarksBySubjects[subjectId].last);
                                        subjectsMarks[subjectId].avgAll.push(studentMarksBySubjects[subjectId].avgAll);
                                    }
                                    return subjectsMarks;
                                }, {});
                                let SRMarksBySubject = {};
                                for (let subjectId in SRMarksBySubjectArr) {
                                    SRMarksBySubject[subjectId] = {
                                        first: calculateAVGFourNumbersBySRMark(SRMarksBySubjectArr[subjectId].first),
                                        last: calculateAVGFourNumbersBySRMark(SRMarksBySubjectArr[subjectId].last),
                                        avgAll: calculateAVGFourNumbersBySRMark(SRMarksBySubjectArr[subjectId].avgAll)
                                    };
                                }
                                // --------------------- KR -----------------
                                let KRMarksBySubjectArr = school.avgAllKRBySubject.reduce((subjectsMarks, studentMarksBySubjects) => {
                                    for (let subjectId in studentMarksBySubjects) {
                                        if(!subjectsMarks[subjectId]) {
                                            subjectsMarks[subjectId] = [];
                                        }
                                        subjectsMarks[subjectId].push(studentMarksBySubjects[subjectId]);
                                    }
                                    return subjectsMarks;
                                }, {});
                                let KRMarksBySubject = {};
                                for (let subjectId in KRMarksBySubjectArr) {
                                    KRMarksBySubject[subjectId] = calculateAVGKRMarks(KRMarksBySubjectArr[subjectId]);
                                }

                                return { school: school.school, SRMarksBySubject, KRMarksBySubject};
                            });
                            res(schoolsWithMarks);
                        });
                })
                .catch(err => console.log(err));
            });
            // return {
            //     avgSRAll: '',
            //     avgSRFirst: '',
            //     avgSRLast: '',
            //     avgKR: '',
            //     avgSRDispersion: '',
            //     avgKRDispersion: ''
            // };
        }
        // ,
        // classes: function() {
        //     return new Promise((res, rej) => {
        //         return 
        //     });
        //     return {
        //         avgSRAll: '',
        //         avgSRFirst: '',
        //         avgSRLast: '',
        //         avgKR: '',
        //         avgSRDispersion: '',
        //         avgKRDispersion: ''
        //     }
        // }
    },
    // groups: {
    //     subjects: {
    //         avgSRAll: '',
    //         avgSRFirst: '',
    //         avgSRLast: '',
    //         avgKR: '',
    //         avgSRDispersion: '',
    //         avgKRDispersion: ''
    //     }
    // },
    // classes: {
    //     subjects: {
    //         avgSRAll: '',
    //         avgSRFirst: '',
    //         avgSRLast: '',
    //         avgKR: '',
    //         avgSRDispersion: '',
    //         avgKRDispersion: ''
    //     }
    // },
    students: {
        subjects: function() {
            return new Promise((res, rej) => {
                return Student.find().populate({ path: 'gradeBook.taskId', select: 'subjectId isTest' })
                    .then(students => res(students));
            });
            return {
                avgSRAll: '',
                avgSRFirst: '',
                avgSRLast: '',
                avgKR: '',
                avgSRDispersion: '',
                avgKRDispersion: ''
            };
        }
    }
};


module.exports = {
    tableData(req, res) {
        let x = req.params.x;
        let y = req.params.y;
       
        mapOfVariations[x][y]().then(result => res.send(result))
        
        // res.send({x,y});
    }
};