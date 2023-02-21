import { FastifyInstance } from "fastify";
import { isHour, isDay, isMonth, isRange } from "../types";

export async function transactionRoutes(fastify: FastifyInstance) {
  const { supabase } = fastify;
  fastify.get("/api/transaction", async (req, rep) => {
    const { query } = req;
    try {
      if (isHour(query)) {
        const { day, month, year } = query;
        const { data, error } = await supabase.rpc("count_snoc_by_hour", {
          year_param: year,
          month_param: month,
          day_param: day,
        });
        if (error) throw error;
        return {
          data,
        };
      }
      if (isDay(query)) {
        const { month, year } = query;
        const { data, error } = await supabase.rpc("count_snoc_by_day", {
          year_param: year,
          month_param: month,
        });
        if (error) throw error;
        return {
          data,
        };
      }
      if (isMonth(query)) {
        const { year } = query;
        const { data, error } = await supabase.rpc("count_snoc_by_month", {
          year_param: year,
        });
        if (error) throw error;
        return {
          data,
        };
      }
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
          .from("snoc2")
          .select(
            "transaction_id, description, date_derniere_modification, type_transaction, code_pdv"
          )
          .range(min, max);
        if (error) throw error;
        return data;
      }
      return query;
    } catch (err) {
      return err;
    }
  });

  fastify.get("/api/transaction/:id", async (req, rep) => {
    const {
      params: { id },
    } = req as { params: { id: number } };
    try {
      const { data, error } = await supabase
        .from("snoc2")
        .select("*")
        .eq("transaction_id", id);
      if (error) throw error;
      return data;
    } catch (err) {
      return err;
    }
  });
}
