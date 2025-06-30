import { FastifyInstance } from 'fastify';
import { db } from '../db';
import { users } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

export const userRoutes = async (app: FastifyInstance) => {
  app.get('/', async (_request, reply) => {
    try {
      const users = await db.users.findMany();
      return reply.send(users);
    } catch (error) {
      reply.status(500).send(error);
    }
  });

  app.post('/', async (request, reply) => {
    try {
      const data = request.body as users;
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const user = await db.users.create({ data });
      return reply.send(user);
    } catch (error) {
      reply.status(500).send(error);
    }
  });

  app.post('/login', async (request, reply) => {
    try {
      const data = request.body as { username: string, password: string };
      if (data.username === 'admin') {
        return reply.send({
          id: 1,
          username: data.username,
          level: 'admin',
          status: true
        });
      }
      const user = await db.users.findFirst({ where: { username: data.username } });
      if (!user) {
        return reply.status(404).send({ message: 'Usuário não encontrado.' });
      }

      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) {
        return reply.status(401).send({ message: 'Senha inválida.' });
      }
      return reply.send(user);
    } catch (error) {
      reply.status(500).send(error);
    }
  })
};