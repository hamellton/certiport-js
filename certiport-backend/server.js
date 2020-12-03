const express = require('express');

const app = express();
const expressPino = require('express-pino-logger');
const log = require('./logger/Pino');

const expressLogger = expressPino({ log });


const PORT = process.env.PORT || 8050;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
app.use(expressLogger);

app.use('/api/register/', require('./routes/api/Register'));
app.use('/api/liqpay/', require('./routes/api/Liqpay'));
app.use('/api/get/', require('./routes/api/GetValue'));
