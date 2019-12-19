const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/middleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const moment = require('moment');

// Setup Nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'us2.smtp.mailhostbox.com',
  port: 25,
  secure: false,
  ignoreTLS: true,
  auth: {
    user: process.env.EMAIL_USER_ADMIN,
    pass: process.env.EMAIL_PASS_ADMIN,
  }
})

// DB Connection
const con = require('../../connection/con');

const Loan = require('../../models/Loan');
const LoanPayments = require('../../models/LoanPayments');

router.get('/find/:id', userMiddleware, async (req, res) => {
  const loanId = req.params.id;

  const loanData = await Loan.getAllData(con, loanId);
  const data = {
    loanData: loanData[0]
  }
  return res.json(data);
})

router.get('/get-latest', async (req, res) => {
  console.log(req.user);
  const loans = await Loan.getLatest(con, req.user.id);
  return res.json(loans);
})

router.get('/count/:status', adminMiddleware, async (req, res) => {
  const status = req.params.status === 'all' ? '' : req.params.status.toLowerCase();
  const count = await Loan.loanCount(con, status);

  return res.json(count);
})

router.get('/all', adminMiddleware, async (req, res) => {
  const allLoans = await Loan.all(con);
  const data = {
    success: true,
    allLoans
  }

  return res.json(data);
})

router.get('/pending', adminMiddleware, async (req, res) => {
  const pendingLoans = await Loan.pendingLoans(con);
  const data = {
    success: true,
    pendingLoans
  }

  return res.json(data);
})

router.get('/active', adminMiddleware, async (req, res) => {
  const activeLoans = await Loan.activeLoans(con);
  const data = {
    success: true,
    activeLoans
  }

  return res.json(data);
})

router.get('/approved', adminMiddleware, async (req, res) => {
  const approvedLoans = await Loan.approvedLoans(con);
  const data = {
    success: true,
    approvedLoans
  }

  return res.json(data);
})

router.get('/accepted', adminMiddleware, async (req, res) => {
  const acceptedLoans = await Loan.acceptedLoans(con);
  const data = {
    success: true,
    acceptedLoans
  }

  return res.json(data);
})

router.get('/fully-paid', adminMiddleware, async (req, res) => {
  const fullyPaidLoans = await Loan.fullyPaidLoans(con);
  const data = {
    success: true,
    fullyPaidLoans
  }

  return res.json(data);
})

router.get('/rejected', adminMiddleware, async (req, res) => {
  const rejectedLoans = await Loan.rejectedLoans(con);
  const data = {
    success: true,
    rejectedLoans
  }

  return res.json(data);
})

router.post('/approve/:id', adminMiddleware, async (req, res) => {
  const { loanCharges, paymentTerms, userDetails } = req.body;
  const loanId = req.params.id;
  const newLoanPayments = await LoanPayments.addNew(con, paymentTerms, loanId);

  const fail = {
    success: false,
    message: "There's an error in approving your request."
  }

  if (newLoanPayments.affectedRows > 0) {
    const approveLoanRequest = await Loan.approveRequest(con, loanCharges, loanId);
    if (approveLoanRequest.affectedRows > 0) {
      const newData = await Loan.getAllData(con, loanId);
      const data = {
        success: true,
        loanData: newData[0]
      }
      // Construct Mail
      const mailOptions = {
        from: 'Max808 Lending Corporation <admin@max808lending.com>',
        to: userDetails.email,
        subject: 'Max808 Lending Corporation - Loan Request Approved',
        html: `
    <p>Good day, ${userDetails.fullName}!</p>
    <p>Your Loan Request with the ID of ${loanId} has been approved with the terms below:</p>
    <div style="padding: 10px 40px;">
      <p>Amount: <span style="color:#187cbc">&#8369;${loanCharges.amount}</span></p>
      <p>Finance Charge: <span style="color:#187cbc">&#8369;${loanCharges.amount * (loanCharges.financeCharge / 100)}</span></p>
      <p>Processing Fee: <span style="color:#187cbc">&#8369;${loanCharges.amount * (2 / 100)}</span></p>
      <p>Service Fee: <span style="color:#187cbc">&#8369;${loanCharges.amount * (loanCharges.serviceFee / 100)}</span></p>
      <p>Terms: <span style="color:#187cbc">${loanCharges.terms} days</p>
      <p>Due Date: <span style="color:#187cbc">${moment(loanCharges.dueDate).format('MMMM DD, YYYY')}</span></p>
      <p>Loan Proceeds / Receivable Amount: <span style="color:#187cbc"><b>&#8369;${loanCharges.loanProceeds}</b></span></p>
    </div>
    <br />
    Please login to your dashboard to Accept / Refuse the loan terms. Thank you!
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
                message: "There's a problem in sending email verification link."
              }]
            }
          }

          return res.json(error);
        }
      });
      return res.json(data);
    } else {
      return res.json(fail)
    }
  } else {
    return res.json(fail)
  }
})

router.get('/loan-payments/:id', userMiddleware, async (req, res) => {
  const loanId = req.params.id;

  const loanPaymentsData = await LoanPayments.get(con, loanId);

  return res.json(loanPaymentsData);
})

router.put('/reject/:id', adminMiddleware, async (req, res) => {
  const loanId = req.params.id;

  const rejectedRequest = await Loan.rejectRequest(con, loanId);

  const fail = {
    success: false,
    message: "There's an error in approving your request."
  }

  if (rejectedRequest.affectedRows > 0) {
    const newData = await Loan.getAllData(con, loanId);
    const data = {
      success: true,
      loanData: newData[0]
    }
    return res.json(data);
  } else {

    return res.json(fail);
  }
})

router.put('/to-active/:id', adminMiddleware, async (req, res) => {
  const loanId = req.params.id;

  const rejectedRequest = await Loan.setToActive(con, loanId);

  const fail = {
    success: false,
    message: "There's an error in approving your request."
  }

  if (rejectedRequest.affectedRows > 0) {
    const newData = await Loan.getAllData(con, loanId);
    const data = {
      success: true,
      loanData: newData[0]
    }
    // Construct Mail
    const mailOptions = {
      from: 'Max808 Lending Corporation <admin@max808lending.com>',
      to: req.body.email,
      subject: 'Max808 Lending Corporation - Loan Request Active',
      html: `
        <p>Good day!</p>
        <p>Your Loan Request with the ID of ${loanId} is now active!</p>
        <p>We have sent an amount in total of <span style="color:#187cbc"><b>&#8369;${req.body.loanProceeds}</b></span> to your bank account.</p>
        <div style="padding: 10px 40px;">
          <p>Finance Charge: <span style="color:#187cbc">&#8369;${req.body.amount * (req.body.financeCharge / 100)}</span></p>
          <p>Processing Fee: <span style="color:#187cbc">&#8369;${req.body.amount * (2 / 100)}</span></p>
          <p>Service Fee: <span style="color:#187cbc">&#8369;${req.body.amount * (req.body.serviceFee / 100)}</span></p>
          <p>Due Date: <span style="color:#187cbc">${moment(req.body.dueDate).format('MMMM DD, YYYY')}</span></p>
          <p><b>Loan Proceeds: <span style="color:#187cbc">&#8369;${req.body.loanProceeds}</span></b></p>
          <p><b>Total Loan Payable Amount: <span style="color:#187cbc">&#8369;${req.body.amount}</span></b></p>
          </div>
        <p style="color:#ff6868;"><em>**Please note that being unable to pay loan in due date may result to penalties.**</em></p>
        <p>Thank you for choosing Max808 Lending Corporation!</p>
        <br /><br />
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
              message: "There's a problem in sending email verification link."
            }]
          }
        }

        return res.json(error);
      }
    });
    return res.json(data);
  } else {

    return res.json(fail);
  }
})

router.put('/update-active-loan/:id', adminMiddleware, async (req, res) => {
  const loanId = req.params.id;
  const updatedLoanPayments = await LoanPayments.updatePayments(con, loanId, req.body);

  const fail = {
    success: false,
    message: "There's an error in approving your request."
  }

  if (updatedLoanPayments.affectedRows > 0) {
    const totalPaid = req.body.firstPaid + req.body.secondPaid + req.body.thirdPaid + req.body.fourthPaid + req.body.fifthPaid + req.body.sixthPaid + req.body.seventhPaid + req.body.eighthPaid + req.body.ninthPaid + req.body.tenthPaid + req.body.eleventhPaid + req.body.twelfthPaid;
    const totalPenalty = req.body.firstPenalty + req.body.secondPenalty + req.body.thirdPenalty + req.body.fourthPenalty + req.body.fifthPenalty + req.body.sixthPenalty + req.body.seventhPenalty + req.body.eighthPenalty + req.body.ninthPenalty + req.body.tenthPenalty + req.body.eleventhPenalty + req.body.twelfthPenalty;
    const totalBalance = req.body.firstBalance + req.body.secondBalance + req.body.thirdBalance + req.body.fourthBalance + req.body.fifthBalance + req.body.sixthBalance + req.body.seventhBalance + req.body.eighthBalance + req.body.ninthBalance + req.body.tenthBalance + req.body.eleventhBalance + req.body.twelfthBalance;
    const totals = {
      totalPaid,
      totalPenalty,
      totalBalance
    }
    const updateLoanData = await Loan.updatePaidPenaltyBalance(con, loanId, totals);

    if (updateLoanData.affectedRows > 0) {
      const newData = await LoanPayments.get(con, loanId);
      const data = {
        success: true,
        loanData: newData[0]
      }
      return res.json(data);
    } else {
      return res.json(fail);
    }

  } else {
    return res.json(fail);
  }
})

router.put('/set-fully-paid/:id', adminMiddleware, async (req, res) => {
  const loanId = req.params.id;
  const updatedLoanPayments = await LoanPayments.updatePayments(con, loanId, req.body);

  const fail = {
    success: false,
    message: "There's an error in approving your request."
  }

  if (updatedLoanPayments.affectedRows > 0) {
    const totalPaid = req.body.firstPaid + req.body.secondPaid + req.body.thirdPaid + req.body.fourthPaid + req.body.fifthPaid + req.body.sixthPaid + req.body.seventhPaid + req.body.eighthPaid + req.body.ninthPaid + req.body.tenthPaid + req.body.eleventhPaid + req.body.twelfthPaid;
    const totalPenalty = req.body.firstPenalty + req.body.secondPenalty + req.body.thirdPenalty + req.body.fourthPenalty + req.body.fifthPenalty + req.body.sixthPenalty + req.body.seventhPenalty + req.body.eighthPenalty + req.body.ninthPenalty + req.body.tenthPenalty + req.body.eleventhPenalty + req.body.twelfthPenalty;
    const totalBalance = req.body.firstBalance + req.body.secondBalance + req.body.thirdBalance + req.body.fourthBalance + req.body.fifthBalance + req.body.sixthBalance + req.body.seventhBalance + req.body.eighthBalance + req.body.ninthBalance + req.body.tenthBalance + req.body.eleventhBalance + req.body.twelfthBalance;
    const totals = {
      totalPaid,
      totalPenalty,
      totalBalance
    }
    const updateLoanData = await Loan.updatePaidPenaltyBalanceStatus(con, loanId, totals, 'Fully Paid');

    if (updateLoanData.affectedRows > 0) {
      const newData = await LoanPayments.get(con, loanId);
      const data = {
        success: true,
        loanData: newData[0]
      }
      return res.json(data);
    } else {
      return res.json(fail);
    }

  } else {
    return res.json(fail);
  }
})

module.exports = router;