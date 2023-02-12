import { FastifyInstance, RouteShorthandOptions } from "fastify";

const opts: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
  },
  attachValidation: true,
};

export async function routes(fastify: FastifyInstance, options: Object) {
  fastify.get("/api/first-route", (req, rep) => {
    return { message: "hello world!" };
  });

  fastify.post("/api/first-route/", opts, (req, rep) => {
    if (req.validationError) {
      return { message: "error!" };
    }
    if (req.body) {
      return { body: req.body };
    }
    return { body: "no body provided" };
  });

  fastify.get("/auth", (req, rep) => {
    return { message: "hello world!" };
  });
}
