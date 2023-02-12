import { FastifyInstance } from "fastify";
import { onRequestHooks } from "./onRequest";

export function initHooks(fastify: FastifyInstance) {
  onRequestHooks(fastify);
}
