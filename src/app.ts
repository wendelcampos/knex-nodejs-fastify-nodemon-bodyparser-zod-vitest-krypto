import fastify from "fastify";
import cryto from 'node:crypto'
import { knex } from "knex";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";
import cookie from '@fastify/cookie'

export const app = fastify()

//GET, POST, DELETE, PUT, PATCH

//http://localhost:3333/hello

app.register(cookie)

app.register(transactionsRoutes, {
    prefix: 'transactions'
})
