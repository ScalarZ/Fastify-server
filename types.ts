import { FastifyRedis } from "@fastify/redis";
import "fastify";
import { FastifySupabase } from "fastify-supabase";

declare module "fastify" {
  interface FastifyInstance {
    supabase: FastifySupabase;
    redis: FastifyRedis;
  }
}
