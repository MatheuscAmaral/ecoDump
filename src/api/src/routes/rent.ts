import { FastifyInstance } from "fastify";
import { db } from "../db";
import { createRentService } from "../services";
import moment from "moment";

export const rentRoutes = async (app: FastifyInstance) => {
  app.get("/", async (request, reply) => {
    try {
      const { status } = request.query as { status?: string }
      
      // Default to active (status_id: 2) if no status specified
      // If status is 'all', don't filter by status
      // Otherwise, filter by the specified status_id
      const whereClause = status ? 
        (status === 'all' ? {} : { status_id: parseInt(status) }) : 
        { status_id: 2 }

      const rent = await db.rent.findMany({
        where: whereClause,
        include: {
          client: true,
          dumpster: true,
          residue: true,
        },
      });

      const formattedRent = rent.map((rent) => ({
        ...rent,
        client: rent.client.name,
        dumpster: rent.dumpster.identifier_number,
        residue: rent.residue.name,
      }));
      return reply.send(formattedRent);
    } catch (error) {
      reply.status(500).send(error);
    }
  });
  app.post("/", async (request, reply) => {
    try {
      const data = request.body as any;
      const response = await createRentService(data);

      return reply.send(response.rent);
    } catch (error) {
      console.error(error, "error2");
      reply.status(500).send(error);
    }
  });
  app.get("/create", async (_request, reply) => {
    try {
      const clients = await db.clients.findMany();
      const dumpsters = await db.dumpsters.findMany();
      const residues = await db.residues.findMany();

      return reply.send({ clients, dumpsters, residues });
    } catch (error) {
      reply.status(500).send(error);
    }
  });
  app.put("/:id", async (_request, reply) => {
    const { id } = _request.params as { id: number };
    try {
      const data = _request.body as {
        status_id?: number;
        delivery_date?: string;
      };
      const response = await db.rent.update({
        where: {
          id: Number(id),
        },
        data: {
          ...(data.status_id && {
            status_id: Number(data.status_id),
          }),
          ...(data.delivery_date && {
            delivery_date: moment(data.delivery_date).toDate(),
          }),
        },
      });

      return reply.send(response);
    } catch (error) {
      reply.status(500).send(error);
    }
  });
};
