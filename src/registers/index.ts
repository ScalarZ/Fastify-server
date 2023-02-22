import { FastifyInstance } from "fastify";
import { initSupabase } from "./supabase.fastify";
import { initDotenv } from "./env.fastify";
import { initCors } from "./cors.fastify";
import { initCookie } from "./cookie.fastify";
import { initSession } from "./session.fastify";

export function initRegisters(fastify: FastifyInstance) {
  initDotenv();
  initSupabase(fastify);
  initCors(fastify);
  initCookie(fastify);
  initSession(fastify);
}
