const redis=require("redis");

const redisClient= redis.createClient({
    username: 'default',
    password: "BKaJMi4Vc5vfxbLqmkjepbs0ciyvUVak",
    socket: {
        host: 'redis-18769.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 18769
    }
});

module.exports=redisClient;