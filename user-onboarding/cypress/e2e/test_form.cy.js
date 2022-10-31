describe('Forms App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  const fnameInput = () => cy.get("input[name=fname]");
  const lnameInput = () => cy.get("input[name=lname]");
  const emailInput = () => cy.get("input[name=email]");
  const submitBtn = () => cy.get(`button[id="submitBtn"]`);
  const terms = () => cy.get("input[name=terms]");

  it("filling out form inputs", () => {
    fnameInput()
      .should("have.value", "")
      .type("Mark")
      .should("have.value", "Mark");

    lnameInput()
      .should("have.value", "")
      .type("Tucker")
      .should("have.value", "Tucker");

    emailInput()
      .should("have.value", "")
      .type("tuck@me.com")
      .should("have.value", "tuck@me.com");

  })

  it("Can check term of service", () => {
    terms().check().should("be.checked");
    terms().uncheck().should("not.be.checked");
  })

  it("Can submit form", () => {
    fnameInput()
    .type("Mark")
    .should("have.value", "Mark");

  lnameInput()
    .type("Tucker")
    .should("have.value", "Tucker");

  emailInput()
    .type("tuck@me.com")
    .should("have.value", "tuck@me.com");

  terms().check().should("be.checked");
  
  submitBtn().should("be.enabled");
  submitBtn().click();

  })









})