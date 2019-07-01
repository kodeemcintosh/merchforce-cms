const OktaNode = require('@okta/okta-sdk-nodejs');

const okta = new OktaNode({
  orgUrl: process.env.OKTA_DOMAIN,
  token: process.env.OKTA_CLIENT_TOKEN
});

export async function handler(event, context, callback) {
  try {
    let body = await JSON.parse(event.body);


    // TODO: update this so that merchforce can create admin users
    let group = {
      id: 1111,
      name: 'basic'
    };


    const newUser = body.user;

    let response = await okta.createUser(newUser)
      .then((user) => {
        console.log('created user: ', user)

        await user.addToGroup(group.id)
        .then(() => console.log('user added to group: ', group.name));
      })
      .catch((err) => {
        console.warn('Error in CreateUser function: ', err);
      });


    if(response.status !== 200) {
      callback(null, {
        statusCode: response.statusCode,
        body: "error creating new user"
      });
    }

    callback(null, {
      statusCode: 200
    });
  } catch(err) {
    callback(null, {
      statusCode: err.statusCode,
      body: err
    })
  }
}