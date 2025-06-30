import type { FastifyInstance } from "fastify";
import { db } from "../db";
import type { locations } from "../generated/prisma";

export const locationRoutes = async (app: FastifyInstance) => {
  app.get("/", async () => {
    const locations = await db.locations.findMany();
    return locations;
  });

  app.post("/", async (request, reply) => {
    try {
      const data = request.body as locations;
      const location = await db.locations.create({ data });

      return location;
    } catch (error) {
      throw error;
    }
  });

  app.put("/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: number };
      const data = request.body as locations;
      const location = await db.locations.update({
        where: { id: Number(id) },
        data,
      });

      return location;
    } catch (error) {
      throw error;
    }
  });
};
