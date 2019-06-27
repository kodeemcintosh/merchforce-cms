// const OktaJwtVerifier = require('@okta/jwt-verifier');

// const oktaJwtVerifier = new OktaJwtVerifier({
//   issuer: 'https://{yourOktaDomain}/oauth2/default',
//   assertClaims: {
//     aud: 'api://default'
//   }
// });

// export async function handler(event, context, callback) {
//   try {
//     let body = JSON.parse(event.body);
//     let headers = JSON.parse(event.headers);

//     // The access token string, which should be obtained from the Authorization header on the request to your server
//     const accessTokenString = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Imk2UnRjSkxvbUg0e...';

//     oktaJwtVerifier.verifyAccessToken(accessTokenString)
//       .then(jwt => {
//         // the token is valid
//         console.log(jwt.claims);
//       })
//       .catch(err => {
//         // a validation failed, inspect the error
//       });

//   } catch(err) {

//   }
// }