const Methodist = require('../models/methodist');
const User = require('../models/user');
const { findShoollId, findUniversityId } = require('../helpers/helpers');

module.exports = {
    getMethodistByID(req, res) {
        User.findById(req.params.id)
            .then(user => {
                user.clients
                    .then(clients => {
                        if (clients.find(client => client.clientRole === 'methodist')) {
                            res.send({
                                user,
                                clients
                            });
                        } else {
                            res.status(500).json({ message: 'No such client' });
                        }
                    });
            });
    },

    async createMethodist(req, res) {
        try {
            const user = req.body.user;
            const methodistUser = new User(user);
            await methodistUser.save();

            req.user.clients
                .then(async clients => {
                    try {
                        const methodist = new Methodist({
                            userId: methodistUser._id,
                            universityId: findUniversityId(clients, 'dean')
                        });
                        await methodist.save();

                        res.status(200, { message: 'ok' }).end();
                    } catch (error) {
                        console.log(error);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    },

    updateMethodist(req, res) {
        
    },

    deleteMethodist(req, res) {
        
    }
};