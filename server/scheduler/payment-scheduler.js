const scheduler = require('node-schedule');
const LoanPayments = require('../models/LoanPayments');
const moment = require('moment-timezone');

const con = require('../connection/con');


const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'us2.smtp.mailhostbox.com',
  port: process.env.EMAIL_PORT,
  secure: false,
  ignoreTLS: true,
  auth: {
    user: process.env.EMAIL_USER_ADMIN,
    pass: process.env.EMAIL_PASS_ADMIN,
  }
})

scheduler.scheduleJob('* 8 * * *', async function () {
  const loans = await LoanPayments.mailPayments(con);

  if (loans.length > 0) {
    loans.forEach(l => {
      const loan = [
        {
          date: l.firstPaymentDate,
          amount: l.firstPaymentAmount,
          balance: l.firstPaymentBalance,
          status: l.firstPaymentStatus,
        },
        {
          date: l.secondPaymentDate,
          amount: l.secondPaymentAmount,
          balance: l.secondPaymentBalance,
          status: l.secondPaymentStatus,
        },
        {
          date: l.thirdPaymentDate,
          amount: l.thirdPaymentAmount,
          balance: l.thirdPaymentBalance,
          status: l.thirdPaymentStatus,
        },
        {
          date: l.fourthPaymentDate,
          amount: l.fourthPaymentAmount,
          balance: l.fourthPaymentBalance,
          status: l.fourthPaymentStatus,
        },
        {
          date: l.fifthPaymentDate,
          amount: l.fifthPaymentAmount,
          balance: l.fifthPaymentBalance,
          status: l.fifthPaymentStatus,
        },
        {
          date: l.sixthPaymentDate,
          amount: l.sixthPaymentAmount,
          balance: l.sixthPaymentBalance,
          status: l.sixthPaymentStatus,
        },
        {
          date: l.seventhPaymentDate,
          amount: l.seventhPaymentAmount,
          balance: l.seventhPaymentBalance,
          status: l.seventhPaymentStatus,
        },
        {
          date: l.eighthPaymentDate,
          amount: l.eighthPaymentAmount,
          balance: l.eighthPaymentBalance,
          status: l.eighthPaymentStatus,
        },
        {
          date: l.ninthPaymentDate,
          amount: l.ninthPaymentAmount,
          balance: l.ninthPaymentBalance,
          status: l.ninthPaymentStatus,
        },
        {
          date: l.tenthPaymentDate,
          amount: l.tenthPaymentAmount,
          balance: l.tenthPaymentBalance,
          status: l.tenthPaymentStatus,
        },
        {
          date: l.eleventhPaymentDate,
          amount: l.eleventhPaymentAmount,
          balance: l.eleventhPaymentBalance,
          status: l.eleventhPaymentStatus,
        },
        {
          date: l.twelfthPaymentDate,
          amount: l.twelfthPaymentAmount,
          balance: l.twelfthPaymentBalance,
          status: l.twelfthPaymentStatus,
        },
      ]

      const loanData = loan.filter(ln => (ln.amount > 0 && ln.balance > 0 && (ln.status === 'Unpaid' || ln.status === 'Past Due')))

      if (loanData.length > 0) {
        const inThreeDays = moment().tz('Asia/Manila').add(3, 'd').format('YYYY-MM-DD');
        const inTwoDays = moment().tz('Asia/Manila').add(2, 'd').format('YYYY-MM-DD');
        const inOneDay = moment().tz('Asia/Manila').add(1, 'd').format('YYYY-MM-DD');
        const thisDay = moment().tz('Asia/Manila').format('YYYY-MM-DD');

        loanData.forEach(ldata => {
          const penaltyDate = moment(ldata.date).tz('Asia/Manila').format('YYYY-MM-DD');
          if ((penaltyDate === inThreeDays) || (penaltyDate === inTwoDays) || (penaltyDate === inOneDay) || (penaltyDate <= thisDay)) {
            // Construct Mail
            const mailOptions = {
              from: 'Max808 Lending Corporation <admin@max808lending.com>',
              to: l.email,
              subject: 'Max808 Lending Corporation - Loan Payment Due',
              html: `
                <h4>Greetings, ${l.firstName} ${l.lastName}!</h4>
                <p>Please be reminded that you have a payment deadline on <b>${moment(penaltyDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</b> amounting to <b>&#8369;${ldata.balance}</b> from your loan id <b>${l.loan_id}</b>.</p>
                <p>You also have the option to pay the whole remaining loan balance amounting to <b>&#8369;${l.loanBalance}</b>.</p>
                <p>Failure of payment on the deadline may result to penalties. If you wish to extend your deadline, please contact the admin.</p>
                <p></p>
                <br><br>
                <p>Regards,</p>
                <p>Max808 Lending Corporation</p>
              `
            };

            // Send Mail
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                const error = {
                  error: {
                    details: [{
                      message: "There's a problem in sending email to users."
                    }]
                  }
                }
                console.log(error);
              }
            });
          }
        })
      }
    })
  }
});