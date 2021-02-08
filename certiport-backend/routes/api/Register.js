const express = require('express');
const bodyParser = require('body-parser');
const email = require('../../emailing/Email');
const sql = require('../../sql/Register');
const sqlGetValue = require('../../sql/GetValue');
const pdf = require('../../pdf/CreateReceipt');
const log = require('../../logger/Pino');
// const path = require('path');
// const appPath = path.join(__dirname, '/payment/liqpay/PayButton');

// const rootPath = path.dirname(require.main.filename);
const liqpay = require('../../payment/liqpay/PayButton');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const test = {
  email: 'test@gmail.com',
};

router.get('/check/email/:email', (req, res) => {
  if (req.params.email === test.email) res.send(`email ${req.params.email} has been founded in database!`);
  else res.send('no email has been found');
});


const createDateString = () => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date();
  return date.toLocaleString('ru', options).split('/').join('.');
};

router.post('/', (req, res) => {
  const userFront = Object.assign(req.body);
  const register = async (user) => {
    const registration = await sql.registerUser(user)
      .catch((err) => {
        log.error(`Error registerUser: ${err}`);
      });

    const exam = await sqlGetValue.getExam(user.exam)
      .catch((err) => {
        log.error(`Error sqlGetValue.exam: ${err}`);
      });

    const date = createDateString();

    // pdf.createReceipt(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
    // pdf.createContract(registration.id, registration.name, registration.lname, exam.name);
    // email.sendReceiptToEmail(registration.id, registration.email, registration.name, exam.name);
    console.log(registration.examonline)
      if (registration.examonline == 2) {
      console.log('Start create for examonline 2')
        pdf.createReceipt(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
      email.sendReceiptToEmailSecond(registration.id, registration.email, registration.name, exam.name,registration.cert1 );
      } else if (registration.examonline == 3) {
        console.log('Start create for examonline 3')
        pdf.createReceipt(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract1(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
        email.sendReceipt1ToEmailSecond(registration.id, registration.email, registration.name, exam.name,registration.cert1);
      } else if (registration.examonline = 0) {
      if (registration.examForPdf == 4 && registration.total == 1100) {
        pdf.createReceipt1(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
        email.sendReceiptToEmail(registration.id, registration.email, registration.name, exam.name,registration.cert1 );
      } else if (registration.examForPdf == 4 && registration.total == 990) {
        pdf.createReceipt2(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
        email.sendReceiptToEmail(registration.id, registration.email, registration.name, exam.name,registration.cert1 );
      } else if (registration.examForPdf == 4 && registration.total == 550) {
        pdf.createReceipt3(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
        email.sendReceiptToEmail(registration.id, registration.email, registration.name, exam.name,registration.cert1 );
      } else if (registration.examForPdf == 2 && registration.total == 0) {
        pdf.createReceipt2(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
        email.sendReceipt2ToEmail(registration.id, registration.email, registration.name, exam.name,registration.cert1 );
      } else {
        pdf.createReceipt(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
        email.sendReceiptToEmail(registration.id, registration.email, registration.name, exam.name,registration.cert1 );
      }
    } else if(registration.examonline = 1) {
      if (registration.examForPdf == 4 && registration.total == 1100) {
        pdf.createReceipt1(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract1(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
        email.sendReceipt1ToEmail(registration.id, registration.email, registration.name, exam.name,registration.cert1);
      } else if (registration.examForPdf == 4 && registration.total == 990) {
        pdf.createReceipt2(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract1(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
        email.sendReceipt1ToEmail(registration.id, registration.email, registration.name, exam.name,registration.cert1);
      } else if (registration.examForPdf == 4 && registration.total == 550) {
        pdf.createReceipt3(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract1(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
        email.sendReceipt1ToEmail(registration.id, registration.email, registration.name, exam.name,registration.cert1);
      } else if (registration.examForPdf == 2 && registration.total == 0) {
        pdf.createReceipt2(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract1(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
        email.sendReceipt2ToEmail(registration.id, registration.email, registration.name, exam.name,registration.cert1);
      } else {
        pdf.createReceipt(registration.id, registration.name, registration.lname, registration.total, exam.name,registration.cert1, date);
        pdf.createContract1(registration.id, registration.name, registration.lname, exam.name, registration.cert1);
        email.sendReceipt1ToEmail(registration.id, registration.email, registration.name, exam.name,registration.cert1);
      }
    }
    email.sendNotificationToIlac('certiport@dinternal.com.ua', registration, exam.name, registration.id);
    res.send(registration);
  };

  register(userFront);
});


router.post('/success', (req, res) => {
  res.send('<h2>Успішна сплата ...</h2>');
});

router.post('/pdf', (req, res) => {
  pdf.createReceipt('test@gmail.com', 'Test', 'Testovych', '1234567890');
  res.send('<h2>рахунок створено!</h2>');
});

router.post('/paid', (req, res) => {
  console.log(req.body);
  email.sendEmailPaid('o.perepichai@gmail.com', 'Aleksandr');
});

module.exports = router;
