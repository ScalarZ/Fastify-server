import { FastifyInstance } from "fastify";

export async function authRoute(fastify: FastifyInstance) {
  fastify.get("/api/login", async (req, rep) => {
    try {
      const access_token = await rep.jwtSign({ name: "foo" });
      rep.setCookie("access_token", access_token, {
        path: "/",
        secure: true,
        sameSite: true,
      });
      return {
        statusCode: 200,
        message: "logged in",
        cookie: `access_token=${access_token}; Path=/; Secure; SameSite=Strict`,
      };
    } catch (err) {
      return err;
    }
  });

  fastify.get("/api/logout", async (req, rep) => {
    try {
      rep
        .clearCookie("access_token")
        .code(200)
        .send({ statusCode: 200, message: "logged out" });
    } catch (err) {
      return err;
    }
  });
}
