const nodemailer = require('nodemailer');
const Email = require('email-templates');

// const transporter = nodemailer.createTransport({
//   host: 'localhost',
//   port: 25,
//   secure: false, // upgrade later with STARTTLS
//   auth: {
//     user: 'pay',
//     pass: 'Jb9L1DavWzA3',
//   },
//   tls: {
//     // do not fail on invalid certs
//     rejectUnauthorized: false,
//   },
// });


//ukr.net
// pXOCBRHiqescKsoX
// smtp.ukr.net
// 2525
// ilacregistration@ukr.net

const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 2525,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: 'ilacregistration@ukr.net',
    pass: 'pXOCBRHiqescKsoX',
  },
  tls: {
  // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

// const transporter = nodemailer.createTransport({
//   debug: true,
//   host: 'mail.dinternal.com.ua',
//   port: 587,
//   // secure: true, // upgrade later with STARTTLS
//   secureConnection: false,
//   tls: {
//     ciphers: 'SSLv3',
//     // do not fail on invalid certs
//     rejectUnauthorized: false,
//   },
//   auth: {
//     user: 'certiport',
//     pass: 'z&p6Q^Fz',
//   },
// });

const email = new Email({
  transport: transporter,
  send: true,
  preview: false,
});

module.exports = email;
