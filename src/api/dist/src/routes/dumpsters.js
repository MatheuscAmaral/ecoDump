"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpsters = void 0;
const db_1 = require("../../db");
const dumpsters = async (app) => {
    app.get("/", async (request, reply) => {
        try {
            const dumpsters = await db_1.db.dumpsters.findMany();
            reply.status(200).send(dumpsters);
        }
        catch (error) {
            reply.status(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.dumpsters = dumpsters;
