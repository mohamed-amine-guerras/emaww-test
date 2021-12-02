const fs =  require('fs');
const parser = require('xml2json');
const redisClient = require('../services/redis-client.js');

module.exports =  async function uplaodToRedis(filepath, print){
    try {
        const data = fs.readFileSync(filepath);
        const parsedData = JSON.parse(parser.toJson(data));
        const subdomains = JSON.stringify(parsedData.config.subdomains.subdomain);
        const cookies = parsedData.config.cookies.cookie;
        let newCookies = [];
        for(let i=0; i< cookies.length; i++){
            newCookies.push(`cookie:${cookies[i].name}:${cookies[i].host}`);
            newCookies.push(cookies[i]["$t"]);
        }
        let dataToUpload = ["subdomains", subdomains, ...newCookies];
        await redisClient.mSetAsync(dataToUpload);
        await redisClient.quit()
        if(print){
            for(let i = 0; i < dataToUpload.length; i++){
                if(i%2 == 0){
                    console.log(dataToUpload[i]);
                }
            }
        }

        return true;
        
    } catch (error) {
        console.error(error);
        await redisClient.quit();
        return false;

    }
}