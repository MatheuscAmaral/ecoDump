import type { FastifyInstance } from "fastify";
import { db } from "../db";
import type { clients } from "../generated/prisma";

export const clientRoutes = async (app: FastifyInstance) => {
  app.get("/", async (request, reply) => {
    try {
      const clients = await db.clients.findMany();
      return clients;
    } catch (error) {
      reply.status(500).send({ error: "Internal server error" });
    }
  });

  app.post("/", async (request, reply) => {
    try {
      const body = request.body as clients;
      console.log(body, 'body')
      const client = await db.clients.create({
        data: {
          name: body.name,
          phone: body.phone,
          cpf_cnpj: body.cpf_cnpj,
          address: body.address,
          adress_number: body.adress_number,
          postal_code: body.postal_code,
          status: body.status,
          created_by_user: body.created_by_user,
          updated_by_user: body.updated_by_user
        },
      });
      return client;
    } catch (error) {
      console.error(error, 'er')
      reply.status(500).send(error);
    }
  });

  app.put("/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: number };
      const body = request.body as clients;
      const client = await db.clients.update({
        where: {
          id: Number(id),
        },
        data: {
          name: body.name,
          phone: body.phone,
          cpf_cnpj: body.cpf_cnpj,
          address: body.address,
          adress_number: body.adress_number,
          postal_code: body.postal_code,
          status: body.status,
          created_by_user: body.created_by_user,
          updated_by_user: body.updated_by_user
        },
      });
      return client;
    } catch (error) {
      console.error(error, 'er')
      reply.status(500).send(error);
    }
  });
};
