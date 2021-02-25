/// <reference types="cypress" />

import NavigationBar from "../Common/NavigationBar";
import AddClientPage from "../Pages/AddClientPage";
import AddProjectPage from "../Pages/AddProjectPage";
import ClientsPage from "../Pages/ClientsPage";
import EditProjectPage from "../Pages/EditProjectPage";
import LoginPage from '../Pages/LoginPage';
import ProjectDetailsPage from "../Pages/ProjectDetailsPage";
import ProjectsPage from "../Pages/ProjectsPage";
import TimeTrackingPage from "../Pages/TimeTrackingPage";

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

        LoginPage.verifyLoginPage();
        LoginPage.login(emailId, password);

        TimeTrackingPage.verifyTimeTrackingPage();
    });

    it("Should be able to add new client if doesn't exist", () => {
        NavigationBar.navigateToClientsPage();
        ClientsPage.verifyClientsPage();

        ClientsPage.verifyIfClientExist(projectDetails.clientName, exists => {
            projectDetails.clientExists = exists;
            if (exists)
                return;
            ClientsPage.clickAddNewClientButton();
            AddClientPage.verifyNewClientsPage();
            AddClientPage.addNewClient(projectDetails.clientName);
        })
    });

    it("Should check if project exist", () => {
        if (projectDetails.clientExists) {
            NavigationBar.navigateToProjectsPage();
            ProjectsPage.verifyProjectsPage();

            ProjectsPage.verifyIfProjectExist(projectDetails.projectName, projectDetails.clientName, exists => {
                projectDetails.projectExist = exists;
            })
        }
    })

    it("Should add project and verify details", () => {
        if (!projectDetails.projectExist) {
            ProjectsPage.clickAddNewProjectButton();
            AddProjectPage.verifyAddProjectPage();
            AddProjectPage.addProject(projectDetails);

            ProjectDetailsPage.verifyProjectDetailsPage();
            ProjectDetailsPage.verifyProjectDetails(projectDetails);
        }
    })

    it("Should take edited values", () => {
        if (projectDetails.projectExist) {
            ProjectsPage.selectProject(projectDetails.projectName, projectDetails.clientName);
        }

        ProjectDetailsPage.verifyProjectDetailsPage();
        ProjectDetailsPage.clickEditButton();

        EditProjectPage.verifyEditProjectPage();
        EditProjectPage.editDetails(newProjectDetails);

        ProjectDetailsPage.verifyProjectDetailsPage();
        ProjectDetailsPage.verifyEditedProjectDetails(newProjectDetails);
    });
});
