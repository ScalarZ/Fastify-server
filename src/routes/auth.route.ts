import { FastifyInstance } from "fastify";
import { send } from "process";

export async function authRoute(fastify: FastifyInstance) {
  fastify.post("/api/login", async (req, rep) => {
    if (!req.body)
      rep.status(401).send({ statusCode: 401, message: "invalid credentials" });
    const { username, password } = req.body as {
      username: string;
      password: string;
    };
    if (username === "admin" && password === "admin") {
      try {
        const access_token = await rep.jwtSign({ username, type: "admin" });
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
        rep
          .status(401)
          .send({ statusCode: 503, message: "internal server error" });
      }
    } else {
      rep.status(401).send({ statusCode: 401, message: "invalid credentials" });
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
