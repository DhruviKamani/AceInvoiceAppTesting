/// <reference types="cypress" />

class EditProjectPage {
    static verifyEditProjectPage = () => {
        cy.title().should("be.equal", "Edit Project | AceInvoice");
        cy.location("pathname").should("include", "/edit/");
    }

    static editDetails = (projectInfo) => {
        cy.get('[data-test-id="project-name"]').clear().type(projectInfo.projectName);
        cy.get('[data-test-id="project-rate"]').clear().type(projectInfo.hourlyRate);
        cy.get('[data-test-id="project-save"]').click({ force: true });
    }
}

export default EditProjectPage;
