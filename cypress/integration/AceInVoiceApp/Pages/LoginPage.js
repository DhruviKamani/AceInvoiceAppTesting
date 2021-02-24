/// <reference types="cypress" />

export const verifyLoginPage = () => {
    cy.title().should("be.equal", "Sign In | AceInvoice");
    cy.location("pathname").should("eq", "/sign_in");
}

export const login = (email, password) => {
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('input[type="submit"]').click();
}