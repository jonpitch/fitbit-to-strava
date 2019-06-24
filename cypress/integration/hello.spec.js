import { handler } from '../../src/lambda/hello';

// https://github.com/cypress-io/cypress/issues/95
const deferred = function() {
  const defer = {};
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });

  return defer;
};

context('hello world', () => {
  it('integration test', () => {
    let helloLambdaDeferred = deferred();
    cy.visit('http://localhost:8000', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs('/.netlify/functions/hello')
          .as('helloLambda')
          .returns(helloLambdaDeferred.promise);
      }
    });

    helloLambdaDeferred.resolve({
      ok: true,
      json() {
        return {
          msg: 'Hello World! 0'
        };
      }
    });

    cy.server();
    cy.percySnapshot();
    cy.get('button#dummy').click();
    cy.get('p#msg').should('contain', 'Hello World! 0');
  });

  it('lambda unit test', () => {
    const event = {
      path: '/hello',
      httpMethod: 'GET',
      queryStringParameters: null,
      headers: {
        referer: 'http://localhost:8000/'
      }
    };
    const clientContext = {};

    let callbackFired = false;
    const callback = function() {
      callbackFired = true;
    };

    handler(event, clientContext, callback);
    expect(callbackFired).to.equal(true);
  });
});
