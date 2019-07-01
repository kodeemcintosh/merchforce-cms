const OktaNode = require('@okta/okta-sdk-nodejs');

const okta = new OktaNode({
  orgUrl: process.env.OKTA_DOMAIN,
  token: process.env.OKTA_CLIENT_TOKEN
});

export async function handler(event, context, callback) {
  try {
    let body = await JSON.parse(event.body);

    const userId = body.user.id;
    const updatedProfile = body.user.profile;

    let response = await okta.getUser(userId)
      .then((user) => {
        console.log('found the user: ', user, ' for updating');

        user.profile = updatedProfile;

        await user.update()
          .then(() => console.log('user has been updated!'));
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