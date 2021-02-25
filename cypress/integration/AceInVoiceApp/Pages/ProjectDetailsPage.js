/// <reference types="cypress" />

class ProjectDetailsPage {
    static verifyProjectDetailsPage = () => {
        cy.title().should("be.equal", "Projects | AceInvoice");
        cy.location("pathname").should("include", "/projects");
    }

    static verifyProjectDetails = (projectDetail) => {
        cy.get('[data-test-id="project-client-link"]').should("have.text", projectDetail.clientName);
        cy.get('div[data-test-id="project-name"]').should("have.text", projectDetail.projectName);
        cy.get('[data-test-id="project-billing-method"]').should("have.text", "Hourly Project Rate");
        let index = 5;
        projectDetail.tasks.forEach(task => {
            cy.get(".task-name").then($taskDetails => {
                let taskExist = false;
                for (let index = 0; index < $taskDetails.length; index++) {
                    const $taskDetail = $taskDetails[index];
                    if ($taskDetail.innerText === task) {
                        taskExist = true;
                        break;
                    }
                }
                expect(taskExist).to.be.true;
            })
        });
        cy.get('[data-test-id="project-hourly-rate"]').should("have.text", "$" + projectDetail.hourlyRate);
    }

    static verifyEditedProjectDetails = (projectDetail) => {
        cy.get('div[data-test-id="project-name"]').should("have.text", projectDetail.projectName);
        cy.get('[data-test-id="project-billing-method"]').should("have.text", "Hourly Project Rate");
        cy.get('[data-test-id="project-hourly-rate"]').should("have.text", "$" + projectDetail.hourlyRate);
    }

    static clickEditButton = () => {
        cy.get('[data-test-id="project-edit-link"]').click();
    }
}

export default ProjectDetailsPage;
