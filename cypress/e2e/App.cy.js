/* globals cy */

describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });
  
    it ('opens with Fall CS courses', () => {
      cy.visit ('/');cy.get('[data-cy=course]').should('contain', 'Fall CS');
    });
  
    it('shows Winter courses when Winter is selected', () => {
      cy.visit ('/');
      cy.get('[data-cy=Winter]').click();
      cy.get('[data-cy=course]').should('contain' ,'Winter');
    });

    it('uese test data', () => {
      cy.visit ('/');
      cy.get('[data-cy=Fall]').click();
      cy.get('.course-list li:first h4').should('contain' ,'Test');
    });
});
