import { FastifyInstance } from "fastify";
import { isDay, isHour, isMonth, isRange } from "../types";

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
        const { data, error } = await supabase.rpc("get_pos", {
          l: max - min,
          start: min,
        });
        if (error) throw error;
        return data;
      }
      return [];
    } catch (err) {
      return err;
    }
  });

  fastify.get("/api/pos/:id", async (req, rep) => {
    const {
      params: { id },
    } = req as { params: { id: number } };
    const { query, url } = req;
    if (
      !(
        /^\/api\/pos\/\d+\?day=\d{1,2}&month=\d{1,2}&year=\d{4}$/.test(url) ||
        /^\/api\/pos\/\d+\?month=\d{1,2}&year=\d{4}$/.test(url) ||
        /^\/api\/pos\/\d+\?year=\d{4}$/.test(url) ||
        /^\/api\/pos\/\d+$/.test(url)
      )
    ) {
      return {
        error: "invalid url format",
        format:
          "<pos_code>?day=<1 or 2 numbers>&month=<1 or 2 numbers>&year=<4 numbers>",
      };
    }
    try {
      if (isHour(query)) {
        const { day, month, year } = query;
        const { data, error } = await supabase.rpc("count_pos_by_hour", {
          code_pdv_param: id,
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
        const { data, error } = await supabase.rpc("count_pos_by_day", {
          code_pdv_param: id,
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
        const { data, error } = await supabase.rpc("count_pos_by_month", {
          code_pdv_param: id,
          year_param: year,
        });
        if (error) throw error;
        return {
          data,
        };
      }

      const { data, error } = await supabase
        .from("pos")
        .select(
          "*, snoc(transaction_id, description, date_derniere_modification, type_transaction)"
        )
        .eq("code_pdv", id);

      if (error) throw error;
      return data;
    } catch (err) {
      return err;
    }
  });

  fastify.get("/api/pos/searching/:id", async (req, res) => {
    const {
      params: { id },
    } = req as { params: { id: number } };
    try {
      const { data, error } = await supabase.rpc("searching_pos", {
        pos_code: `%${id}%`,
      });
      if (error) throw error;
      return data;
    } catch (err) {
      return err;
    }
  });

  fastify.get("/api/pos/search/:id", async (req, res) => {
    const {
      params: { id },
    } = req as { params: { id: number } };
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
        const { data, error } = await supabase.rpc("search_pos", {
          l: max - min,
          start: min,
          pos_code: `%${id}%`,
        });
        if (error) throw error;
        return data;
      }
      return [];
    } catch (err) {
      return err;
    }
  });
}
