import Fastify from "fastify";
import { routes } from "./routes/firstRoute";
import { initHooks } from "./hooks";
const server = Fastify();

initHooks(server);
server.register(routes);

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log("Listening on port: " + port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
