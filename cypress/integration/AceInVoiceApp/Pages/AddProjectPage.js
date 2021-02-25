/// <reference types="cypress" />

class AddProjectPage {
    static verifyAddProjectPage = () => {
        cy.title().should("be.equal", "Add New Project | AceInvoice");
        cy.location("pathname").should("include", "/projects/new");
    }

    static addProject = (projectInfo) => {
        cy.get('[data-test-id="project-client"]').select(projectInfo.clientName);
        cy.get('[data-test-id="project-name"]').type(projectInfo.projectName);
        cy.get('[data-test-id="project-billing-method"]').select("Hourly project rate");
        cy.get('[data-test-id="project-rate"]').clear().type(projectInfo.hourlyRate);
        projectInfo.tasks.forEach(task => {
            cy.get('[data-test-id="project-task-add-new"]').click({ force: true });
            cy.xpath("//tbody//tr").get('[name="taskName"]').last().type(task, { force: true });
        });
        cy.get('[data-test-id="project-save"]').click({ force: true });
    }
}

export default AddProjectPage;
