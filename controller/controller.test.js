const redisClient = require("../services/redis-client");
const uplaodToRedis = require("./controller");



test('uploading xml file to redis', async () => {

    redisClient.mSetAsync = jest.fn().mockReturnValue(true);

    redisClient.quit = jest.fn().mockReturnValue(true);
    let res = await uplaodToRedis("config.xml");
    expect(res).toEqual(true);
});