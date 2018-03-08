module.exports = (role) => {
    return (req, res, next) => {
        if (req.user.role.indexOf(role) !== -1) {
            next();
        } else {
            res.status(403).end();
        }
    };
};