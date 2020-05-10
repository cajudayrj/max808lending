const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/middleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const moment = require('moment-timezone');

// Setup Nodemailer
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

// DB Connection
const con = require('../../connection/con');

const Loan = require('../../models/Loan');
const LoanPayments = require('../../models/LoanPayments');
const UserTransactions = require('../../models/UserTransactions');

router.get('/find/:id', userMiddleware, async (req, res) => {
  const loanId = req.params.id;

  const loanData = await Loan.getAllData(con, loanId);
  const data = {
    loanData: loanData[0]
  }
  return res.json(data);
})

router.get('/get-latest', userMiddleware, async (req, res) => {
  const loans = await Loan.getLatest(con, req.user.id);
  return res.json(loans);
})

router.get('/count/:status', adminMiddleware, async (req, res) => {
  const status = req.params.status === 'all' ? '' : req.params.status.toLowerCase();
  const count = await Loan.loanCount(con, status);

  return res.json(count);
})

router.get('/all/page/:pageId', adminMiddleware, async (req, res) => {
  const allLoans = await Loan.all(con, req.params.pageId);
  const allLoanRecord = await Loan.allCount(con, req.params.pageId);
  const totalPage = allLoans.length > 0 ? Math.ceil(allLoans[0].fullCount / 20) : 1;

  allLoanRecord.forEach(loan => loan.loanDate = moment(loan.loanDate).tz('Asia/Manila').format('YYYY-MMMM-DD'));
  const data = {
    success: true,
    totalPage,
    allLoans,
    allLoanRecord
  }

  return res.json(data);
})

router.get('/pending/page/:pageId', adminMiddleware, async (req, res) => {
  const pendingLoans = await Loan.pendingLoans(con, req.params.pageId);
  const totalPage = pendingLoans.length > 0 ? Math.ceil(pendingLoans[0].fullCount / 20) : 1;
  const data = {
    success: true,
    pendingLoans,
    totalPage
  }

  return res.json(data);
})

router.get('/active/page/:pageId', adminMiddleware, async (req, res) => {
  const activeLoans = await Loan.activeLoans(con, req.params.pageId);
  const totalPage = activeLoans.length > 0 ? Math.ceil(activeLoans[0].fullCount / 20) : 1;
  const data = {
    success: true,
    totalPage,
    activeLoans
  }

  return res.json(data);
});

router.get('/generate/active', adminMiddleware, async (req, res) => {
  const activeLoans = await Loan.generateActiveLoans(con);
  let total = 0;
  activeLoans.forEach(loan => total += loan.loanBalance);

  activeLoans.push({
    amount: "TOTAL",
    loanBalance: total,
  })

  const data = {
    success: true,
    activeLoans
  }

  return res.json(data);
});

router.get('/generate/summary-schedule', adminMiddleware, async (req, res) => {
  const activeLoans = await Loan.generateActiveLoans(con);
  let paymentScedules = [];

  activeLoans.forEach(loan => {
    let first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, eleventh, twelfth;

    if (loan.firstPaymentAmount > 0) {
      first = {
        position: 1,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.firstPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.firstPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.firstPaymentPenalty.toFixed(2),
        paid: loan.firstPaymentPaid.toFixed(2),
        balance: loan.firstPaymentBalance.toFixed(2),
        status: loan.firstPaymentStatus,
      }

      paymentScedules.push(first);
    }

    if (loan.secondPaymentAmount > 0) {
      second = {
        position: 2,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.secondPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.secondPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.secondPaymentPenalty.toFixed(2),
        paid: loan.secondPaymentPaid.toFixed(2),
        balance: loan.secondPaymentBalance.toFixed(2),
        status: loan.secondPaymentStatus,
      }

      paymentScedules.push(second);
    }

    if (loan.thirdPaymentAmount > 0) {
      third = {
        position: 3,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.thirdPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.thirdPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.thirdPaymentPenalty.toFixed(2),
        paid: loan.thirdPaymentPaid.toFixed(2),
        balance: loan.thirdPaymentBalance.toFixed(2),
        status: loan.thirdPaymentStatus,
      }

      paymentScedules.push(third);
    }

    if (loan.fourthPaymentAmount > 0) {
      fourth = {
        position: 4,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.fourthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.fourthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.fourthPaymentPenalty.toFixed(2),
        paid: loan.fourthPaymentPaid.toFixed(2),
        balance: loan.fourthPaymentBalance.toFixed(2),
        status: loan.fourthPaymentStatus,
      }

      paymentScedules.push(fourth);
    }

    if (loan.fifthPaymentAmount > 0) {
      fifth = {
        position: 5,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.fifthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.fifthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.fifthPaymentPenalty.toFixed(2),
        paid: loan.fifthPaymentPaid.toFixed(2),
        balance: loan.fifthPaymentBalance.toFixed(2),
        status: loan.fifthPaymentStatus,
      }

      paymentScedules.push(fifth);
    }

    if (loan.sixthPaymentAmount > 0) {
      sixth = {
        position: 6,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.sixthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.sixthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.sixthPaymentPenalty.toFixed(2),
        paid: loan.sixthPaymentPaid.toFixed(2),
        balance: loan.sixthPaymentBalance.toFixed(2),
        status: loan.sixthPaymentStatus,
      }

      paymentScedules.push(sixth);
    }

    if (loan.seventhPaymentAmount > 0) {
      seventh = {
        position: 7,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.seventhPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.seventhPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.seventhPaymentPenalty.toFixed(2),
        paid: loan.seventhPaymentPaid.toFixed(2),
        balance: loan.seventhPaymentBalance.toFixed(2),
        status: loan.seventhPaymentStatus,
      }

      paymentScedules.push(seventh);
    }


    if (loan.eighthPaymentAmount > 0) {
      eighth = {
        position: 8,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.eighthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.eighthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.eighthPaymentPenalty.toFixed(2),
        paid: loan.eighthPaymentPaid.toFixed(2),
        balance: loan.eighthPaymentBalance.toFixed(2),
        status: loan.eighthPaymentStatus,
      }

      paymentScedules.push(eighth);
    }


    if (loan.ninthPaymentAmount > 0) {
      ninth = {
        position: 9,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.ninthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.ninthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.ninthPaymentPenalty.toFixed(2),
        paid: loan.ninthPaymentPaid.toFixed(2),
        balance: loan.ninthPaymentBalance.toFixed(2),
        status: loan.ninthPaymentStatus,
      }

      paymentScedules.push(ninth);
    }

    if (loan.tenthPaymentAmount > 0) {
      tenth = {
        position: 10,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.tenthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.tenthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.tenthPaymentPenalty.toFixed(2),
        paid: loan.tenthPaymentPaid.toFixed(2),
        balance: loan.tenthPaymentBalance.toFixed(2),
        status: loan.tenthPaymentStatus,
      }

      paymentScedules.push(tenth);
    }

    if (loan.eleventhPaymentAmount > 0) {
      eleventh = {
        position: 11,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.eleventhPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.eleventhPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.eleventhPaymentPenalty.toFixed(2),
        paid: loan.eleventhPaymentPaid.toFixed(2),
        balance: loan.eleventhPaymentBalance.toFixed(2),
        status: loan.eleventhPaymentStatus,
      }

      paymentScedules.push(eleventh);
    }

    if (loan.twelfthPaymentAmount > 0) {
      twelfth = {
        position: 12,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.twelfthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.twelfthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.twelfthPaymentPenalty.toFixed(2),
        paid: loan.twelfthPaymentPaid.toFixed(2),
        balance: loan.twelfthPaymentBalance.toFixed(2),
        status: loan.twelfthPaymentStatus,
      }

      paymentScedules.push(twelfth);
    }
  });

  const sortedPaymentSchedules = paymentScedules.sort((a, b) => new Date(a.amortizationDate) - new Date(b.amortizationDate));

  let total = 0;
  sortedPaymentSchedules.forEach(loan => total += parseFloat(loan.balance));

  sortedPaymentSchedules.push({
    paid: "TOTAL",
    balance: parseInt(total)
  });

  const data = {
    success: true,
    schedules: sortedPaymentSchedules
  }

  return res.json(data);
});

router.get('/payment-summary-schedule', adminMiddleware, async (req, res) => {
  const activeLoans = await Loan.generateActiveLoans(con);
  let paymentScedules = [];

  activeLoans.forEach(loan => {
    let first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, eleventh, twelfth;

    if (loan.firstPaymentAmount > 0 && loan.firstPaymentStatus !== "Paid") {
      first = {
        position: 1,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.firstPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.firstPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.firstPaymentPenalty.toFixed(2),
        paid: loan.firstPaymentPaid.toFixed(2),
        balance: loan.firstPaymentBalance.toFixed(2),
        status: loan.firstPaymentStatus,
      }

      paymentScedules.push(first);
    }

    if (loan.secondPaymentAmount > 0 && loan.secondPaymentStatus !== "Paid") {
      second = {
        position: 2,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.secondPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.secondPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.secondPaymentPenalty.toFixed(2),
        paid: loan.secondPaymentPaid.toFixed(2),
        balance: loan.secondPaymentBalance.toFixed(2),
        status: loan.secondPaymentStatus,
      }

      paymentScedules.push(second);
    }

    if (loan.thirdPaymentAmount > 0 && loan.thirdPaymentStatus !== "Paid") {
      third = {
        position: 3,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.thirdPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.thirdPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.thirdPaymentPenalty.toFixed(2),
        paid: loan.thirdPaymentPaid.toFixed(2),
        balance: loan.thirdPaymentBalance.toFixed(2),
        status: loan.thirdPaymentStatus,
      }

      paymentScedules.push(third);
    }

    if (loan.fourthPaymentAmount > 0 && loan.fourthPaymentStatus !== "Paid") {
      fourth = {
        position: 4,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.fourthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.fourthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.fourthPaymentPenalty.toFixed(2),
        paid: loan.fourthPaymentPaid.toFixed(2),
        balance: loan.fourthPaymentBalance.toFixed(2),
        status: loan.fourthPaymentStatus,
      }

      paymentScedules.push(fourth);
    }

    if (loan.fifthPaymentAmount > 0 && loan.fifthPaymentStatus !== "Paid") {
      fifth = {
        position: 5,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.fifthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.fifthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.fifthPaymentPenalty.toFixed(2),
        paid: loan.fifthPaymentPaid.toFixed(2),
        balance: loan.fifthPaymentBalance.toFixed(2),
        status: loan.fifthPaymentStatus,
      }

      paymentScedules.push(fifth);
    }

    if (loan.sixthPaymentAmount > 0 && loan.sixthPaymentStatus !== "Paid") {
      sixth = {
        position: 6,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.sixthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.sixthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.sixthPaymentPenalty.toFixed(2),
        paid: loan.sixthPaymentPaid.toFixed(2),
        balance: loan.sixthPaymentBalance.toFixed(2),
        status: loan.sixthPaymentStatus,
      }

      paymentScedules.push(sixth);
    }

    if (loan.seventhPaymentAmount > 0 && loan.seventhPaymentStatus !== "Paid") {
      seventh = {
        position: 7,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.seventhPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.seventhPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.seventhPaymentPenalty.toFixed(2),
        paid: loan.seventhPaymentPaid.toFixed(2),
        balance: loan.seventhPaymentBalance.toFixed(2),
        status: loan.seventhPaymentStatus,
      }

      paymentScedules.push(seventh);
    }


    if (loan.eighthPaymentAmount > 0 && loan.eighthPaymentStatus !== "Paid") {
      eighth = {
        position: 8,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.eighthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.eighthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.eighthPaymentPenalty.toFixed(2),
        paid: loan.eighthPaymentPaid.toFixed(2),
        balance: loan.eighthPaymentBalance.toFixed(2),
        status: loan.eighthPaymentStatus,
      }

      paymentScedules.push(eighth);
    }


    if (loan.ninthPaymentAmount > 0 && loan.ninthPaymentStatus !== "Paid") {
      ninth = {
        position: 9,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.ninthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.ninthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.ninthPaymentPenalty.toFixed(2),
        paid: loan.ninthPaymentPaid.toFixed(2),
        balance: loan.ninthPaymentBalance.toFixed(2),
        status: loan.ninthPaymentStatus,
      }

      paymentScedules.push(ninth);
    }

    if (loan.tenthPaymentAmount > 0 && loan.tenthPaymentStatus !== "Paid") {
      tenth = {
        position: 10,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.tenthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.tenthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.tenthPaymentPenalty.toFixed(2),
        paid: loan.tenthPaymentPaid.toFixed(2),
        balance: loan.tenthPaymentBalance.toFixed(2),
        status: loan.tenthPaymentStatus,
      }

      paymentScedules.push(tenth);
    }

    if (loan.eleventhPaymentAmount > 0 && loan.eleventhPaymentStatus !== "Paid") {
      eleventh = {
        position: 11,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.eleventhPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.eleventhPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.eleventhPaymentPenalty.toFixed(2),
        paid: loan.eleventhPaymentPaid.toFixed(2),
        balance: loan.eleventhPaymentBalance.toFixed(2),
        status: loan.eleventhPaymentStatus,
      }

      paymentScedules.push(eleventh);
    }

    if (loan.twelfthPaymentAmount > 0 && loan.twelfthPaymentStatus !== "Paid") {
      twelfth = {
        position: 12,
        loanPaymentId: loan.id,
        loanId: loan.loanId,
        borrower: loan.fullName,
        amount: loan.amount,
        amortization: loan.twelfthPaymentAmount.toFixed(2),
        amortizationDate: moment(loan.twelfthPaymentDate).format('DD-MMMM-YYYY'),
        penalty: loan.twelfthPaymentPenalty.toFixed(2),
        paid: loan.twelfthPaymentPaid.toFixed(2),
        balance: loan.twelfthPaymentBalance.toFixed(2),
        status: loan.twelfthPaymentStatus,
      }

      paymentScedules.push(twelfth);
    }
  });

  const sortedPaymentSchedules = paymentScedules.sort((a, b) => new Date(a.amortizationDate) - new Date(b.amortizationDate));

  const data = {
    success: true,
    schedules: sortedPaymentSchedules
  }

  return res.json(data);
});

router.get('/approved/page/:pageId', adminMiddleware, async (req, res) => {
  const approvedLoans = await Loan.approvedLoans(con, req.params.pageId);
  const totalPage = approvedLoans.length > 0 ? Math.ceil(approvedLoans[0].fullCount / 20) : 1;
  const data = {
    success: true,
    approvedLoans,
    totalPage
  }

  return res.json(data);
})

router.get('/accepted/page/:pageId', adminMiddleware, async (req, res) => {
  const acceptedLoans = await Loan.acceptedLoans(con, req.params.pageId);
  const totalPage = acceptedLoans.length > 0 ? Math.ceil(acceptedLoans[0].fullCount / 20) : 1;
  const data = {
    success: true,
    acceptedLoans,
    totalPage
  }

  return res.json(data);
})

router.get('/fully-paid/page/:pageId', adminMiddleware, async (req, res) => {
  const fullyPaidLoans = await Loan.fullyPaidLoans(con, req.params.pageId);
  const fullyPaidLoansCount = await Loan.fullyPaidLoansCount(con);
  const totalPage = fullyPaidLoansCount.length > 0 ? Math.ceil(fullyPaidLoansCount.length / 20) : 1;
  let totalAmount = 0;
  fullyPaidLoansCount.forEach(loan => {
    totalAmount += loan.loanPaid;
    loan.loanDate = moment(loan.loanDate).tz('Asia/Manila').format('YYYY-MMMM-DD')
  });
  fullyPaidLoansCount.push({
    penaltyCharge: "TOTAL",
    loanPaid: totalAmount
  })
  const data = {
    success: true,
    totalPage,
    fullyPaidLoans,
    allFullyPaid: fullyPaidLoansCount
  }

  return res.json(data);
})

router.get('/rejected/page/:pageId', adminMiddleware, async (req, res) => {
  const rejectedLoans = await Loan.rejectedLoans(con, req.params.pageId);
  const totalPage = rejectedLoans.length > 0 ? Math.ceil(rejectedLoans[0].fullCount / 20) : 1;
  const data = {
    success: true,
    rejectedLoans,
    totalPage
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
      <p>Finance Charge: <span style="color:#187cbc">&#8369;${(loanCharges.amount * (loanCharges.financeCharge / 100)) * (loanCharges.terms / 30)}</span></p>
      <p>Processing Fee: <span style="color:#187cbc">&#8369;${loanCharges.amount * (2 / 100)}</span></p>
      <p>Service Fee: <span style="color:#187cbc">&#8369;${(loanCharges.amount * (loanCharges.serviceFee / 100)) * (loanCharges.terms / 30)}</span></p>
      <p>Terms: <span style="color:#187cbc">${loanCharges.terms} days</p>
      <p>Final Payment Due Date: <span style="color:#187cbc">${moment(loanCharges.dueDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</span></p>
      <p>Total Charges: <span style="color:#187cbc"><b>&#8369;${loanCharges.loanBalance}</b></span></p>
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
        return res.json(data);
      });
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

    // Construct Mail
    const mailOptions = {
      from: 'Max808 Lending Corporation <admin@max808lending.com>',
      to: newData[0][0].email,
      subject: 'Max808 Lending Corporation - Loan Request Rejected',
      html: `
        <p>Good day, ${newData[0][0].firstName} ${newData[0][0].lastName}!</p>
        <p>We're sorry. Your Loan Request with the ID of ${loanId} has been rejected.</p>
        ${
        req.body.message !== '' ?
          `
            <p>Message / Reason:</p>
            <div style="padding: 10px 0px;">
              <p><b>${req.body.message}</b></p>
            </div>
          ` : ''
        }
        <br />
        <p>You can re-apply for another loan by logging in on your dashboard.</p>
        <br><br>
        <p>Regards,</p>
        <p>Max808 Lending Corporation</p>
      `
    };

    // Send Mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.json(data);
      } else {
        return res.json(data);
      }
    });
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
        <p>We have sent an amount in total of <span style="color:#187cbc"><b>&#8369;${data.loanData[0].loanProceeds}</b></span> to your bank account.</p>
        <div style="padding: 10px 40px;">
          <p>Finance Charge: <span style="color:#187cbc">&#8369;${(req.body.amount * (req.body.financeCharge / 100)) * (req.body.terms / 30)}</span></p>
          <p>Processing Fee: <span style="color:#187cbc">&#8369;${req.body.amount * (2 / 100)}</span></p>
          <p>Service Fee: <span style="color:#187cbc">&#8369;${(req.body.amount * (req.body.serviceFee / 100)) * (req.body.terms / 30)}</span></p>
          <p>Final Payment Due Date: <span style="color:#187cbc">${moment(req.body.dueDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</span></p>
          <p><b>Loan Proceeds: <span style="color:#187cbc">&#8369;${data.loanData[0].loanProceeds}</span></b></p>
          <p><b>Total Loan Payable Amount: <span style="color:#187cbc">&#8369;${data.loanData[0].loanBalance}</span></b></p>
          </div>
        <p style="color:#ff6868;"><em>**Please note that being unable to pay loan in due date may result to penalties.**</em></p>
        <p>Thank you for choosing Max808 Lending Corporation!</p>
        <br /><br />
        <p>Regards,</p>
        <p>Max808 Lending Corporation</p>
      `
    };

    // Send Mail
    transporter.sendMail(mailOptions, async (err, info) => {
      const lData = newData[0][0];

      const transactionData = {
        loan_id: lData.id,
        user_id: lData.user_id,
        description: "Initial Loan",
        amount: lData.loanBalance,
        transactionDate: moment(new Date()).tz('Asia/Manila').format('YYYY-MM-DD'),
      }

      const addNewTransaction = await UserTransactions.add(con, transactionData);

      if (addNewTransaction.affectedRows > 0) {
        return res.json(data);
      } else {
        return res.json(fail);
      }
    });

  } else {
    return res.json(fail);
  }
})

router.put('/update-active-loan/:id', adminMiddleware, async (req, res) => {
  const loanId = req.params.id;
  const updatedLoanPayments = await LoanPayments.updatePayments(con, loanId, req.body);
  const currentLoanValues = await Loan.getAllData(con, loanId);
  const oldValue = currentLoanValues[0][0];
  let dates = [];

  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      if (!isNaN(Date.parse(req.body[key]))) dates.push(moment(req.body[key]).tz('Asia/Manila').format('YYYY-MM-DD'));
    }
  }

  dates.sort((a, b) => new Date(b) - new Date(a));

  const latestDate = dates[0];

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

      if (totalPenalty > oldValue.penaltyCharge) {
        const transactionData = {
          loan_id: loanId,
          user_id: oldValue.user_id,
          description: "Penalty",
          amount: totalPenalty - oldValue.penaltyCharge,
          transactionDate: moment(new Date()).tz('Asia/Manila').format('YYYY-MM-DD'),
        }

        await UserTransactions.add(con, transactionData);
      }

      if (totalPaid > oldValue.loanPaid) {
        const transactionData = {
          loan_id: loanId,
          user_id: oldValue.user_id,
          description: "Payment",
          amount: totalPaid - oldValue.loanPaid,
          transactionDate: moment(new Date()).tz('Asia/Manila').format('YYYY-MM-DD'),
        }

        await UserTransactions.add(con, transactionData);
      }

      if (Date.parse(latestDate) > Date.parse(oldValue.dueDate)) {
        await Loan.updateDueDate(con, loanId, latestDate);
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

  const currentLoanValues = await Loan.getAllData(con, loanId);
  const oldValue = currentLoanValues[0][0];

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

      if (totalPenalty > oldValue.penaltyCharge) {
        const transactionData = {
          loan_id: loanId,
          user_id: oldValue.user_id,
          description: "Penalty",
          amount: totalPenalty - oldValue.penaltyCharge,
          transactionDate: moment(new Date()).tz('Asia/Manila').format('YYYY-MM-DD'),
        }

        await UserTransactions.add(con, transactionData);
      }

      if (totalPaid > oldValue.loanPaid) {
        const transactionData = {
          loan_id: loanId,
          user_id: oldValue.user_id,
          description: "Payment",
          amount: totalPaid - oldValue.loanPaid,
          transactionDate: moment(new Date()).tz('Asia/Manila').format('YYYY-MM-DD'),
        }

        await UserTransactions.add(con, transactionData);
      }

      return res.json(data);
    } else {
      return res.json(fail);
    }

  } else {
    return res.json(fail);
  }
})

router.put('/accept-refuse/:id', userMiddleware, async (req, res) => {
  const loanId = req.params.id;
  const { loanAction } = req.body;
  const acceptRefuseDate = moment(new Date()).tz('Asia/Manila').format('YYYY-MM-DD');

  const acceptRefuseLoan = await Loan.acceptRefuse(con, loanId, loanAction, acceptRefuseDate);
  const fail = {
    success: false,
    message: "There's an error in processing your request."
  }

  if (acceptRefuseLoan.affectedRows > 0) {
    const newData = await Loan.get(con, loanId, req.user.id);
    const data = {
      success: true,
      loanData: newData[0]
    }
    return res.json(data);
  } else {
    return res.json(fail);
  }
})

router.put('/update-payment/:id', adminMiddleware, async (req, res) => {
  const loanId = req.params.id;
  let query;
  const updateData = [
    req.body.amortizationDate,
    req.body.balance,
    req.body.paid,
    req.body.penalty,
    req.body.status,
    loanId
  ]


  switch (req.body.position) {
    case 1:
      query = `
        UPDATE LoanPayments SET
        firstPaymentDate = ?, firstPaymentBalance = ?, firstPaymentPaid = ?, firstPaymentPenalty = ?, firstPaymentStatus = ?
        WHERE id = ?
      `
      break;
    case 2:
      query = `
        UPDATE LoanPayments SET
        secondPaymentDate = ?, secondPaymentBalance = ?, secondPaymentPaid = ?, secondPaymentPenalty = ?, secondPaymentStatus = ?
        WHERE id = ?
      `
      break;
    case 3:
      query = `
        UPDATE LoanPayments SET
        thirdPaymentDate = ?, thirdPaymentBalance = ?, thirdPaymentPaid = ?, thirdPaymentPenalty = ?, thirdPaymentStatus = ?
        WHERE id = ?
      `
      break;
    case 4:
      query = `
          UPDATE LoanPayments SET
          fourthPaymentDate = ?, fourthPaymentBalance = ?, fourthPaymentPaid = ?, fourthPaymentPenalty = ?, fourthPaymentStatus = ?
          WHERE id = ?
        `
      break;
    case 5:
      query = `
        UPDATE LoanPayments SET
        fifthPaymentDate = ?, fifthPaymentBalance = ?, fifthPaymentPaid = ?, fifthPaymentPenalty = ?, fifthPaymentStatus = ?
        WHERE id = ?
      `
      break;
    case 6:
      query = `
        UPDATE LoanPayments SET
        sixthPaymentDate = ?, sixthPaymentBalance = ?, sixthPaymentPaid = ?, sixthPaymentPenalty = ?, sixthPaymentStatus = ?
        WHERE id = ?
      `
      break;
    case 7:
      query = `
        UPDATE LoanPayments SET
        seventhPaymentDate = ?, seventhPaymentBalance = ?, seventhPaymentPaid = ?, seventhPaymentPenalty = ?, seventhPaymentStatus = ?
        WHERE id = ?
      `
      break;
    case 8:
      query = `
        UPDATE LoanPayments SET
        eighthPaymentDate = ?, eighthPaymentBalance = ?, eighthPaymentPaid = ?, eighthPaymentPenalty = ?, eighthPaymentStatus = ?
        WHERE id = ?
      `
      break;
    case 9:
      query = `
        UPDATE LoanPayments SET
        ninthPaymentDate = ?, ninthPaymentBalance = ?, ninthPaymentPaid = ?, ninthPaymentPenalty = ?, ninthPaymentStatus = ?
        WHERE id = ?
      `
      break;
    case 10:
      query = `
        UPDATE LoanPayments SET
        tenthPaymentDate = ?, tenthPaymentBalance = ?, tenthPaymentPaid = ?, tenthPaymentPenalty = ?, tenthPaymentStatus = ?
        WHERE id = ?
      `
      break;
    case 11:
      query = `
        UPDATE LoanPayments SET
        eleventhPaymentDate = ?, eleventhPaymentBalance = ?, eleventhPaymentPaid = ?, eleventhPaymentPenalty = ?, eleventhPaymentStatus = ?
        WHERE id = ?
      `
      break;
    case 12:
      query = `
        UPDATE LoanPayments SET
        twelfthPaymentDate = ?, twelfthPaymentBalance = ?, twelfthPaymentPaid = ?, twelfthPaymentPenalty = ?, twelfthPaymentStatus = ?
        WHERE id = ?
      `
      break;
    default:
      return;
  }

  const updateLoanSchedule = await LoanPayments.updateSchedule(con, query, updateData);

  const currentLoanValues = await Loan.getAllData(con, req.body.loanId);
  const oldValue = currentLoanValues[0][0];

  const fail = {
    success: false,
    message: "There's an error in approving your request."
  }

  if (updateLoanSchedule.affectedRows > 0) {
    const loanPaymentRecord = await LoanPayments.getById(con, loanId);

    if (loanPaymentRecord.length > 0) {
      const record = loanPaymentRecord[0];

      const totalPaid = record.firstPaymentPaid + record.secondPaymentPaid + record.thirdPaymentPaid + record.fourthPaymentPaid + record.fifthPaymentPaid + record.sixthPaymentPaid + record.seventhPaymentPaid + record.eighthPaymentPaid + record.ninthPaymentPaid + record.tenthPaymentPaid + record.eleventhPaymentPaid + record.twelfthPaymentPaid;
      const totalPenalty = record.firstPaymentPenalty + record.secondPaymentPenalty + record.thirdPaymentPenalty + record.fourthPaymentPenalty + record.fifthPaymentPenalty + record.sixthPaymentPenalty + record.seventhPaymentPenalty + record.eighthPaymentPenalty + record.ninthPaymentPenalty + record.tenthPaymentPenalty + record.eleventhPaymentPenalty + record.twelfthPaymentPenalty;
      const totalBalance = record.firstPaymentBalance + record.secondPaymentBalance + record.thirdPaymentBalance + record.fourthPaymentBalance + record.fifthPaymentBalance + record.sixthPaymentBalance + record.seventhPaymentBalance + record.eighthPaymentBalance + record.ninthPaymentBalance + record.tenthPaymentBalance + record.eleventhPaymentBalance + record.twelfthPaymentBalance;
      const totals = {
        totalPaid,
        totalPenalty,
        totalBalance
      }
      const updateLoanData = await Loan.updatePaidPenaltyBalance(con, req.body.loanId, totals);

      if (updateLoanData.affectedRows > 0) {
        const data = {
          success: true,
          message: "Updated amortization data.Z"
        }

        if (totalPenalty > oldValue.penaltyCharge) {
          const transactionData = {
            loan_id: req.body.loanId,
            user_id: oldValue.user_id,
            description: "Penalty",
            amount: totalPenalty - oldValue.penaltyCharge,
            transactionDate: moment(new Date()).tz('Asia/Manila').format('YYYY-MM-DD'),
          }

          await UserTransactions.add(con, transactionData);
        }

        if (totalPaid > oldValue.loanPaid) {
          const transactionData = {
            loan_id: req.body.loanId,
            user_id: oldValue.user_id,
            description: "Payment",
            amount: totalPaid - oldValue.loanPaid,
            transactionDate: moment(new Date()).tz('Asia/Manila').format('YYYY-MM-DD'),
          }

          await UserTransactions.add(con, transactionData);
        }

        if (Date.parse(req.body.amortizationDate) > Date.parse(oldValue.dueDate)) {
          await Loan.updateDueDate(con, req.body.loanId, req.body.amortizationDate);
        }

        return res.json(data);
      } else {
        return res.json(fail);
      }

    } else {
      return res.json(fail);
    }
  }
})

/**
 *  Apply New Loan
 */

/**
* 
*  Route for step one account activation
*/

router.post('/apply-new', userMiddleware, async (req, res) => {

  const loans = {
    id: `ln${new Date().valueOf()}`,
    loanDate: moment(new Date()).tz('Asia/Manila').format('YYYY-MM-DD'),
    userId: req.user.id,
    loanAmount: parseInt(req.body.amount),
    loanTerms: parseInt(req.body.terms),
    loanStatus: 'Pending',
  }

  const insertError = {
    success: false,
    message: "There's an error in requesting new loan. Please try again."
  }

  const loan = await Loan.addNew(con, loans);
  if (loan.affectedRows > 0) {
    const data = {
      success: true,
      message: "Successfully requested for new loan"
    };

    const latestLoan = await Loan.getLatest(con, req.user.id);
    const loanInfo = await Loan.getAllData(con, latestLoan[0].id)

    // Construct Mail
    const mailOptions = {
      from: 'Max808 Lending Corporation <admin@max808lending.com>',
      to: 'admin@max808lending.com, max808lending@gmail.com',
      subject: 'Max808 Lending Corporation - New Loan Request',
      html: `
          <h4>New Loan Request</h4>
          <p>Borrower ID: <span style="color:#187cbc">${loanInfo[0][0].user_id}</span></p>
          <p>Borrower Name: <span style="color:#187cbc">${loanInfo[0][0].firstName} ${loanInfo[0][0].lastName}</span></p>
          <p>Loan ID:  <span style="color:#187cbc">${loanInfo[0][0].id}</span></p>
          <p>Loan Date:  <span style="color:#187cbc">${moment(loanInfo[0][0].loanDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</span></p>
          <p>Loan Amount:  <span style="color:#187cbc">&#8369;${loanInfo[0][0].amount}</span></p>
          <p>Terms:  <span style="color:#187cbc">${loanInfo[0][0].terms} days</span><p>
          <p>Loan Status:  <span style="color:#187cbc">${loanInfo[0][0].loanStatus}</span><p>
        `
    };

    // Send Mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('send error', err);

      }
      return res.json(data);
    });

  } else {
    return res.json(insertError);
  }
})

router.get('/transactions/page/:pageId', adminMiddleware, async (req, res) => {
  const transactions = await UserTransactions.all(con, req.params.pageId);
  const transactionsCount = await UserTransactions.allCount(con);
  const totalPage = transactionsCount.length > 0 ? Math.ceil(transactionsCount.length / 20) : 1;

  let total = 0;
  transactionsCount.forEach(loan => {
    total += +((loan.amount).toFixed(2));
    loan.transactionDate = moment(loan.transactionDate).tz('Asia/Manila').format('DD-MMMM-YYYY');
    loan.amount = loan.amount.toFixed(2);
  });

  transactionsCount.push({
    description: "TOTAL",
    amount: total.toFixed(2),
  });

  return res.json({ totalPage, transactions, allTransactions: transactionsCount })
})

router.put('/back-to-active/:id', adminMiddleware, async (req, res) => {
  const loanId = req.params.id;

  const loanBackToActive = await Loan.setBackToActive(con, loanId);

  if (loanBackToActive.affectedRows > 0) {
    const newData = await Loan.getAllData(con, loanId);
    const data = {
      success: true,
      loanData: newData[0]
    }
    return res.json(data);

  } else {
    return res.json({
      success: false,
      message: "There's an error updating loan status."
    })
  }
})

router.get('/transaction-history/:id', adminMiddleware, async (req, res) => {
  const loanId = req.params.id;
  const transactions = await Loan.getTransactions(con, loanId);
  return res.json(transactions)
})

router.put('/edit-transaction/:id', adminMiddleware, async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await UserTransactions.editByLoanId(con, transactionId, req.body);

  if (transaction.affectedRows > 0) {
    const allTransactions = await Loan.getTransactions(con, req.body.loan_id);
    return res.json(allTransactions);
  } else {
    return res.json({ error: true, message: "There's an error editing transaction." })
  }
})

module.exports = router;