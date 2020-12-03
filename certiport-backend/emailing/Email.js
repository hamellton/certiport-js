const email = require('./config');

const sendEmail = (useremail, name, details, email) => {
    email.send({
        template: 'hello',
        message: {
            // from: 'ILAC <ilacregistration@ukr.net>',
            from: 'Certiport <certiportukraine@gmail.com>',
            to: useremail,
            // cc: 'ilacregistration@ukr.net',
        },
        locals: {
            fname: name,
            details,
        },
    }).then(() => console.log(`email has been send to ${useremail}!`));
};

const sendEmailPaid = (useremail, name) => {
    email.send({
        template: 'successPaid',
        message: {
            // from: 'ILAC <ilacregistration@ukr.net>',
            from: 'Certiport <certiportukraine@gmail.com>',
            to: useremail,
            // cc: 'ilacregistration@ukr.net',
            attachments: [{
                filename: 'ticket.pdf',
                path: `pdfReceipts/${useremail}.pdf`,
            }],
        },
        locals: {
            fname: name,
        },
    }).then(() => console.log('emailPaid has been send!'));
};

const sendReceiptToEmail = (id, useremail, name, exam) => {
    email.send({
        template: 'receipt',
        message: {
            // from: 'Certiport <certiport@dinternal.com.ua>',
            // from: 'Certiport <ilacregistration@ukr.net>',
            from: 'Certiport <certiportukraine@gmail.com>',

            to: useremail,
            // cc: 'ilac.kyiv@gmail.com',
            attachments: [{
                    filename: 'Рахунок.pdf',
                    path: `pdfReceipts/${id}.pdf`,
                },
                {
                    filename: 'Договір.pdf',
                    path: `pdfContracts/${id}.pdf`,
                }
            ],
        },
        locals: {
            fname: name,
            exam,
            useremail,
            id,
        },
    }).then(() => console.log(`Receipt and Contract have been send to candidate ${name}, ${useremail}`));
};
const sendReceipt1ToEmail = (id, useremail, name, exam, cert1) => {
    email.send({
        template: 'receipt1',
        message: {
            // from: 'Certiport <certiport@dinternal.com.ua>',
            // from: 'Certiport <ilacregistration@ukr.net>',
            from: 'Certiport <certiportukraine@gmail.com>',

            to: useremail,
            // cc: 'ilac.kyiv@gmail.com',
            attachments: [{
                    filename: 'Рахунок.pdf',
                    path: `pdfReceipts/${id}.pdf`,
                },
                {
                    filename: 'Договір.pdf',
                    path: `pdfContracts1/${id}.pdf`,
                }
            ],
        },
        locals: {
            fname: name,
            exam,
            useremail,
            id,
            cert1,
        },
    }).then(() => console.log(`Receipt and Contract have been send to candidate ${name}, ${useremail}`));
};


const sendNotificationToCenterEmail = (useremail, student, level) => {
    email.send({
        template: 'centerNotification',
        message: {
            // from: 'ILAC <ilacregistration@ukr.net>',
            from: 'Certiport <certiportukraine@gmail.com>',
            to: useremail,
            // to: 'o.perepichai@gmail.com',
            attachments: [{
                filename: 'receipt.pdf',
                path: `pdfReceipts/${student.id}.pdf`,
            }],
            // cc: 'ilac.kyiv@gmail.com',
        },
        locals: {
            student,
            level,
        },
    }).then(() => console.log(`email has been send to center ${useremail}!`));
};

const sendNotificationToIlac = (useremail, student, level, userID) => {
    email.send({
        template: 'notificationIlac',
        message: {
            // from: 'Certiport <ilacregistration@ukr.net>',
            from: 'Certiport <certiportukraine@gmail.com>',

            to: useremail,
            attachments: [{
                filename: 'Рахунок.pdf',
                path: `pdfReceipts/${userID}.pdf`,
            }],
        },
        locals: {
            student,
            level,
        },
    }).then(() => console.log(`email has been send to ILAC ${useremail}!`));
};


module.exports = {
    sendEmail,
    sendEmailPaid,
    sendReceiptToEmail,
    sendReceipt1ToEmail,
    sendNotificationToCenterEmail,
    sendNotificationToIlac,
}