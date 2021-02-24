/// <reference types="cypress" />

export const verifyProjectsPage = () => {
    cy.title().should("be.equal", "Projects | AceInvoice");
    cy.location("pathname").should("include", "/projects");
}

export const verifyIfProjectExist = (projectName, clientName, projectExistCallback) => {
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

export const selectProject = (projectName, clientName) => {
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

export const clickAddNewProjectButton = () => {
    cy.get('[data-test-id="project-add-new"]').click();
}