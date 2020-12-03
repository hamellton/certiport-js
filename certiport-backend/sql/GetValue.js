// get the client
const mysql = require('mysql2');
const config = require('./config');

// create the connection to database
const pool = mysql.createPool(config);

const promisePool = pool.promise();

const getExams = async () => {
  const select = 'SELECT * FROM `exams`';
  const [rows, fields] = await promisePool.query(select, [], (err, results) => {
    if (err) throw err;
  });
  return rows;
};
const getPromo = async (id) => {
  const select = 'SELECT * FROM `promocode` where `ID` = ?';
  const [rows, fields] = await promisePool.query(select, [id], (err, results) => {
    if (err) throw err;
  });
  console.log('Found PROMOCODE: ' + rows);
  return rows;
};

const getCenters = async () => {
  const select = 'SELECT * FROM `centers`';
  const [rows, fields] = await promisePool.query(select, [], (err, results) => {
    if (err) throw err;
  });
  return rows;
};

const getExam = async (id) => {
  const select = 'SELECT * FROM `exams` WHERE `ID` = ?';
  const [rows, fields] = await promisePool.query(select, [id], (err, results) => {
    if (err) throw err;
  });
  // console.log(`levels: ${rows}`);
  return rows[0];
};


const getContract = async (id) => {
  const select = 'SELECT * FROM `contracts` WHERE `ID` = ?';
  const [rows, fields] = await promisePool.query(select, [id], (err, results) => {
    if (err) throw err;
  });
  return rows[0];
};

const getCentersByCity = async (cityName) => {
  const select = 'SELECT * FROM `centers` WHERE `city` = ?';
  const [rows, fields] = await promisePool.query(select, [cityName], (err, results) => {
    if (err) throw err;
  });
  // console.log(`levels: ${rows}`);
  return rows;
};

const getCenterByID = async (id) => {
  const select = 'SELECT * FROM `centers` WHERE `code` = ?';
  const [rows, fields] = await promisePool.query(select, [id], (err, results) => {
    if (err) throw err;
  });
  return rows[0];
};

const getCities = async () => {
  const select = 'SELECT city FROM `centers`';
  const [rows, fields] = await promisePool.query(select, [], (err, results) => {
    if (err) throw err;
  });
  return rows;
};

module.exports = {
  getExams,
  getPromo,
  getCenters,
  getExam,
  getCities,
  getCentersByCity,
  getCenterByID,
  getContract,
  // emailExist,
}