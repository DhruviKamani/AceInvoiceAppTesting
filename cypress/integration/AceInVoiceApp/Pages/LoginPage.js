/// <reference types="cypress" />

class LoginPage {
    static verifyLoginPage = () => {
        cy.title().should("be.equal", "Sign In | AceInvoice");
        cy.location("pathname").should("eq", "/sign_in");
    }

    static login = (email, password) => {
        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').type(password);
        cy.get('input[type="submit"]').click();
    }
}

export default LoginPage;
