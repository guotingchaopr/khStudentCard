var express = require('express'),
	nodemailer = require('nodemailer');
var router = express.Router();
var transporter = nodemailer.createTransport("SMTP",{
	host: "smtp.qq.com", // 主机
    secureConnection: false, // 使用 SSL
    port: 465, // SMTP 端口
	auth:{
		user:'313526487@qq.com',
		pass:"!!??sohard"
	}
});

var sendMailOptions = {
	from:"313526487@qq.com",
	to:"guotingchaopr@gmail.com",
	subjuect:"hello",
	text:"hello world",
	html:"<b>Hello World</b>"	
};
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
	transporter.sendMail(sendMailOptions,function(err,resp){
		console.log(err||resp);
	});
	transporter.close();
//	transporter.sendMail(sendMailOptions,function(err,resp){
//		console.log(err||resp);
//	});
});




module.exports = router;
