import { expect, it, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../app'
import { execSync } from 'child_process'

describe('Transactions routes', () => {
    beforeAll(async () => {
        await app.ready()
    })
    
    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })
    
    it('should be able to create a new transaction', async () => {
        //fazer chamada HTTP p/ criar uma nova  transação 
    
         await request(app.server)
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })
            .expect(201)
    
        // expect(response.statusCode).toEqual(201)
    })

    it('should be able to list all transactions', async () => {
        const createTransactionResponse = await request(app.server)
                    .post('/transactions')
                    .send({
                        title: 'New Transaction',
                        amount: 5000,
                        type: 'credit'
                    })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual(
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000,   
            }),

        )
                            
    })

    it('should be able to get especific transaction', async () => {
        const createTransactionResponse = await request(app.server)
                    .post('/transactions')
                    .send({
                        title: 'New Transaction',
                        amount: 5000,
                        type: 'credit'
                    })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        const transactionId = listTransactionsResponse.body.transaction[0].id

        const getTransactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies)
            .expect(200)

        expect(getTransactionResponse.body.transactions).toEqual(
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000,   
            }),

        )                   
    })

    it('should be able to get the sumary', async () => {
        const createTransactionResponse = await request(app.server)
                    .post('/transactions')
                    .send({
                        title: 'Credit Transaction',
                        amount: 5000,
                        type: 'credit'
                    })

        const cookies = createTransactionResponse.get('Set-Cookie')

        await request(app.server)
            .post('/transactions')
            .set('Cookie', cookies)
            .send({
                title: 'Debit transaction',
                amount: 2000,
                type: 'debit'
            })

        const sumaryResponse = await request(app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies)
            .expect(200)

        expect(sumaryResponse.body.sumary).toEqual({
            amount: 3000
        })
                            
    })

})

