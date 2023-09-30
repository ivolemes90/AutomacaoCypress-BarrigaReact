///<reference types="cypress"/>

/*
Senários de testes a nível de API:
1 Inserir conta
2 Alterar conta
3 Inserir conta repetida
4 Inserir movimentação
5 Verificar saldo
6 Remover movimentação
*/

describe('Should test at a backend level', () => {
    let token
    let dateNow
    
    before(() => {
        cy.getToken('ivo@gmail.com', 'ivo@123')
        .then(tkn=> {
            token = tkn
        })
        cy.dateNow().then(res => {dateNow = res})
    })

    beforeEach(()=> {
        cy.resetRest()
    })

    it('Should creatre an account', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            body: {
                nome: "Nova conta",
            }
        }).as('response')

        cy.get('@response').then(res=> {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Nova conta')
        })
    })

    it('Should update an account', () =>{
        cy.getContaByName('Conta para alterar')    
        .then(res => {
            cy.request({
                method: 'PUT',
                url: `/contas/${res}`,
                headers: { Authorization: `JWT ${token}`},
                body: {
                    nome: "Conta alterada",
                    }
                }).as('response')
            })

        cy.get('@response').its('status').should('be.equal', 200) 
    })
    
    it('Should not create an account with same name', ()=>{
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            body: {
                nome: "Conta mesmo nome",
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res=> {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should create a transation', ()=>{
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
            cy.request({
                method: 'POST',
                url: '/transacoes',
                headers: { Authorization: `JWT ${token}`},
                body: {
                    conta_id: `${contaId}`,
                    data_pagamento: `${dateNow}`,
                    data_transacao: `${dateNow}`,
                    descricao: "desc",
                    envolvido: "Inter",
                    status: true,
                    tipo: "REC",
                    valor: "123"
                },
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Should get balance', ()=> {
        cy.request({
            method: 'GET',
            url: `/saldo`,
            headers: { Authorization: `JWT ${token}`},
            }).then(res => {
                let saldoConta = null
                res.body.forEach(c=> {
                    if(c.conta === 'Conta para saldo') saldoConta = c.saldo
                })
                expect(saldoConta).to.be.equal('534.00')
            })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}`},
            qs: { descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}`},
                    body: {
                        conta_id:res.body[0].conta_id,
                        data_pagamento: dateNow,
                        data_transacao: dateNow,
                        descricao:res.body[0].descricao,
                        envolvido:res.body[0].envolvido,
                        status: true,
                        valor: res.body[0].valor
                    },
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            method: 'GET',
            url: `/saldo`,
            headers: { Authorization: `JWT ${token}`},
            }).then(res => {
                let saldoConta = null
                res.body.forEach(c=> {
                    if(c.conta === 'Conta para saldo') saldoConta = c.saldo
                })
                expect(saldoConta).to.be.equal('4034.00')
            })
    })

    it('Should remove a transaction', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}`},
            qs: { descricao: 'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                headers: { Authorization: `JWT ${token}`}
            }).its('status').should('be.equal', 204)
        })
    })
})
 