var express = require('express');
var email = require("emailjs");
var router = express.Router();
var server = email.server.connect({
   user:"313526487@qq.com",
   password:"gtc121561",
   port:"465",
   host:"smtp.qq.com",
   ssl:true
});



/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { 
  		header_title: '绵阳知行软件学院',
  		page_title:"基本信息",
  		form_title:'学生学籍卡',
  		info_title_1:"个人信息",
  	});
});

router.post("/save",function(req,res){
	res.json(req.body);
	server.send({
    text:"",
    attachment:[
      {data:req.body.html, alternative:true}
    ],
	  from:"guotingchao <313526487@qq.com>",
	  to:"guotingchaopr@gmail.com",//1275488689@qq.com
	  subject:"知行学院学籍信息_"+req.body.username
	},function(err,message){console.log(err||message);});
});




module.exports = router;
