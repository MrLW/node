/**
 * node sales-tax.js --seneca.log.quiet 只打印自己输出.
 */
var seneca = require('seneca')()
seneca.add({ cmd: 'salestax' }, function (args, callback) {
    var rate = 0.23
    var total = args.net * (1 + rate)
    callback(null, { total: total })
})

seneca.act({ cmd: 'salestax', net: 100 }, function (err, result) {
    if (err) return console.error(err)
    console.log(result.total)
})