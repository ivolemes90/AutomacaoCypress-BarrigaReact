///<reference types="cypress"/>

describe('Should test at a functional level', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me')
        cy.get('.input-group > .form-control').type('ivo@gmail.com')
        cy.get(':nth-child(2) > .form-control').type('ivo@123')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })

    it('Should creatre an account', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test="nome"]').type('Conta de teste2')
        cy.get('.btn').click()
        cy.get('.toast-success > .toast-message').should('contain', 'Conta inserida com sucesso!')

    })

    it.only('Should update an account', () =>{
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//table//td[contains(.,'Conta de teste')]/..//i[@class='far fa-edit']").click()
        cy.get('[data-test="nome"]')
            .clear()
            .type('Conta de teste1')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso!')
    
        
    })
})
