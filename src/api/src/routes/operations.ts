import { FastifyInstance } from 'fastify'
import { db } from '../db'
import { operations } from '../generated/prisma'
import moment from 'moment'

export const operationRoutes = async (app: FastifyInstance) => {
  app.get('/', async (request, reply) => {
    try {
      const { status } = request.query as { status?: string }
      
      // Default to active (status_id: 2) if no status specified
      // If status is 'all', don't filter by status
      // Otherwise, filter by the specified status_id
      const whereClause = status ? 
        (status === 'all' ? {} : { status_id: parseInt(status) }) : 
        { status_id: 2 }
      
      const operations = await db.operations.findMany({
        where: whereClause,
        include: {
          location: true,
          rent: true
        },
      })
      return reply.send(operations)
    } catch (error) {
      reply.status(500).send(error)
    }
  });

  app.post('/', async (request, reply) => {
    try {
      const data = request.body as operations
      const operation = await db.operations.create({ data })
      return reply.send(operation)
    } catch (error) {
      reply.status(500).send(error)
    }
  });

  app.put("/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const data = request.body as any;
        const operation = await db.operations.update({
          where: { id: parseInt(id) },
          data: {
            ...data,
            date: moment(data.date).toDate()
          },
        });
        reply.send(operation);
      } catch (error) {
        reply.status(500).send(error);
      }
    });
}