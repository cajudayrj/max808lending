const express = require('express');
const router = express.Router();

const con = require('../../connection/con');
const userMiddleware = require('../middleware/middleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const User = require('../../models/User');
const Loan = require('../../models/Loan');
const UserTransactions = require('../../models/UserTransactions');

router.get('/all', adminMiddleware, async (req, res) => {
  const userInfo = await User.all(con);

  if (userInfo.length > 0) {
    const user = {
      success: true,
      users: userInfo
    }
    return res.json(user);
  } else {
    const error = {
      success: false,
      message: "No users found!",
    }
    return res.json(error)
  }
})

router.get('/:id', userMiddleware, async (req, res) => {
  const { id } = req.params;

  const user = await User.find(con, id);

  const error = {
    success: false,
    message: "No user found."
  }

  if (user.length === 0) {
    return res.json(error);
  }

  const userData = { ...user[0] };
  userData.password = null;

  const data = {
    success: true,
    user: userData,
  };

  return res.json(data);
})

router.get('/info/:id', userMiddleware, async (req, res) => {
  const userId = req.params.id;
  const userInfo = await User.getInfo(con, userId);

  if (userInfo.length > 0) {
    const user = {
      success: true,
      user: userInfo[0]
    }
    return res.json(user);
  } else {
    const error = {
      success: false,
      message: "No user found!",
    }
    return res.json(error)
  }
})

router.get('/references/:id', userMiddleware, async (req, res) => {
  const userId = req.params.id;
  const userInfo = await User.getReferences(con, userId);

  if (userInfo.length > 0) {
    const user = {
      success: true,
      user: userInfo[0]
    }
    return res.json(user);
  } else {
    const error = {
      success: false,
      message: "No user found!",
    }
    return res.json(error)
  }
})

router.get('/documents/:id', userMiddleware, async (req, res) => {
  const userId = req.params.id;
  const userInfo = await User.getDocuments(con, userId);

  if (userInfo.length > 0) {
    const user = {
      success: true,
      user: userInfo[0]
    }
    return res.json(user);
  } else {
    const error = {
      success: false,
      message: "No user found!",
    }
    return res.json(error)
  }
})

router.get('/loan/transactions', userMiddleware, async (req, res) => {
  const userId = req.user.id;
  const userTransactions = await UserTransactions.getUserTransactions(con, userId);
  return res.json(userTransactions);
})

module.exports = router;