/// <reference types="cypress" />

class ProjectsPage {
    static verifyProjectsPage = () => {
        cy.title().should("be.equal", "Projects | AceInvoice");
        cy.location("pathname").should("include", "/projects");
    }

    static verifyIfProjectExist = (projectName, clientName, projectExistCallback) => {
        cy.get("tbody > tr")
            .then($rows => {
                let exists = false;
                for (let index = 0; index < $rows.length; index++) {
                    const $row = $rows[index];
                    let segments = $row.getElementsByTagName("a")
                    if (segments[0].innerText === projectName && segments[1].innerText === clientName) {
                        exists = true;
                        break;
                    }
                }
                console.log(exists);
                projectExistCallback(exists);
            })
    }

    static selectProject = (projectName, clientName) => {
        cy.get("tbody > tr")
            .then($rows => {
                for (let index = 0; index < $rows.length; index++) {
                    const $row = $rows[index];
                    let segments = $row.getElementsByTagName("a")
                    if (segments[0].innerText === projectName && segments[1].innerText === clientName) {
                        segments[0].click();
                        break;
                    }
                }
            })
    }

    static clickAddNewProjectButton = () => {
        cy.get('[data-test-id="project-add-new"]').click();
    }
}

export default ProjectsPage;
