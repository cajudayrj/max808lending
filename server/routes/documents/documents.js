const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userMiddleware = require('../middleware/middleware');

const UserDocuments = require('../../models/UserDocuments');
const User = require('../../models/User');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    cb(null, Date.now() + '-' + fileName)
  }
});

const upload = multer({
  storage: storage
}).fields([
  { name: 'payslipOne', maxCount: 1 },
  { name: 'payslipTwo', maxCount: 1 },
  { name: 'validIdOne', maxCount: 1 },
  { name: 'validIdTwo', maxCount: 1 },
  { name: 'coe', maxCount: 1 },
  { name: 'billingStatement', maxCount: 1 },
  { name: 'bankTransaction', maxCount: 1 },
])

const con = require('../../connection/con');

router.post('/', userMiddleware, async (req, res) => {
  upload(req, res, async (err) => {
    const uploadError = {
      success: false,
      error: {
        message: 'There\'s an error in uploading documents. Please try again.'
      },
      mainError: err
    }
    if (err) return res.json(uploadError);

    const documentData = { ...req.files }
    const userDocuments = {
      userId: req.user.id,
      validIdOne: documentData.validIdOne[0].filename,
      validIdTwo: documentData.validIdTwo[0].filename,
      payslipOne: documentData.payslipOne[0].filename,
      payslipTwo: documentData.payslipTwo[0].filename,
      coe: documentData.coe[0].filename,
      billingStatement: documentData.billingStatement[0].filename,
      bankTransaction: documentData.bankTransaction[0].filename,
    }
    const uploadDocs = await UserDocuments.uploadDocs(con, userDocuments);

    const insertError = {
      success: false,
      error: {
        message: 'There\'s an error in uploading documents. Please try again.'
      }
    }

    if (uploadDocs.affectedRows > 0) {
      const updateUserStatus = await User.setAccountStatus(con, req.user.id, 'verified-step-three');
      if (updateUserStatus.affectedRows > 0) {
        return res.json({
          success: true,
          message: 'Account Documents Uploaded!'
        })
      } else {
        return res.json(insertError);
      }
    } else {
      return res.json(insertError);
    }
  })
})

module.exports = router;