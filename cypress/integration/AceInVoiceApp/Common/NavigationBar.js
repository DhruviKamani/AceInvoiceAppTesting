/// <reference types="cypress" />

export const navigateToProjectsPage = () => navigateToElement(3);
export const navigateToClientsPage = () => navigateToElement(4);

const navigateToElement = (index) => {
    cy.xpath("//body/div[3]/div[1]/div[1]/div[1]/div[1]//button").then($navigationButtons => {
        $navigationButtons[index - 1].click();
    });
}