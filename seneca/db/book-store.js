module.exports = function (options) {
    // 从数据库查询msgId的书
    this.add('role:store,get:book', function (msg, response) {
        this.make('book').load$(msg.id, response);
    })
    // 添加
    this.add('role:store,add:book', function (msg, response) {
        this.make('book').data$(msg.data).save$(response);
    })
    // 购买
    this.add('role:store,cmd:purchase', function (msg, response) {
        this.make('book').load$(msg.id, function (err, book) {
            if (err) return response(err);
            this.make('purchase').data$({
                when: Date.now(),
                bookId: book.id,
                title: book.title,
                price: book.price
            }).save$(function (err, purchase) {
                if (err) return response(err);
                // 打印出purchase 
                this.act('role:store,info:purchase', {
                    purchase: purchase
                });
                response(null, purchase);
            })
        })
    });

    this.add('role:store,info:purchase', function (msg, response) {
        this.log.info('purchase', msg.purchase);
        response();
    })
}