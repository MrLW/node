const seneca = require('seneca')();
seneca.use('basic').use('entity');
// 创建实体对象
const book = seneca.make('book');
book.title = 'Action in Seneca';
book.price = 9.99;

const book2 = seneca.make('book2');
book2.title = 'Action in Seneca2';
book2.price = 10.99;

// 发送 role:entity,cmd:save,name:book 消息
book.save$();
book2.save$() ;
book.list$(console.log)