/// <reference types="cypress" />

class TimeTrackingPage {
    static verifyTimeTrackingPage = () => {
        cy.title().should("be.equal", "Time Tracking | AceInvoice");
        cy.location("pathname").should("include", "/time_tracking");
    }

}

export default TimeTrackingPage;
