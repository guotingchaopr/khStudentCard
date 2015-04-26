var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  		header_title: '绵阳知行软件学院',
  		page_title:"基本信息",
  		form_title:'学生学籍卡',
  		info_title_1:"个人信息",
  	});
});

module.exports = router;
