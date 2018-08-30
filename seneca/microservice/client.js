const seneca = require('seneca')();
// 这里的math必须是和当前文件同一个目录,否则应该require
seneca.use('math').act('role:math,cmd:sum,left:1,right:2', console.log);