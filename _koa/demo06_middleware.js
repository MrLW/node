/**
 *  中间件:
 *      处在 HTTP Request 和 HTTP Response 中间,用来实现某种中间功能.app.use()用来加载中间件.
 *      多个中间件会形成一个栈结构（middle stack）,以"先进后出"（first-in-last-out）的顺序执行.
 */
const Koa = require('koa');
const app = new Koa();

const logger = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    console.log(next) ;
    next();
}
app.use(logger) ;
app.listen('3000');