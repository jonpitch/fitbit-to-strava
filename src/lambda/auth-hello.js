export function handler(event, context, callback) {
  if (context.clientContext) {
    const { identity, user } = context.clientContext;
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        msg: 'auth-hello: ' + Math.round(Math.random() * 10),
        identity,
        user
      })
    });
  } else {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        msg:
          'auth-hello - no authentication detected. Note that netlify-lambda doesnt locally emulate Netlify Identity.'
      })
    });
  }
}
