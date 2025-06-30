"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dumpsters_1 = require("./routes/dumpsters");
const app = (0, fastify_1.default)({ logger: true });
app.register(dumpsters_1.dumpsters, { prefix: '/api/dumpsters' });
const PORT = process.env.PORT || 3000;
app.listen({ port: Number(PORT), host: '0.0.0.0' })
    .then(() => console.log(`Servidor rodando em http://0.0.0.0:${PORT}`))
    .catch((err) => {
    console.error('Erro ao iniciar servidor:', err);
    process.exit(1);
});
