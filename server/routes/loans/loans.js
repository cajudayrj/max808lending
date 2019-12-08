const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/middleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// DB Connection
const con = require('../../connection/con');

const Loan = require('../../models/Loan');

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

router.get('/rejected', adminMiddleware, async (req, res) => {
  const rejectedLoans = await Loan.rejectedLoans(con);
  const data = {
    success: true,
    rejectedLoans
  }

  return res.json(data);
})

module.exports = router;