import { FastifyInstance } from "fastify";
import { initSupabase } from "./supabase.fastify";
import { initDotenv } from "./env.fastify";
import { initCors } from "./cors.fastify";

export function initRegisters(fastify: FastifyInstance) {
  initDotenv();
  initSupabase(fastify);
  initCors(fastify);
}
