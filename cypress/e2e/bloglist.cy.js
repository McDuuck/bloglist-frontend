
describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
    cy.contains('Login').click()
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login fails with wrong password', function() {
    cy.get('#username').type('cypress')
    cy.get('#password').type('wrong')
    cy.contains('login').click()
    cy.contains('wrong username or password')
  })

  describe('when logged in', function() {

    beforeEach(function() {
      const user = {
        name: 'Cypress',
        username: 'cypress',
        password: 'cypress'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.get('#username').type('cypress')
      cy.get('#password').type('cypress')
      cy.contains('login').click()
      cy.contains('New Blog').click()
      cy.get('#title').type('Cypress Blog')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('http://cypress.com')
      cy.get('#create').click()
      cy.reload()
    })

    describe('liking and deleting', function() {
      it('Blog can be viewed and liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('Blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.reload()
      })

      it('Blog can not be deleted by other users', function() {
        const user = {
          name: 'Cypress2',
          username: 'cypress2',
          password: 'cypress2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.get('#logout').click()
        cy.contains('Login').click()
        cy.get('#username').type('cypress2')
        cy.get('#password').type('cypress2')
        cy.contains('login').click()
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
    })
    describe('ordering', function() {
      it('Blogs are ordered by likes', function() {
        cy.contains('New Blog').click()
        cy.get('#title').type('Blog with more likes')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('http://cypress.com')
        cy.get('#create').click()
        cy.reload()
        cy.get('.blogStyle').eq(1).within(() => {
          cy.get('.view_button').click()
          cy.get('.like_class').click()
        })
        cy.get('.blogStyle').eq(0).contains('Blog with more likes')
      })
    })
  })
})