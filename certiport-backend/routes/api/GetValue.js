const express = require('express');
const bodyParser = require('body-parser');
const sql = require('../../sql/GetValue');

const router = express.Router();

router.use(bodyParser.urlencoded({
  extended: true,
}));
router.use(bodyParser.json());

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/exams', (req, res) => {
  // console.log('/levels');
  sql.getExams().then((resp) => {
    res.send(resp);
  });
});

router.get('/centers', (req, res) => {
  // console.log('/levels');
  sql.getCenters().then((resp) => {
    res.send(resp);
  })
    .catch(err => {
      console.log(err);
    });
});

router.get('/cities', (req, res) => {
  // console.log('/levels');
  sql.getCities().then((resp) => {
    res.send(resp);
  })
    .catch(err => {
      console.log(err);
    });
});

router.post('/cities', (req, res) => {
  console.log('city '+req.body.name);
  sql.getCentersByCity(req.body.name).then((resp) => {
    res.send(resp);
  })
    .catch(err => {
      console.log(err);
    });
});

router.post('/exams/id', (req, res) => {
  debugger
  if (!req.body.id) {
    res.send({
      price: 0,
    });
  }
  sql.getExam(req.body.id).then((resp) => {
    res.send(resp);
  })
    .catch(err => {
      console.log(err);
    });
});

router.post('/contract/id', (req, res) => {
  if (!req.body.id) {
    res.send({
      id: 0,
    });}
  sql.getContract(req.body.id).then((resp) => {
    res.send(resp);
  })
    .catch(err => {
      console.log(err);
    });
});

router.post('/promo/id', (req, res) => {
  debugger
  if (!req.body.id) {
    debugger
    console.log('Req body is null')
    res.send({
      percentage: 0,
    });
  }
  debugger
  sql.getPromo(req.body.id).then((resp) => {
    debugger
    res.send(resp);
  })
    .catch(err => {
      debugger
      console.log('Unable to run sql promo' + concat(err));
    });
});

module.exports = router;
