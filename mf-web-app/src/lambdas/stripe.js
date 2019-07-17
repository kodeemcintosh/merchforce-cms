const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const IntrinsicLambda = require('@intrinsic/lambda');

// body: {
//   amount,
//   source,
//   description,
// }

exports.handler = function(event, context, callback) {
  const body = JSON.parse(event.body);
  const currency = process.env.STRIPE_CURRENCY;

  try {
    const charge = await stripe.charges.create({
      amount: body.amount,
      currency,
      source: body.source,
      description: body.description
    });

    callback(null, {
      statusCode: 200,
      body: charge
    });
  } catch(err) {
    callback(null, {
      statusCode: err.statusCode,
      body: err
    })
  }
}


// IN NETLIFY PRIVATE BETA AS OF JULY 2019
// module.exports = new IntrinsicLambda()
//   .configurePolicies((policy) => {
//     policy.outboundHttp.allowPost('https://api.stripe.com/v1/charges');
//   })
//   .setHandlerName('handler')
//   .setHandlerFile(`${__dirname}/handler.js`)
//   .run();
