import * as redis from 'redis';
import {promisify} from 'util';
const client = redis.createClient(process.env.REDIS_URL);

export default {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client),
  mSetAsync: promisify(client.mset).bind(client),
  quit: promisify(client.quit).bind(client)
};