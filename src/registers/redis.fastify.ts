import Redis from "@fastify/redis";
import { FastifyInstance } from "fastify";

export function initRedis(fastify: FastifyInstance) {
  fastify
    .register(Redis, {
      host: "127.0.0.1",
      port: 3000,
      family: 4,
      connectTimeout: 20000,
    })
    .ready((err) => {
      if (err) throw err;
    });
}
