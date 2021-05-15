const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userMiddleware = require('../middleware/middleware');
const fs = require('fs');

const UserDocuments = require('../../models/UserDocuments');
const User = require('../../models/User');

const con = require('../../connection/conn');

router.post('/', userMiddleware, async (req, res) => {
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
    { name: 'companyId', maxCount: 1 },
  ]);

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
      companyId: documentData.companyId[0].filename,
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

router.put('/update-company-id', userMiddleware, async (req, res) => {
  const userInfo = await User.getDocuments(con, req.user.id);
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
    { name: 'companyId', maxCount: 1 },
  ]);

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
      companyId: documentData.companyId[0].filename
    }
    const uploadDocs = await UserDocuments.uploadCompanyId(con, userDocuments);

    const insertError = {
      success: false,
      error: {
        message: 'There\'s an error in uploading documents. Please try again.'
      }
    }

    if (uploadDocs.affectedRows > 0) {
      if (userInfo[0].companyId) {
        fs.unlink(path.join(__dirname, `../../uploads/${userInfo[0].companyId}`), (err) => {
          if (err) throw err;
        })
      }

      return res.json({
        success: true,
        message: 'Success updating document'
      })
    } else {
      return res.json(insertError);
    }
  })
})

router.put('/update-ps-one', userMiddleware, async (req, res) => {
  const userInfo = await User.getDocuments(con, req.user.id);
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
  ]);

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
      payslipOne: documentData.payslipOne[0].filename
    }
    const uploadDocs = await UserDocuments.updatePayslipOne(con, userDocuments);

    const insertError = {
      success: false,
      error: {
        message: 'There\'s an error in uploading documents. Please try again.'
      }
    }

    if (uploadDocs.affectedRows > 0) {
      fs.unlink(path.join(__dirname, `../../uploads/${userInfo[0].payslipOne}`), (err) => {
        if (err) throw err;
      })
      return res.json({
        success: true,
        message: 'Success updating document'
      })
    } else {
      return res.json(insertError);
    }
  })
})

router.put('/update-ps-two', userMiddleware, async (req, res) => {
  const userInfo = await User.getDocuments(con, req.user.id);
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
    { name: 'payslipTwo', maxCount: 1 },
  ]);

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
      payslipTwo: documentData.payslipTwo[0].filename
    }
    const uploadDocs = await UserDocuments.updatePayslipTwo(con, userDocuments);

    const insertError = {
      success: false,
      error: {
        message: 'There\'s an error in uploading documents. Please try again.'
      }
    }

    if (uploadDocs.affectedRows > 0) {
      fs.unlink(path.join(__dirname, `../../uploads/${userInfo[0].payslipTwo}`), (err) => {
        if (err) throw err;
      })
      return res.json({
        success: true,
        message: 'Success updating document'
      })
    } else {
      return res.json(insertError);
    }
  })
})

router.put('/update-valid-one', userMiddleware, async (req, res) => {
  const userInfo = await User.getDocuments(con, req.user.id);
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
    { name: 'validIdOne', maxCount: 1 },
  ]);

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
      validIdOne: documentData.validIdOne[0].filename
    }
    const uploadDocs = await UserDocuments.updateValidIdOne(con, userDocuments);

    const insertError = {
      success: false,
      error: {
        message: 'There\'s an error in uploading documents. Please try again.'
      }
    }

    if (uploadDocs.affectedRows > 0) {
      fs.unlink(path.join(__dirname, `../../uploads/${userInfo[0].validIdOne}`), (err) => {
        if (err) throw err;
      })
      return res.json({
        success: true,
        message: 'Success updating document'
      })
    } else {
      return res.json(insertError);
    }
  })
})

router.put('/update-valid-two', userMiddleware, async (req, res) => {
  const userInfo = await User.getDocuments(con, req.user.id);
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
    { name: 'validIdTwo', maxCount: 1 },
  ]);

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
      validIdTwo: documentData.validIdTwo[0].filename
    }
    const uploadDocs = await UserDocuments.updateValidIdTwo(con, userDocuments);

    const insertError = {
      success: false,
      error: {
        message: 'There\'s an error in uploading documents. Please try again.'
      }
    }

    if (uploadDocs.affectedRows > 0) {
      fs.unlink(path.join(__dirname, `../../uploads/${userInfo[0].validIdTwo}`), (err) => {
        if (err) throw err;
      })
      return res.json({
        success: true,
        message: 'Success updating document'
      })
    } else {
      return res.json(insertError);
    }
  })
})

router.put('/update-coe', userMiddleware, async (req, res) => {
  const userInfo = await User.getDocuments(con, req.user.id);
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
    { name: 'coe', maxCount: 1 },
  ]);

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
      coe: documentData.coe[0].filename
    }
    const uploadDocs = await UserDocuments.updateCoe(con, userDocuments);

    const insertError = {
      success: false,
      error: {
        message: 'There\'s an error in uploading documents. Please try again.'
      }
    }

    if (uploadDocs.affectedRows > 0) {
      fs.unlink(path.join(__dirname, `../../uploads/${userInfo[0].coe}`), (err) => {
        if (err) throw err;
      })
      return res.json({
        success: true,
        message: 'Success updating document'
      })
    } else {
      return res.json(insertError);
    }
  })
})

router.put('/update-billing-statement', userMiddleware, async (req, res) => {
  const userInfo = await User.getDocuments(con, req.user.id);
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
    { name: 'billingStatement', maxCount: 1 },
  ]);

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
      billingStatement: documentData.billingStatement[0].filename
    }
    const uploadDocs = await UserDocuments.updateBillingStatement(con, userDocuments);

    const insertError = {
      success: false,
      error: {
        message: 'There\'s an error in uploading documents. Please try again.'
      }
    }

    if (uploadDocs.affectedRows > 0) {
      fs.unlink(path.join(__dirname, `../../uploads/${userInfo[0].billingStatement}`), (err) => {
        if (err) throw err;
      })
      return res.json({
        success: true,
        message: 'Success updating document'
      })
    } else {
      return res.json(insertError);
    }
  })
})

router.put('/update-bank-transaction', userMiddleware, async (req, res) => {
  const userInfo = await User.getDocuments(con, req.user.id);
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
    { name: 'bankTransaction', maxCount: 1 },
  ]);

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
      bankTransaction: documentData.bankTransaction[0].filename
    }
    const uploadDocs = await UserDocuments.updateBankTransaction(con, userDocuments);

    const insertError = {
      success: false,
      error: {
        message: 'There\'s an error in uploading documents. Please try again.'
      }
    }

    if (uploadDocs.affectedRows > 0) {
      fs.unlink(path.join(__dirname, `../../uploads/${userInfo[0].bankTransaction}`), (err) => {
        if (err) throw err;
      })
      return res.json({
        success: true,
        message: 'Success updating document'
      })
    } else {
      return res.json(insertError);
    }
  })
})

module.exports = router;