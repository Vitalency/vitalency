'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// NOTE: these get set by running: firebase functions:config:set gmail.email="EMAIL@ADDRESS.COM" gmail.password="PASSWORD" signups.recipient="signups@teamvitalency.com"
// NOTE: this should only have to be done once per environment
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});
const recipient = functions.config().signups.recipient;

// Send an email when a record is added
exports.sendSignUpEmail = functions.firestore.document('/signUpEmails/{signUpId}').onCreate(async (snapshot, context) => {
  const data = snapshot.data()

  const mailOptions = {
      from: gmailEmail,
      to: recipient,
      subject: "New user subscribed",
      text: `New user subscribed with the following email ${data.emailAddress}
Pregnant or Expecting: ${data.isPregnant ? "pregnant" : "expecting"}
Health conditions: ${data.healthConditions}
Health condition details: ${data.healthConditionDetail}
Goal details: ${data.goalDetail}`
    }

    try {
        await mailTransport.sendMail(mailOptions);
        console.log(`New user added with email ${data.emailAddress}`);
    } catch(error) {
        console.error('There was an error while sending the email:', error);
    }
})