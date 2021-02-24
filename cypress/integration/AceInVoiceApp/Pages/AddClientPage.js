/// <reference types="cypress" />

export const verifyNewClientsPage = () => {
    cy.title().should("be.equal", "Add New Client | AceInvoice");
    cy.location("pathname").should("include", "/clients/new");
}

export const addNewClient = (clientName) => {
    cy.get('[data-test-id="client-name"]').type(clientName);
    cy.get('[data-test-id="client-submit"]').click({ force: true });
}