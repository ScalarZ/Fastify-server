import { FastifyInstance } from "fastify";
import jwt from "@fastify/jwt";

export async function initJWT(fastify: FastifyInstance) {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET!,
    cookie: {
      cookieName: "access_token",
      signed: true,
    },
  });
}
