const uplaodToRedis = require('./controller/controller.js');

if(process.argv[2] && process.argv[2] === '-v' && process.argv[3]){
  uplaodToRedis(process.argv[3], true);
}else{
  if(process.argv[3]){
    uplaodToRedis(process.argv[3], false);
  }else{
    console.log("Please provide the xml file path.");
    process.exit();
  }
}

