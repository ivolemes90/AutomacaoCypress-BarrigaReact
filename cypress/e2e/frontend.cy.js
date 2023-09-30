///<reference types="cypress"/>

/*
Senários de testes funcionais:
1 Inserir conta
2 Alterar conta
3 Inserir conta repetida
4 Inserir movimentação
5 Verificar saldo
6 Remover movimentação
*/

import loc from "../support/locators"
import "../support/commandsContas"

describe('Should test at a frontend level', () => {
    after(() => {
        cy.clearLocalStorage()
    })
    beforeEach(() => {
        cy.buildEnv()
        cy.login('ivo@gmail.com', '@123')
    })

    it('Should creatre an account', () => {
        cy.acessarMenuConta()
        cy.intercept('POST', '/contas', { fixture: 'inserirConta.json' }).as('inserirConta')
        cy.intercept('GET', '/contas', { fixture: 'contasSave.json' }).as('contasSave')
        cy.inserirConta('Nova conta')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        cy.intercept('PUT', '/contas/**', { fixture: 'contasAlteradas.json' }).as('contasAlteradas')
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Banco')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Carteira alterada')
        cy.get(loc.CONTAS.BTN_CT_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', ()=>{
        cy.acessarMenuConta()
        cy.intercept('POST', '/contas', { fixture: 'inserirContaRepetida', statusCode: 400 }).as('inserirContaRepetida')
        cy.inserirConta('Carteira')
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    // it('Should create a transation', ()=>{
    //     cy.get(loc.MENU.MOVIMENTACAO).click()

    //     cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
    //     cy.get(loc.MOVIMENTACAO.VALOR).type('123')
    //     cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
    //     cy.get(loc.MOVIMENTACAO.CONTA).select('Conta com movimentacao')
    //     cy.get(loc.MOVIMENTACAO.STATUS).click()
    //     cy.get(loc.MOVIMENTACAO.BTN_MVT_SALVAR).click()
    //     cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')

    //     cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
    //     cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')

    // })

    // it('Should get balance', ()=> {
    //     //cy.get(loc.MENU.HOME).click()
    //     cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

    //     cy.get(loc.MENU.EXTRATO).click()
    //     cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
    //     cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
    //     cy.get(loc.MOVIMENTACAO.STATUS).click()
    //     cy.get(loc.MOVIMENTACAO.BTN_MVT_SALVAR).click()
    //     cy.get(loc.MESSAGE).should('contain', 'Movimentação alterada com sucesso!')

    //     cy.get(loc.MENU.HOME).click()
    //     cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')

    // })

    // it('Should remove a transaction', () => {
    //     cy.get(loc.MENU.EXTRATO).click()
    //     cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
    //     cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
    // })
})
