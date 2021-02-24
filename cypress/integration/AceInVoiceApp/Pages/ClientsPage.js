/// <reference types="cypress" />

export const verifyClientsPage = () => {
    cy.title().should("be.equal", "Clients | AceInvoice");
    cy.location("pathname").should("include", "/clients");
}

export const verifyIfClientExist = (clientName, clientExistCallback) => {
    cy.xpath("//tbody//a").then($clientItems => {
        let exists = false;
        for (const index in $clientItems) {
            const $clientItem = $clientItems[index];
            if ($clientItem.innerText === clientName) {
                exists = true;
                break;
            }
        }
        clientExistCallback(exists);
    })
}

export const clickAddNewClientButton = () => {
    cy.get('[data-test-id="client-add-new"]').click();
}