const models = require('../models');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  models.User.findAll({
    limit: 10
  }).then(function(users) {
    res.render('users', {
      title: 'Node.js/Express入門: CRUD サンプル',
      users: users
    });
  });  
});

router.post('/create', function(req, res) {
  models.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }).then(function() {
    res.redirect('/users');
  });
});

module.exports = router;
