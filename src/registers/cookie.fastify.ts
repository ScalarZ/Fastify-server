import { FastifyInstance } from "fastify";
import cookie from "@fastify/cookie";

export function initCookie(fastify: FastifyInstance) {
  fastify.register(cookie, { secret: "MySecret" });
}
