const User = require('./../models/user');

module.exports = {
    getUserById(req, res) {
        User.findById(req.params.id)
            .then(user => {
                user.clients
                    .then(clients => res.send({ user, clients }));
            });
    }
};