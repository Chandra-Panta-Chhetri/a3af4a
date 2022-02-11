/// <reference types="cypress" />

const alice = {
    username: "Alice",
    email: "alice@example.com",
    password: "Z6#6%xfLTarZ9U",
};

const bob = {
    username: "Bob",
    email: "bob@example.com",
    password: "L%e$xZHC4QKP@F",
};
  
describe("Read Status", () => {
    it("setup", () => {
        cy.signup(alice.username, alice.email, alice.password);
        cy.logout();
        cy.signup(bob.username, bob.email, bob.password);
        cy.logout();
    });

    it("shows unread count for new messages", () => {
        cy.login(alice.username, alice.password);

        cy.get("input[name=search]").type("Bob");
        cy.contains("Bob").click();

        cy.get("input[name=text]").type("First message{enter}");
        cy.get("input[name=text]").type("Second message{enter}");

        cy.logout();
        cy.login(bob.username, bob.password);

        //Unread message count for Bob
        cy.contains("2");
    });
});
  