const uplaodToRedis = require('./controller/controller.js');

console.log(process.argv);

uplaodToRedis('./config.xml', true);
