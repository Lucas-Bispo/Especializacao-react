"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"));
var import_cookie = __toESM(require("@fastify/cookie"));

// src/routes/transactions.ts
var import_zod = require("zod");
var import_node_crypto = require("crypto");

// src/database.ts
var import_config = require("dotenv/config");
var import_knex = require("knex");
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL env not found.");
}
var config = {
  client: "sqlite",
  connection: {
    filename: process.env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  }
};
var knex = (0, import_knex.knex)(config);

// src/middlewares/check-session-id-exists.ts
async function checkSessionIdExists(request, reply) {
  const sessionId = request.cookies.sessionId;
  if (!sessionId) {
    return reply.status(401).send({
      error: "Unauthorized."
    });
  }
}

// src/routes/transactions.ts
async function transactionsRoutes(app2) {
  app2.get(
    "/",
    {
      preHandler: [checkSessionIdExists]
    },
    async (request) => {
      const { sessionId } = request.cookies;
      const transactions = await knex("transactions").where("session_id", sessionId).select();
      return { transactions };
    }
  );
  app2.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists]
    },
    async (request) => {
      const getTransactionsParamsSchema = import_zod.z.object({
        id: import_zod.z.string().uuid()
      });
      const { id } = getTransactionsParamsSchema.parse(request.params);
      const { sessionId } = request.cookies;
      const transaction = await knex("transactions").where({
        session_id: sessionId,
        id
      }).first();
      return {
        transaction
      };
    }
  );
  app2.get(
    "/summary",
    {
      preHandler: [checkSessionIdExists]
    },
    async (request) => {
      const { sessionId } = request.cookies;
      const summary = await knex("transactions").where("session_id", sessionId).sum("amount", { as: "amount" }).first();
      return { summary };
    }
  );
  app2.post("/", async (request, reply) => {
    const createTransactionBodySchema = import_zod.z.object({
      title: import_zod.z.string(),
      amount: import_zod.z.number(),
      type: import_zod.z.enum(["credit", "debit"])
    });
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );
    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
      sessionId = (0, import_node_crypto.randomUUID)();
      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1e3 * 60 * 60 * 24 * 7
        // 7 days
      });
    }
    await knex("transactions").insert({
      id: (0, import_node_crypto.randomUUID)(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId
    });
    return reply.status(201).send();
  });
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_cookie.default);
app.register(transactionsRoutes, {
  prefix: "transactions"
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
