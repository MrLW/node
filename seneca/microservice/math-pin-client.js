require('seneca')().add ('say:hello',function(msg,response){response(null,{text:"Hi!"})}) // 添加本地模式
.client({type : 'tcp',pin : 'role:math'}) // 发送到服务器
.act('role:math,cmd:sum,left:1,right:2',console.log)
.act('say:hello',console.log); 