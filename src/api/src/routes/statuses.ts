import { FastifyInstance } from "fastify";
import { db } from "../db";

type Status = {
  name: string;
  code: string;
  color: string;
};

export const statusRoutes = async (app: FastifyInstance) => {
  app.get("/:id", async (_request, reply) => {
    try {
      const { id } = _request.params as { id: number };

      const status = await db.status.findFirst({
        where: { id: Number(id) }
      });

      if (!status) {
        reply.status(404).send("Status not found");
        return;
      }

      return reply.send({
        id: status.id,
        name: status.name,
        code: status.code,
        color: status.color,
      });
    } catch (error) {
      reply.status(500).send(error);
    }
  });

  app.get("/", async (_request, reply) => {
    try {
      const statuses = await db.status.findMany();
      const statusList: Status[] = statuses.map((status) => ({
        id: status.id,
        name: status.name,
        code: status.code,
        color: status.color,
      }));
      return reply.send(statusList);
    } catch (error) {
      reply.status(500).send(error);
    }
  })
};
