import { createClient } from "redis";
// import promis

class RedisClient {
    constructor() {
        this.client = createClient();
        this.connected = false;

        this.client.on('error', (err) => {
            console.log('Redis client error', err);
        });

        this.client.on('connect', () => {
            this.connected = true;
        });

        // this.asyncSetX = promisify(this.client.setex).bind(this.client)
        // this.asyncGetX = promisify
    }

    isAlive() {
        return this.connected;
    }

    async set(key, value, expiry) {
        return await this.client.setex(key, expiry, value)
    }

    async get(key) {
        const value = this.client.get(key);
        return value;
    }

    del(key) {
        this.client.del(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;