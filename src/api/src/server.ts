import Fastify from "fastify";
import dotenv from "dotenv";
import {
  clientRoutes,
  dumpsterRoutes,
  locationRoutes,
  operationRoutes,
  rentRoutes,
  residueRoutes,
  statusRoutes,
  userRoutes,
} from "./routes";

dotenv.config();

// Crie a instância do Fastify com opções adequadas para produção
const app = Fastify({
  logger: true,
  trustProxy: true
});

// Registre as rotas sem o prefixo /api, pois o Vercel já vai rotear para /api
app.register(dumpsterRoutes, { prefix: "/dumpsters" });
app.register(userRoutes, { prefix: "/users" });
app.register(residueRoutes, { prefix: "/residues" });
app.register(operationRoutes, { prefix: "/operations" });
app.register(rentRoutes, { prefix: "/rents" });
app.register(statusRoutes, { prefix: "/statuses" });
app.register(clientRoutes, { prefix: "/clients" });
app.register(locationRoutes, { prefix: "/locations" });

app.register(require("@fastify/cors"), {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

// Adicione uma rota de teste para verificar se a API está funcionando
app.get('/', async () => {
  return { status: 'API is running' };
});

// Apenas inicie o servidor se não estiver em ambiente de produção (Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = Number(process.env.PORT) || 3002;
  app
    .listen({ port: PORT, host: "0.0.0.0" })
    .then(() => console.log(`Servidor rodando em http://0.0.0.0:${PORT}`))
    .catch((err) => {
      console.error("Erro ao iniciar servidor:", err);
      process.exit(1);
    });
}

// Necessário para o Vercel
export default async (req: any, res: any) => {
  await app.ready();
  app.server.emit('request', req, res);
};
