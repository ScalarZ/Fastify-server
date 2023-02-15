import { FastifyInstance, HookHandlerDoneFunction } from "fastify";
import { config } from "dotenv";
import fp from "fastify-plugin";

function fastifyDotenv(
  fastify: FastifyInstance,
  options: Record<string, string | number | null>,
  done: HookHandlerDoneFunction
) {
  fastify.decorate("fastify-dotenv", () => {
    console.log("hello world");
    config();
  });
  done();
}

export default fp(fastifyDotenv, {
  name: "fastify-dotenv",
});
