/// <reference types="cypress" />

class NavigationBar {
    static navigateToProjectsPage = () => navigateToElement(3);
    static navigateToClientsPage = () => navigateToElement(4);

    static navigateToElement = (index) => {
        cy.xpath("//body/div[3]/div[1]/div[1]/div[1]/div[1]//button").then($navigationButtons => {
            $navigationButtons[index - 1].click();
        });
    }
}

export default NavigationBar;
