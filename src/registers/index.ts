import { FastifyInstance } from "fastify";
import { initSupabase } from "./supabase.fastify";
import { initDotenv } from "./env.fastify";
import { initRedis } from "./redis.fastify";

export function initRegisters(fastify: FastifyInstance) {
  initDotenv();
  initSupabase(fastify);
  // initRedis(fastify);
}
