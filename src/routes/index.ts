import { FastifyInstance } from "fastify";
import { infoRoutes } from "./info.route";
import { transactionRoutes } from "./transaction.route";
import { posRoutes } from "./pos.route";

export function initRoutes(fastify: FastifyInstance) {
  fastify.register(infoRoutes);
  fastify.register(transactionRoutes);
  fastify.register(posRoutes);
}
