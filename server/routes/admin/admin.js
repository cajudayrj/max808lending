const express = require('express');
const router = express.Router();
const con = require('../../connection/conn');

const adminMiddleware = require('../middleware/adminMiddleware');

const User = require('../../models/User');
const Loan = require('../../models/Loan');

router.get('/admin-dashboard-count', adminMiddleware, async (req, res) => {
  const user = await User.userCount(con);
  const bannedUser = await User.bannedUserCount(con);
  const allLoans = await Loan.loanCount(con, 'all');
  const pendingLoans = await Loan.loanCount(con, 'pending');
  const approvedLoans = await Loan.loanCount(con, 'approved');
  const activeLoans = await Loan.loanCount(con, 'active');
  const acceptedLoans = await Loan.loanCount(con, 'accepted');
  const rejectedLoans = await Loan.rejectedCount(con);
  const fullpaidLoans = await Loan.loanCount(con, 'fully paid');

  const data = {
    userCount: user[0].userCount,
    bannedUserCount: bannedUser[0].userCount,
    allLoanCount: allLoans[0].loanCount,
    pendingLoanCount: pendingLoans[0].loanCount,
    approvedLoanCount: approvedLoans[0].loanCount,
    activeLoanCount: activeLoans[0].loanCount,
    acceptedLoanCount: acceptedLoans[0].loanCount,
    rejectedLoanCount: rejectedLoans[0].loanCount,
    fullpaidLoanCount: fullpaidLoans[0].loanCount,
  }
  return res.json(data);
})

module.exports = router;