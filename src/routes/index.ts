import { FastifyInstance } from "fastify";
import { infoRoutes } from "./info.route";
import { transactionRoutes } from "./transaction.route";

export function initRoutes(fastify: FastifyInstance) {
  fastify.register(infoRoutes);
  fastify.register(transactionRoutes);
}
