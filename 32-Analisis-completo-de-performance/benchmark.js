const autocannon = require('autocannon');
const { PassThrough } = require('stream');
const config = require('./config.json');

function run (url) {
    const buf = [];
    const outputStream = new PassThrough();
    const inst = autocannon({
        url,
        connection: 100,
        duration: 20
    });
    autocannon.track(inst, { outputStream });
    outputStream.on('data', data => buf.push(data));
    inst.on('done', function () {
        process.stdout.write(Buffer.concat(buf));
    });
}

run(`http://localhost:${config.PORT}/randoms`);
run(`http://localhost:${config.PORT}/info`);
