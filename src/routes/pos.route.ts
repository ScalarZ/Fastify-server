import { FastifyInstance } from "fastify";
import { isRange } from "../types";

export async function posRoutes(fastify: FastifyInstance) {
  const { supabase } = fastify;
  fastify.get("/api/pos", async (req, rep) => {
    const { query } = req;
    try {
      if (isRange(query)) {
        let { range } = query;
        if (!/\d+-\d+/.test(range))
          return { error: "invalid range", form: "?range=number-number" };

        const min = Math.min(
          Number(range.split("-")[0]),
          Number(range.split("-")[1])
        );
        const max = Math.max(
          Number(range.split("-")[0]),
          Number(range.split("-")[1])
        );
        const { data, error } = await supabase
          .from("pos")
          .select("*")
          .range(min, max);
        if (error) throw error;
        return data;
      }
    } catch (err) {
      return err;
    }
  });

  fastify.get("/api/pos/:id", async (req, rep) => {
    const {
      params: { id },
    } = req as { params: { id: number } };
    try {
      const { data, error } = await supabase
        .from("pos")
        .select(
          "*, snoc2(transaction_id, description, date_derniere_modification, type_transaction)"
        )
        .eq("code_pdv", id);
      if (error) throw error;
      return data;
    } catch (err) {
      return err;
    }
  });
}
