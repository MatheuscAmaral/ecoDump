import { FastifyInstance } from "fastify";
import { db } from "../db";
import { residues } from "../generated/prisma";

export const residueRoutes = async (app: FastifyInstance) => {
  app.get("/", async (_request, reply) => {
    try {
      const residues = await db.residues.findMany();
      return reply.send(residues);
    } catch (error) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.post("/", async (request, reply) => {
    try {
      const data = request.body as residues;
      const residue = await db.residues.create({ data });
      return reply.send(residue);
    } catch (error) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.put("/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const data = request.body as residues;
      const residue = await db.residues.update({
        where: { id: Number(id) },
        data,
      });
      return reply.send(residue); 
    } catch (error) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  })
}