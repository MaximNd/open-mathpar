//@ts-check
const User = require('./../models/user');
const Director = require('../models/director');
const Authority = require('../models/authority');
const School = require('../models/school');
const path = require('path');
const uniqid = require('uniqid');

const { decodeBase64Image, saveImage, jwtSignUser } = require('./../helpers/helpers');

// function getClientByRole(user) {
//     const rolesMap = {
//         'student': Student,
//         'teacher': Teacher,
//         'headTeacher': HeadTeacher,
//         'director': Director,
//         'admin': Authority
//     }
//     return user.role.map(role => rolesMap[role].find({ userId: user.id }).then(client => client));
// }

module.exports = {
    async login(req, res) {
            const { user } = req;
            user.clients.then(clients => {
                const token = jwtSignUser(user);
                // TODO delete maybe
                res.append('access-control-allow-headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
                res.append('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.append('access-control-expose-headers', 'Authorization');

                res.append('authorization', `Bearer ${token}`);
                res.send({
                    user,
                    clients
                });
            });
    },
    async register(req, res) {
        const directorData = req.body.director;
        const schoolData = req.body.school;
        const authorityData = req.body.authority || undefined;
        const imageName = uniqid() + path.extname(path.basename(directorData.user.image.name));
    
        // await saveImage(decodeBase64Image(directorData.user.image.data), imageName);
        await saveImage(directorData.user.image.data, imageName);

        directorData.user.image = imageName;
    
        // Create User for director
        const directorUser = new User(directorData.user);
        await directorUser.save();

        // Create director client for User
        const director = new Director({
            userId: directorUser.id,
            isMainDirector: true,
            access: false
        });

        await director.save();

        // Create Authority if not exist
        if (typeof schoolData.authorityId === 'undefined' && typeof authorityData !== 'undefined') {
            const authorityImageName = uniqid() + path.extname(path.basename(authorityData.user.image.name));
            // await saveImage(decodeBase64Image(authorityData.user.image.data), authorityImageName);
            await saveImage(authorityData.user.image.data, authorityImageName);
            authorityData.user.image = authorityImageName;

            // Create User for authority
            const authorityUser = new User(authorityData.user);
            await authorityUser.save();

            // Create authority client for User
            const authority = new Authority({
                userId: authorityUser.id,
                company: authorityData.company
            });

            await authority.save();

            // set authority ID to school FK(authorityId)
            schoolData.authorityId = authorityUser.id;
        }


        const school = new School({
            name: schoolData.name,
            number: schoolData.number,
            isPhilial: schoolData.isPhilial,
            country: schoolData.country,
            region: schoolData.region,
            city: schoolData.city,
            district: schoolData.district,
            address: schoolData.address,
            authorityId: schoolData.authorityId,
            directorId: directorUser.id
        });

        school.save()
            .then(async data => {
                director.schoolId = school.id;
                await director.save();
                return res.send({
                    directorUser,
                    director,
                    school
                });
            });
    }
};