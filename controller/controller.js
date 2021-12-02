import fs from 'fs';
import * as parser from 'xml2json';
import redisClient from '../services/redis-client.js';

export default async function uplaodToRedis(filepath){
    try {
        const data = fs.readFileSync('config.xml');
        const parsedData = JSON.parse(parser.toJson(data));
        const subdomains = JSON.stringify(parsedData.config.subdomains.subdomain);
        const cookies = parsedData.config.cookies.cookie;
        parsedData.config.cookies.cookie.forEach((c) => {
          cookies[`cookie:${c.name}:${c.host}`] = c["$t"];
        });
        let newCookies = [];
        for(let i=0; i< cookies.length; i++){
            newCookies.push(`cookie:${cookies[i].name}:${cookies[i].host}`);
            newCookies.push(cookies[i]["$t"]);
        }
        await redisClient.mSetAsync(["subdomains", subdomains, ...newCookies]);
        
        await redisClient.quit()
        
    } catch (error) {
        console.error(error);
        await redisClient.quit();

    }
}