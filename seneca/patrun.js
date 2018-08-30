const seneca = require('seneca')()

seneca.use('cmd:login', (msg, done) => {
    const { username, pass } = msg
    if (username === 'asd' && pass === '123') {
        return done(null, { code: 1000 })
    }
    return done(null, { code: 2100 })
})

const Promise = require('bluebird')

const act = Promise.promisify(seneca.act, { context: 'seneca' })

act({
    cmd: 'login',
    username: 'asd',
    pass: '123'
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})