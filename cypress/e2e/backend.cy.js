///<reference types="cypress"/>

describe('Should test at a backend level', () => {
    let token

    before(() => {
        cy.getToken('ivo@gmail.com', 'ivo@123')
            .then(tkn=> {
                token = tkn
            })
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
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            qs: {
                nome: "Conta para alterar"
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}`},
                body: {
                    nome: "Conta alterada",
                    }
                }).as('response')
            })

        cy.get('@response').its('status').should('be.equal', 200) 
    })
    
    // it('Should not create an account with same name', ()=>{
        
    // })

    // it('Should create a transation', ()=>{
        
    // })

    // it('Should get balance', ()=> {
        
    // })

    // it('Should remove a transaction', () => {
        
    // })
})
 