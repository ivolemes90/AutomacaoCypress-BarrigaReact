///<reference types="cypress"/>

import loc from "../support/locators"
import "../support/commandsContas"

describe('Should test at a functional level', () => {
    beforeEach(() => {
        cy.login('ivo@gmail.com', 'ivo@123')  
    })
    
    it('Should reset the app', ()=> {
        cy.resetApp()
        cy.get(loc.MESSAGE).should('contain', 'Dados resetados com sucesso!')

    })

    it('Should creatre an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    
    })

    it('Should update an account', () =>{
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta de teste')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta de teste alterada')
        cy.get(loc.CONTAS.BTN_CT_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
      
    })

    
    it('Should not create an account with same name', ()=>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste alterada')
        cy.get(loc.MESSAGE).should('contain', 'code 400')

    })

    it('Should create a transation', ()=>{
        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta de teste alterada')
        cy.get('[data-test="status"]').click()
        cy.get(loc.MOVIMENTACAO.BTN_MVT_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
        
    })

    it('Should get balance', ()=> {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta de teste alterada')).should('contain', '123,00')

    })
})
 