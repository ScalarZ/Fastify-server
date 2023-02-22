import "fastify";
import { FastifySupabase } from "fastify-supabase";
import { Hour, Day, Month, Range } from "./types.d";

declare module "fastify" {
  interface FastifyInstance {
    supabase: FastifySupabase;
    req: {
      pramas: {
        id: number;
      };
    };
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

export function isRange(query: any): query is Range {
  return "range" in query;
}
