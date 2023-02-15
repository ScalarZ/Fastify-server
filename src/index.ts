import Fastify from "fastify";
import { initRegisters } from "./registers";
import { initRoutes } from "./routes";

const server = Fastify();

initRegisters(server);
initRoutes(server);

server.get("/", (req, rep) => ({ message: "Hello from fastify" }));

const start = async () => {
  try {
    const PORT = (process.env.PORT || 3000) as number;
    await server.listen({ port: PORT || 3000 });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log("Listening on port: " + port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
