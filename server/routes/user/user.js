const express = require('express');
const router = express.Router();

const con = require('../../connection/con');
const userMiddleware = require('../middleware/middleware');

const User = require('../../models/User');


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

module.exports = router;