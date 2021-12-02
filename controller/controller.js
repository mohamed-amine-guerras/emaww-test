const fs =  require('fs');
const parser = require('xml2json');
const redisClient = require('../services/redis-client.js');

module.exports =  async function uplaodToRedis(filepath){
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
        await redisClient.mSetAsync(["subdomains", subdomains, ...newCookies]);
        await redisClient.quit()

        return true;
        
    } catch (error) {
        console.error(error);
        await redisClient.quit();
        return false;

    }
}