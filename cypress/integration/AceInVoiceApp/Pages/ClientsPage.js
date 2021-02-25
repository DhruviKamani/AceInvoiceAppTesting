/// <reference types="cypress" />

class ClientsPage {
    static verifyClientsPage = () => {
        cy.title().should("be.equal", "Clients | AceInvoice");
        cy.location("pathname").should("include", "/clients");
    }

    static verifyIfClientExist = (clientName, clientExistCallback) => {
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

    static clickAddNewClientButton = () => {
        cy.get('[data-test-id="client-add-new"]').click();
    }
}

export default ClientsPage;
