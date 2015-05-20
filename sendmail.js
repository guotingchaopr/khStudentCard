var email = require("./node_modules/emailjs/email");
var server = email.server.connect({
   user:"313526487@qq.com",
   password:"gtc121561",
   port:"465",
   host:"smtp.qq.com",
   ssl:true
});


server.send({
  text : "i hope this works",
  from:"guotingchao <313526487@qq.com>",
  to:"guotingchaopr@gmail.com",
  subject:"hello"
},function(err,message){console.log(err||message);});
