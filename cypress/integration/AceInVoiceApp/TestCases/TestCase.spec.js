/// <reference types="cypress" />

import * as navigationBar from "../Common/NavigationBar";
import * as addClientPage from "../Pages/AddClientPage";
import * as addProjectPage from "../Pages/AddProjectPage";
import * as clientsPage from "../Pages/ClientsPage";
import * as editProjectPage from "../Pages/EditProjectPage";
import * as loginPage from '../Pages/LoginPage';
import * as projectDetailsPage from "../Pages/ProjectDetailsPage";
import * as projectsPage from "../Pages/ProjectsPage";
import * as timeTrackingPage from "../Pages/TimeTrackingPage";

describe('Testing of AceInvoice App', () => {

    let emailId = "oliver@example.com";
    let password = "welcome";
    let projectDetails = {
        clientName: "AceInvoice testZ",
        clientExists: false,
        projectName: "AceInvoice testing newZ",
        hourlyRate: "10.00",
        projectExist: false,
        tasks: [
            "testing"
        ]
    }
    let newProjectDetails = {
        projectName: "testing newZ",
        hourlyRate: "50.00"
    }

    it('Should be able to login', () => {
        cy.visit("https://qa.aceinvoice.com/");

        loginPage.verifyLoginPage();
        loginPage.login(emailId, password);

        timeTrackingPage.verifyTimeTrackingPage();
    });

    it("Should be able to add new client if doesn't exist", () => {
        navigationBar.navigateToClientsPage();
        clientsPage.verifyClientsPage();

        clientsPage.verifyIfClientExist(projectDetails.clientName, exists => {
            projectDetails.clientExists = exists;
            if (exists)
                return;
            clientsPage.clickAddNewClientButton();
            addClientPage.verifyNewClientsPage();
            addClientPage.addNewClient(projectDetails.clientName);
        })
    });

    it("Should check if project exist", () => {
        if (projectDetails.clientExists) {
            navigationBar.navigateToProjectsPage();
            projectsPage.verifyProjectsPage();

            projectsPage.verifyIfProjectExist(projectDetails.projectName, projectDetails.clientName, exists => {
                projectDetails.projectExist = exists;
            })
        }
    })

    it("Should add project and verify details", () => {
        if (!projectDetails.projectExist) {
            projectsPage.clickAddNewProjectButton();
            addProjectPage.verifyAddProjectPage();
            addProjectPage.addProject(projectDetails);

            projectDetailsPage.verifyProjectDetailsPage();
            projectDetailsPage.verifyProjectDetails(projectDetails);
        }
    })

    it("Should take edited values", () => {
        if (projectDetails.projectExist) {
            projectsPage.selectProject(projectDetails.projectName, projectDetails.clientName);
        }

        projectDetailsPage.verifyProjectDetailsPage();
        projectDetailsPage.clickEditButton();

        editProjectPage.verifyEditProjectPage();
        editProjectPage.editDetails(newProjectDetails);

        projectDetailsPage.verifyProjectDetailsPage();
        projectDetailsPage.verifyEditedProjectDetails(newProjectDetails);
    });
});
