const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');
const log = require('../logger/Pino');

// Define font files
const fonts = {
  Roboto: {
    normal: 'pdf-src/fonts/Roboto-Regular.ttf',
    bold: 'pdf-src/fonts/Roboto-Bold.ttf',
    italics: 'pdf-src/fonts/Roboto-Italic.ttf',
    bolditalics: 'pdf-src/fonts/Roboto-Italic.ttf',
  },
};

const printer = new PdfPrinter(fonts);

// const createReceipt = (useremail, name, lName, number, total) => {
//   const docDefinition = {
//     content: [
//       // every object is new line in pdg file
//       {
//         image: path.resolve('pdf-src/img/logo.png'),
//         width: 100,
//         margin: [0, 0, 0, 20],
//       },
//       {
//         image: path.resolve('pdf-src/img/head.png'),
//         width: 530,
//       },
//       {
//         text: 'ОБОВ’ЯЗКОВО в призначенні платежу вказувати РЕЄСТРАЦІЙНИЙ НОМЕР ТА ПІБ КАНДИДАТА, ЩО СКЛАДАТИМЕ ІСПИТ',
//         style: 'header',
//         bold: true,
//         margin: [10, 10, 0, 10],
//       },
//       {
//         text: `ПІБ кандидата: ${name} ${lName}`,
//         style: 'header',
//         bold: false,
//         margin: [10, 10, 0, 10],
//       },
//       {
//         text: `Реєстраційний номер кандидата: ${number}`,
//         style: 'header',
//         bold: false,
//         margin: [10, 10, 0, 10],
//       },
//       {
//         text: `Сума до сплати: ${total} грн.`,
//         style: 'header',
//         bold: false,
//         margin: [10, 10, 0, 10],
//       },

//     ],
//     defaultStyle: {
//       fontSize: 14,
//       bold: false,
//     },
//   };

//   const options = {
//     // ...
//   };

//   const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
//   pdfDoc.pipe(fs.createWriteStream(`pdfReceipts/${useremail}.pdf`));
//   pdfDoc.end();
//   log.info(`pdfReceipt has been created for: ${useremail}`);
//   console.log(`pdfReceipt has been created for: ${useremail}`);
// };

const createReceipt = (id, name, lName, total, totalpromo, examName, date) => {
  const docDefinition = {
    background: [
      {
        image: path.resolve('pdf-src/img/bg.png'),
        width: 570,
      },
    ],
    content: [
      // every object is new line in pdg file
      // {
      //   image: path.resolve('pdf-src/img/logo.png'),
      //   width: 100,
      //   margin: [0, 0, 0, 20],
      // },
      {
        text: `№ ${id}            від  ${date}`,
        style: 'header',
        bold: true,
        margin: [110, 135, 0, 20],
      },
      {
        text: `${name} ${lName}`,
        style: 'header',
        bold: false,
        margin: [30, 35, 0, 13],
      },
      {
        text: `${total}          ${total}`,
        style: 'textStyle',
        bold: false,
        margin: [415, 42, 0, 10],
      },
      {
        text: `${total} грн.`,
        style: 'header',
        bold: false,
        margin: [430, 0, 0, 10],
      },
      {
        text: `${total}`,
        style: 'textStyle',
        bold: false,
        margin: [87, 0, 0, 10],
      },
      {
        text: `"Оплата за інформаційно-організаційні послуги з-но рахунку ${id} від ${date}. Без ПДВ"`,
        style: 'textFooter',
        bold: false,
        margin: [0, 120, 0, 10],
      },

    ],
    defaultStyle: {
      fontSize: 14,
      bold: false,
    },
    styles: {
      textStyle: {
        fontSize: 8,
        bold: false,
      },
      textFooter: {
        fontSize: 12,
        bold: false,
      },
    },
  };

  const options = {
    // ...
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream(`pdfReceipts/${id}.pdf`));
  pdfDoc.end();
  log.info(`pdfReceipt has been created for: ${name} ${lName}, id ${id}`);
  console.log(`pdfReceipt has been created for: ${name} ${lName}, id ${id}`);
};

const createReceipt1 = (id, name, lName, total, totalpromo, examName, date) => {
  const docDefinition = {
    background: [
      {
        image: path.resolve('pdf-src/img/bg.png'),
        width: 570,
      },
    ],
    content: [
      // every object is new line in pdg file
      // {
      //   image: path.resolve('pdf-src/img/logo.png'),
      //   width: 100,
      //   margin: [0, 0, 0, 20],
      // },
      {
        text: `№ ${id}            від  ${date}`,
        style: 'header',
        bold: true,
        margin: [110, 135, 0, 20],
      },
      {
        text: `${name} ${lName}`,
        style: 'header',
        bold: false,
        margin: [30, 35, 0, 13],
      },
      {
        text: `${total}          ${total}`,
        style: 'textStyle',
        bold: false,
        margin: [415, 42, 0, 10],
      },
      {
        text: `${total} грн.`,
        style: 'header',
        bold: false,
        margin: [430, 0, 0, 10],
      },
      {
        text: `${total}`,
        style: 'textStyle',
        bold: false,
        margin: [87, 0, 0, 10],
      },
      {
        text: `"Оплата за інформаційно-організаційні послуги з-но рахунку ${id} від ${date}. Без ПДВ"`,
        style: 'textFooter',
        bold: false,
        margin: [0, 120, 0, 10],
      },

    ],
    defaultStyle: {
      fontSize: 14,
      bold: false,
    },
    styles: {
      textStyle: {
        fontSize: 8,
        bold: false,
      },
      textFooter: {
        fontSize: 12,
        bold: false,
      },
    },
  };

  const options = {
    // ...
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream(`pdfReceipts/${id}.pdf`));
  pdfDoc.end();
  log.info(`pdfReceipt1 has been created for: ${name} ${lName}, id ${id}`);
  console.log(`pdfReceipt1 has been created for: ${name} ${lName}, id ${id}`);
};

const createContract = (id, name, lName, examName, cert1) => {
  const docDefinition = {
    // background: [
    //   {
    //     image: path.resolve('pdf-src/img/contract/1.png'),
    //     width: 600,
    //     pageBreak: 'after',
    //   },
    // ],
    content: [
      // every object is new line in pdg file
      // {
      //   image: path.resolve('pdf-src/img/logo.png'),
      //   width: 100,
      //   margin: [0, 0, 0, 20],
      // },
      {
        image: path.resolve('pdf-src/img/contract/1.png'),
        width: 550,
      },
      {
        text: cert1,
        style: 'textStyle',
        absolutePosition: { x: 53, y: 277 },
      },
      {
        image: path.resolve('pdf-src/img/contract/2.png'),
        width: 550,
      },
      {
        text: `${name} ${lName}`,
        style: 'header',
        absolutePosition: { x: 200, y: 625 },
      },
      {
        image: path.resolve('pdf-src/img/contract/3.png'),
        width: 550,
        pageBreak: 'after',
      },
      {
        image: path.resolve('pdf-src/img/contract/4.png'),
        width: 550,
        pageBreak: 'after',
      },
      {
        image: path.resolve('pdf-src/img/contract/5.png'),
        width: 550,
        pageBreak: 'after',
      },
      {
        image: path.resolve('pdf-src/img/contract/6.png'),
        width: 550,
        pageBreak: 'after',
      },
      {
        image: path.resolve('pdf-src/img/contract/7.png'),
        width: 550,
        pageBreak: 'after',
      },
      {
        image: path.resolve('pdf-src/img/contract/8.png'),
        width: 550,
        pageBreak: 'after',
      },
      {
        image: path.resolve('pdf-src/img/contract/9.png'),
        width: 550,
      },

    ],
    defaultStyle: {
      fontSize: 14,
      bold: false,
    },
    styles: {
      textStyle: {
        fontSize: 9,
        bold: true,
      },
    },
  };

  const options = {
    // ...
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream(`pdfContracts/${id}.pdf`));
  pdfDoc.end();
  log.info(`pdfContract has been created for: ${name} ${lName}, id ${id}`);
  console.log(`pdfContract has been created for: ${name} ${lName}, id ${id}`);
};
const createContract1 = (id, name, lName, examName, cert1) => {
  const docDefinition = {
    // background: [
    //   {
    //     image: path.resolve('pdf-src/img/contract/1.png'),
    //     width: 600,
    //     pageBreak: 'after',
    //   },
    // ],
    content: [
      // every object is new line in pdg file
      // {
      //   image: path.resolve('pdf-src/img/logo.png'),
      //   width: 100,
      //   margin: [0, 0, 0, 20],
      // },
      {
        image: path.resolve('pdf-src/img/contract/11.png'),
        width: 550,
      },
      {
        text: cert1,
        style: 'textStyle',
        absolutePosition: { x: 273, y: 277 },
      },
      {
        image: path.resolve('pdf-src/img/contract/22.png'),
        width: 550,
      },
      {
        text: `${name} ${lName}`,
        style: 'header',
        absolutePosition: { x: 200, y: 613 },
      },
      {
        image: path.resolve('pdf-src/img/contract/33.png'),
        width: 550,
        pageBreak: 'after',
      },
      {
        image: path.resolve('pdf-src/img/contract/44.png'),
        width: 550,
        pageBreak: 'after',
      },
      {
        image: path.resolve('pdf-src/img/contract/55.png'),
        width: 550,
        pageBreak: 'after',
      },
      {
        image: path.resolve('pdf-src/img/contract/66.png'),
        width: 550,
        pageBreak: 'after',
      },
      {
        image: path.resolve('pdf-src/img/contract/77.png'),
        width: 550,
        pageBreak: 'after',
      },
      {
        image: path.resolve('pdf-src/img/contract/88.png'),
        width: 550,
        pageBreak: 'after',
      },
      // {
      //   image: path.resolve('pdf-src/img/contract/9.png'),
      //   width: 550,
      // },

    ],
    defaultStyle: {
      fontSize: 14,
      bold: false,
    },
    styles: {
      textStyle: {
        fontSize: 9,
        bold: true,
      },
    },
  };

  const options = {
    // ...
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream(`pdfContracts1/${id}.pdf`));
  pdfDoc.end();
  log.info(`pdfContract has been created for: ${name} ${lName}, id ${id}`);
  console.log(`pdfContract has been created for: ${name} ${lName}, id ${id}`);
};

module.exports = {
  createReceipt,
  createReceipt1,
  createContract,
  createContract1,
};
