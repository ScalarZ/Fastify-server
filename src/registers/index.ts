import { FastifyInstance } from "fastify";
import { initSupabase } from "./supabase.fastify";
import { initDotenv } from "./env.fastify";
import { initCors } from "./cors.fastify";
import { initCookie } from "./cookie.fastify";
import { initHelmet } from "./helmet.fastify";
import { initJWT } from "./jwt.fastify";

export function initRegisters(fastify: FastifyInstance) {
  initDotenv();
  initCors(fastify);
  initHelmet(fastify);
  initCookie(fastify);
  initJWT(fastify);
  initSupabase(fastify);
}
