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

const app = Fastify({
  logger: true,
  trustProxy: true
});

app.register(dumpsterRoutes, { prefix: "/api/dumpsters" });
app.register(userRoutes, { prefix: "/api/users" });
app.register(residueRoutes, { prefix: "/api/residues" });
app.register(operationRoutes, { prefix: "/api/operations" });
app.register(rentRoutes, { prefix: "/api/rents" });
app.register(statusRoutes, { prefix: "/api/statuses" });
app.register(clientRoutes, { prefix: "/api/clients" });
app.register(locationRoutes, { prefix: "/api/locations" });

app.register(require("@fastify/cors"), {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
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
