import "fastify";
import { FastifyRedis } from "@fastify/redis";
import { FastifySupabase } from "fastify-supabase";
import { Hour, Day, Month } from "./type";

declare module "fastify" {
  interface FastifyInstance {
    supabase: FastifySupabase;
    redis: FastifyRedis;
  }
}

export function isHour(query: any): query is Hour {
  return "day" in query && "month" in query && "year" in query;
}

export function isDay(query: any): query is Day {
  return "month" in query && "year" in query;
}

export function isMonth(query: any): query is Month {
  return "year" in query;
}
