const AWS = require('aws-sdk');

const ses = new AWS.SES();

const RECEIVERS = ['misa.jokisalo@toriverkosto.fi'];
const SENDER = 'misa.jokisalo@toriverkosto.fi'; // make sure that the sender email is properly set up in your Amazon SES

function sendEmail(event, done) {
  const data = JSON.parse(event.body);

  const params = {
    Destination: {
      ToAddresses: RECEIVERS,
    },
    Message: {
      Body: {
        Text: {
          Data: `Name: ${data.firstName} ${data.lastName} \nEmail: ${data.email} \n\n ${data.message}`,
          Charset: 'UTF-8',
        },
      },
      Subject: {
        Data: data.subject,
        Charset: 'UTF-8',
      },
    },
    Source: SENDER,
    ReplyToAddresses: [data.email],
  };
  ses.sendEmail(params, done);
  // done();
}

function ContactForm(event, context, callback) {
  console.log('Received event:', event);

  sendEmail(event, (err) => {
    const response = {
      isBase64Encoded: false,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 200,
      body: JSON.stringify({ status: 'ok' }),
    };
    callback(err, response);
  });
}


module.exports = {
  ContactForm,
};
