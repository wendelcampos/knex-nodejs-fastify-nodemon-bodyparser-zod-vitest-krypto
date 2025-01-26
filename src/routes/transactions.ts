import { FastifyInstance } from "fastify"
import { z } from 'zod'
import knex from "knex"
import crypto, { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from "../middlewares/check-session-id-exist"

// Cookies <-> Formas da gente manter contexto entre requisicoes

// Unitarios: unidade da sua aplicação
// Integração: comunicação entre duas ou mais unidades
// e2e - ponto a ponto: simulam um usuario operando na nossa aplicação

// front-end: abre a pagina de login, digite o texto no campo id email, clique no botao 
// banck-end: chamadas HTTP, websockets

// Piramide de testes: E2E (nao dependem de nenhuma tecnologia, nao dependem de arquitetura)
// 2000 testes -> Testes E2E => 16min

export async function transactionsRoutes(app: FastifyInstance) {
    app.addHook('preHandler', async (request, reply) => {
        console.log()
    })

    app.get('/', {
        preHandler: [checkSessionIdExists]
    }, async (request, reply) => {

        const { sessionId } = request.cookies

        const transactions = await knex('transactions')
            .where('sessionId', sessionId)
            .select()

        return { transactions }
    })

    app.get('/:id', 
        {
            preHandler: [checkSessionIdExists]
        }, async (request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getTransactionParamsSchema.parse(request.params)

        const { sessionId } = request.cookies

        const transaction = await knex('transactions')
            .where({
                'sessionId': sessionId,
                id
            })
            .first()

        return { transaction }
    })

    app.get('/sumary', {
        preHandler: [checkSessionIdExists]
    }, async (request) => {

        const { sessionId } = request.cookies

        const sumary = await knex('transactions')
            .where('sessionId', sessionId)
            .sum('amount', { as: 'amount' })
            .first()

        return { sumary }
    })

    app.post('/', {
        preHandler: [checkSessionIdExists]
    }, async (request, reply) => {
        // { title, amout, type: credit or debit }

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        let sessionId = request.cookies.sessionId
        
        if(!sessionId){
            sessionId = randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 days
            })
        }
        await knex('transactions')
            .insert({
                id: crypto.randomUUID(),
                title,
                amout: type === 'credit' ? amount : amount * -1
        })

        // 201 - Recurso criado com sucesso
    
        return reply.status(201).send()
    })
}