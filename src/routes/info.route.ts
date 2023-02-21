import { FastifyInstance } from "fastify";

export async function infoRoutes(fastify: FastifyInstance) {
  fastify.get("/api/info", async (req, res) => {
    console.time("res");

    const { supabase } = fastify;
    const promises = [
      supabase.rpc("get_wilaya").select().single(),
      supabase.rpc("get_offer").select().single(),
      supabase.rpc("get_wilayas").select(),
      supabase.rpc("get_offers").select(),
      supabase.from("distinct_transactions").select().single(),
      supabase.from("distinct_pos").select().single(),
    ];

    try {
      const res = await Promise.all(promises);
      const data = res.map((value) => value.data);
      console.timeEnd("res");
      return {
        data,
      };
    } catch (err) {
      return { err };
    }
  });
}
