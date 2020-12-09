// get the client
const mysql = require('mysql2');
const config = require('./config');
const logger = require('../logger/Pino');

// create the connection to database
const pool = mysql.createPool(config);

const promisePool = pool.promise();

const checkEmailExist = async (email) => {
  const select = 'SELECT * FROM `subscribers` WHERE `email` = ?';
  const [rows, fields] = await promisePool.query(select, [email], (err, results) => {
    if (err) throw err;
  });
  return !!(rows[0]);
};
let registrationInfo = {
  status: 'init',
  id: '',
  number: '-',
  name: '',
  lname: '',
  phone: '',
  email: '',
  total: 0,
  feePercent: 0.0282776,
  fee: 0,
  totalfeesumm: 0,
};

const registerUser = async (val) => {
  await checkEmailExist(val.email)
    .then((result) => {
      // set email exist status
      // registrationInfo.status = (result) ? 'email exist' : 'allow registration';
      // disallow status
      registrationInfo.status = 'allow registration';
    })
    .then(async () => {
      if (registrationInfo.status === 'allow registration') {
        const insert = 'INSERT INTO subscribers(email,phone,name,l_name,age,center,birth,exam_id,session_month,session_year,total,contract_id,comment,examonline,cert1,city) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        const [value] = await promisePool.query(insert, [
          val.email,
          val.phone,
          val.name,
          val.lname,
          val.old || '',
          val.center || '',
          val.birth,
          val.exam,
          val.month || '',
          val.year || '',
          val.cost = (val.promo != 0) ? val.promo : val.cost,
          val.contract,
          val.comment || '',
          val.examonline,
          val.cert1 = (val.cert1 != 0) ? val.cert1 :
              (val.cert2 != 0) ? val.cert2 :
                  (val.cert3 != 0) ? val.cert3 :
                      (val.cert4 != 0) ? val.cert4 :
                          (val.cert5 != 0) ? val.cert5 :
                              (val.cert6 != 0) ? val.cert6 :
                                  (val.cert7 != 0) ? val.cert7 :
                                      (val.cert8 != 0) ? val.cert8 :
                                          (val.cert9 != 0) ? val.cert9 :
                                              (val.cert10 != 0) ? val.cert10 :
                                                  (val.cert11 != 0) ? val.cert11 :
                                                      '',
          // val.examonline = val.examonline = 0 ? 'Скласти іспит в центрі тестування' : 'Скласти іспит онлайн',
          val.city,
        ], (err, results) => {
          if (err) throw err;
        });
        registrationInfo.status = 'registration in progress';
        registrationInfo.id = value.insertId;
        registrationInfo.name = val.name;
        registrationInfo.lname = val.lname;
        registrationInfo.exam = val.cert1;
        registrationInfo.examForPdf = val.exam
        registrationInfo.birth = val.birth;
        registrationInfo.phone = val.phone;
        registrationInfo.email = val.email;
        registrationInfo.total = Number(val.cost).toFixed(2);
        registrationInfo.contract = val.contract;
        registrationInfo.comment = val.comment;
        registrationInfo.examonline = val.examonline;
        registrationInfo.cert1 = val.cert1;
        registrationInfo.cert2 = val.cert2;
        registrationInfo.cert3 = val.cert3;
        registrationInfo.cert4 = val.cert4;
        registrationInfo.cert5 = val.cert5;
        registrationInfo.cert6 = val.cert6;
        registrationInfo.city = val.city;
        registrationInfo.fee = (+val.total * +registrationInfo.feePercent).toFixed(2);
        registrationInfo.totalfeesumm = (+registrationInfo.total + +registrationInfo.fee).toFixed(2);
      }
    })
    .then(async () => {
      if (registrationInfo.status === 'registration in progress') {
        const uniqueNumber = [val.center, val.month, val.year, registrationInfo.id].join('_');
        const update = 'UPDATE subscribers SET number = ? WHERE ID = ?';
        const [value] = await promisePool.query(update, [
          uniqueNumber,
          registrationInfo.id,
        ], (err, results) => {
          if (err) throw err;
        });
        registrationInfo.status = 'registered';
        registrationInfo.number = uniqueNumber;
        logger.info(`registerUser, sql: ${registrationInfo}`);
      }
    })
    .catch((err) => {
      logger.info(err);
      logger.error(err);
    });
  return registrationInfo;
};


module.exports = {
  registerUser,
  // emailExist,
};
