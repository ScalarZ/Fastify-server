import { FastifyInstance } from "fastify";
import helmet from "@fastify/helmet";

export function initHelmet(fastify: FastifyInstance) {
  fastify.register(helmet);
}
