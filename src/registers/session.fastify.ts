import { FastifyInstance } from "fastify";
import session from "@fastify/session";

export async function initSession(fastify: FastifyInstance) {
  fastify.register(session, {
    secret:
      (Math.random() * 36).toString(36) +
      (Math.random() * 36).toString(36) +
      (Math.random() * 36).toString(36),
    cookie: {
      secure: true,
      maxAge: 60,
    },
  });
}
