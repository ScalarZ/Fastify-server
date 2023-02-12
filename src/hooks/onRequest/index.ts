import { FastifyInstance } from "fastify";

export function onRequestHooks(fastify: FastifyInstance) {
  fastify.addHook("onRequest", (req, rep, done) => {
    if (
      req.method === "GET" &&
      req.raw.url === "/auth" &&
      req.headers.authorization
    ) {
      const authKey = req.headers.authorization.replace("Bearer", "").trim();
      if (!authKey) return rep.send({ message: "Auth key must be provided" });
      if (authKey !== "secret")
        return rep.send({ message: "Invalid Auth key" });
      done();
    } else {
      done();
    }
  });
}
