describe('User Login Functionality', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/social-media-client/index.html')
    cy.wait(500)

    // Close modal pop-up first'
    cy.get('#registerModal')
      .should('be.visible')
      .then(() => {
        cy.get('#registerForm')
          .parents('.modal-dialog')
          .find('button.btn-close')
          .click()
      })
    cy.wait(500)
    // Open log in modal
    cy.get('button[data-bs-target="#loginModal"]').contains('Login').click()
  })

  it('The user can log in with the login form with valid credentials', () => {
    const validEmail = 'test@stud.noroff.no'
    const validPassword = 'password123'

    cy.get('#loginEmail').type(validEmail)
    cy.get('#loginPassword').type(validPassword)
    cy.get('#loginForm').submit()
  })

  it('The user cannot submit the login form with invalid credentials and is shown a message.', () => {
    const invalidEmail = 'test@example.com'
    const invalidPassword = 'pass'

    cy.get('#loginEmail').type(invalidEmail)
    cy.get('#loginPassword').type(invalidPassword)
    cy.get('#loginForm').submit()

    cy.get('.error-message').should('be.visible')

    cy.get('#loginModal').should('be.visible')
  })
})
