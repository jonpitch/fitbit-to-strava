import { handler } from "../../src/lambda/hello";

// https://github.com/cypress-io/cypress/issues/95
const deferred = function() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

context("hello world", () => {
  beforeEach(() => {
    let helloLambdaDeferred = deferred();
    cy.visit("http://localhost:8000", {
      onBeforeLoad(win) {
        cy.stub(win, "fetch")
          .withArgs("/.netlify/functions/hello")
          .as("helloLambda")
          .returns(helloLambdaDeferred.promise);
      }
    });

    helloLambdaDeferred.resolve({
      json() {
        return {
          msg: "Hello World! 0"
        };
      },
      ok: true
    });
  });

  it("integration test", () => {
    cy.server();
    cy.get("button#dummy").click();
    cy.get("p#msg").should("contain", "Hello World! 0");
  });

  it("lambda unit test", () => {
    const event = {
      path: "/hello",
      httpMethod: "GET",
      queryStringParameters: null,
      headers: {
        referer: "http://localhost:8000/"
      }
    };
    const clientContext = {};

    let callbackFired = false;
    const callback = function(_, expectedResponse) {
      callbackFired = true;
    };

    const response = handler(event, clientContext, callback);
    expect(callbackFired).to.equal(true);
  });
});
