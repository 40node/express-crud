// モデル情報の読み込み
const models = require('../models');

// Express ルーターのおまじない
var express = require('express');
var router = express.Router();

// データを10件読み込んで、Web画面をレンダリングする
router.get('/', function(req, res) {
  models.User.findAll({
    order: [
      ['id', 'desc']
    ],
    limit: 10
  }).then(function(users) {
    res.render('users', {
      title: 'Node.js/Express入門: CRUD サンプル',
      users: users
    });
  });  
});

// 新規追加ユーザーの作成
router.post('/create', function(req, res) {
  models.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }).then(function() {
    res.redirect('/users');
  });
});

// 対象ID のユーザー情報を更新
router.post('/update/:id', function(req, res) {
  models.User.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }, {
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect('/users');
  });
});

// 対象ID のユーザー情報を削除
router.get('/destroy/:id', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect('/users');
  });
});

// 外部から利用する場合のおまじない
module.exports = router;
