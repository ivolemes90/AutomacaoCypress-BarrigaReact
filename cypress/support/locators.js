const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME: '[data-test="menu-home"] > .fas',
        SETTINGS: '[data-test="menu-settings"]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO:'[data-test="menu-movimentacao"]',
        EXTRATO: '[data-test="menu-extrato"]'
    },
    CONTAS: {
        NOME: '[data-test="nome"]',
        BTN_CT_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: nome => `//table//td[contains(.,'${nome}')]/..//i[@class='far fa-edit']`
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test="descricao"]',
        VALOR: '[data-test="valor"]',
        INTERESSADO: '[data-test="envolvido"]',
        CONTA: '[data-test="conta"]',
        STATUS: '[data-test="status"]',
        BTN_MVT_SALVAR: '.btn-primary'
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(.,'${desc}')]/..//small[contains(.,'${value}')]`,
        FN_XP_REMOVER_ELEMENTO: desc => `//span[contains(.,'${desc}')]/../../..//i[@class='far fa-trash-alt']`
    },
    SALDO: {
        FN_XP_SALDO_CONTA: NOME => `//td[contains(.,'${NOME}')]/..//td[2]`
    },
    MESSAGE: '.toast-message'
}

export default locators;