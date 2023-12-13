import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../src/constants/constants';
import { deleteCookie } from '../../src/helpers/helpers';

describe('template spec', () => {
  const login = 'fake@mail.ru';
  const password = 'fakePassword';
  const name = 'fakeName';

  beforeEach(() => {
    cy.intercept('POST', 'login', { fixture: 'login.json' } ).as('login');
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients.json' }).as('ingredients');
    cy.intercept('GET', 'user', { fixture: 'user.json' } ).as('user');
    cy.intercept('POST', 'orders', { fixture: 'order.json' }).as('order');
  });

  it('passes', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('[data-testId=input_email]').type(login);
    cy.get('[data-testId=input_password]').type(password);
    cy.get('[data-testId=login_enter]').click();

    cy.wait('@login').its('request.body').should('deep.equal', {
      email: login,
      password
    });
    cy.wait('@ingredients');
    cy.wait('@user');

    cy.get('[data-testId=header_name]').should('have.text', name);

    cy.get('[data-testId=643d69a5c3f7b9001cfa093c]').click();
    cy.get('[data-testId=ingredient_info]').should('have.text', 'Краторная булка N-200i');
    cy.get('[data-testId=icon_close]').click();

    cy.get('[data-testId=drag_643d69a5c3f7b9001cfa093c]').trigger('dragstart');
    cy.get('[data-testId=drop_zone]').trigger('drop');

    cy.get('[data-testId=make_order]').click();
    cy.wait('@order');
    cy.get('[data-testId=order_number]').should('have.text', '28958');
    cy.get('[data-testId=icon_close]').click();
  });

  afterEach(() => {
    localStorage.removeItem(REFRESH_TOKEN);
    deleteCookie(ACCESS_TOKEN);
  });
});
