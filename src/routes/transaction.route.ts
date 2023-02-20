import { FastifyInstance } from "fastify";
import { isHour, isDay, isMonth } from "../../types";

export async function transactionRoutes(fastify: FastifyInstance) {
  const { supabase } = fastify;
  fastify.get("/api/transaction", async (req, rep) => {
    const { query } = req;
    if (isHour(query)) {
      const { day, month, year } = query;
      const { data } = await supabase.rpc("count_snoc_by_hour", {
        year_param: year,
        month_param: month,
        day_param: day,
      });
      return {
        data,
      };
    }
    if (isDay(query)) {
      const { month, year } = query;
      const { data } = await supabase.rpc("count_snoc_by_day", {
        year_param: year,
        month_param: month,
      });
      return {
        data,
      };
    }
    if (isMonth(query)) {
      const { year } = query;
      const { data } = await supabase.rpc("count_snoc_by_month", {
        year_param: year,
      });
      return {
        data,
      };
    }
    return {};
  });
}
