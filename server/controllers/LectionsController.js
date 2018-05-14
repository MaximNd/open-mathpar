const Lection = require('./../models/lection');

module.exports = {
    getLectionById(req, res) {

    },

    getLectionByTeacherId(req, res) {
        Lection.find({ teacherId: req.params.id })
            .then(lections => res.send(lections))
            .catch(err => console.log(err));
    },

    createLection(req, res) {
        const { name, text, subjectId } = req.body;

        req.user.clients
            .then(clients => {
                const client = clients.find(client => client.clientRole === 'teacher').client;
                const lection = new Lection({
                    teacherId: client._id,
                    schoolId: client.schoolId._id,
                    subjectId,
                    name,
                    text
                });
                
                lection.save(err => {
                    if (err) {
                        console.log(err);
                        res.status(500, { message: 'error' }).end();
                    } else {
                        res.status(200, { message: 'ok' }).end();
                    }
                });
            });
    },

    updateLection(req, res) {

    },

    deleteLection(req, res) {

    }
};