const router = require('express').Router();
const AuthoritiesController = require('./../controllers/AuthoritiesController');
const isAuthenticated = require('./../policies/isAuthenticated');
const isAdmin = require('./../policies/checkRole')('admin');
// Школы - группы
// Школы - предметы
// 

router.get('/authority/table/:x/:y', isAuthenticated, AuthoritiesController.tableData);

module.exports = router;