/// <reference types="cypress" />

export const verifyTimeTrackingPage = () => {
    cy.title().should("be.equal", "Time Tracking | AceInvoice");
    cy.location("pathname").should("include", "/time_tracking");
}
