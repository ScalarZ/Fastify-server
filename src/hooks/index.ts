import { FastifyInstance } from "fastify";

export function initHooks(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (req, rep, done) => {
    if (req.method === "POST" && req.url === "/api/login") return done();
    await req.jwtVerify();
  });
}
