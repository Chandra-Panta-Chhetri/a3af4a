/// <reference types="cypress" />

const user1 = {
    username: "Chandra",
    email: "chandra@example.com",
    password: "Z6#6%xfLTarZ9U",
};

const user2 = {
    username: "Zack",
    email: "zack@example.com",
    password: "L%e$xZHC4QKP@F",
};
  
describe("Read Status", () => {
    it("setup", () => {
        cy.signup(user1.username, user1.email, user1.password);
        cy.logout();
        cy.signup(user2.username, user2.email, user2.password);
        cy.logout();
    });

    it("shows unread count for new messages", () => {
        cy.login(user1.username, user1.password);

        cy.get("input[name=search]").type(user2.username);
        cy.contains(user2.username).click();

        cy.get("input[name=text]").type("First message{enter}");
        cy.get("input[name=text]").type("Second message{enter}");

        cy.logout();
        cy.login(user2.username, user2.password);

        //Unread message count for user 2
        cy.contains("2");
    });
});
  