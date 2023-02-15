import { FastifyInstance } from "fastify";
import Supabase from "fastify-supabase";

export function initSupabase(fastify: FastifyInstance) {
  fastify.register(Supabase, {
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_KEY!,
  });
}
