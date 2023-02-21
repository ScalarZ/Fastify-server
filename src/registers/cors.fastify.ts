import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";

export function initCors(fastify: FastifyInstance) {
  fastify.register(cors);
}
