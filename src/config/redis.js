const redis=require("redis");

const redisClient= redis.createClient({
    username: 'default',
    password: "Up7G55qqUBjyNptJzBYrdxB2uvoyhpfx",
    socket: {
        host: 'redis-10955.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 10955
    }
});

module.exports=redisClient;