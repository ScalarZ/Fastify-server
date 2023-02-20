import { FastifyInstance } from "fastify";

export async function infoRoutes(fastify: FastifyInstance) {
  fastify.get("/api/info", async (req, res) => {
    console.time("res");

    // const cashKey = "info";
    // const { redis } = fastify;
    // const cashedData = await redis.get(cashKey);
    // if (cashedData) {
    //   console.timeEnd("res");
    //   return JSON.parse(cashedData);
    // }

    const { supabase } = fastify;
    const promises = [
      supabase.rpc("get_wilayas").select().single(),
      supabase.rpc("get_offers").select().single(),
      supabase.from("distinct_transactions").select().single(),
      supabase.from("distinct_pos").select().single(),
    ];

    try {
      const res = await Promise.all(promises);
      const data = res.map((value) => value.data);
      // await redis.set(cashKey, JSON.stringify(data), "EX", 60 * 5);
      console.timeEnd("res");
      return {
        data,
      };
    } catch (err) {
      return { err };
    }
  });
}
