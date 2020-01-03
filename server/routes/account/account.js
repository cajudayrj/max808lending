const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const siteUrl = require('../../connection/siteUrl');

// middlewares
const userMiddleware = require('../middleware/middleware');

// Validation function
const registerValidation = require('./registerValidation');
const loginValidation = require('./loginValidation');
const { stepOneValidation, stepTwoValidation, stepFourValidation } = require('./accountValidation');

// DB Connection
const con = require('../../connection/con');

// Models
const User = require('../../models/User');
const Loan = require('../../models/Loan');
const UserInformation = require('../../models/UserInformation');
const UserReferences = require('../../models/UserReferences');

// Setup Nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'us2.smtp.mailhostbox.com',
  port: 587,
  secure: false,
  ignoreTLS: true,
  auth: {
    user: process.env.EMAIL_USER_ADMIN,
    pass: process.env.EMAIL_PASS_ADMIN,
  }
})

/**
 * 
 *  Route for registration
 *  serverUrl/account/register
 */

router.post('/register', async (req, res) => {
  const validation = registerValidation(req.body);

  if (validation.error) return res.json(validation);

  // fetch database for existing email;
  const uniqueEmail = await User.findEmail(con, req.body.email);
  // return error if there's an existing email;
  if (uniqueEmail.length > 0) {
    const error = {
      error: {
        details: [{
          message: "Email already exists."
        }]
      }
    }

    return res.json(error);
  }

  // fetch database for existing username;
  const uniqueUsername = await User.findUsername(con, req.body.username);
  // return error if there's an existing username;
  if (uniqueUsername.length > 0) {
    const error = {
      error: {
        details: [{
          message: "Username already exists."
        }]
      }
    }

    return res.json(error);
  }
  const id = `max${new Date().valueOf()}`
  // encrypt password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  // hash id for verification token
  const accountToken = bcrypt.hashSync(id, salt);
  // replace all special characters for verification link url
  const accountVerificationToken = accountToken.replace(/[^\w\s]/gi, '');

  // Store data variables
  const userData = {
    id,
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
    userLevel: 2,
    accountStatus: 'notVerified',
    accountVerificationToken
  }

  // Register user to database
  const newUser = await User.register(con, userData);

  // Construct Mail
  const mailOptions = {
    from: 'Max808 Lending Corporation <admin@max808lending.com>',
    to: req.body.email,
    subject: 'Max808 Lending Corporation - Registration Successful',
    html: `
    <h4>Greetings, ${req.body.username}!</h4>
    <p>Thank you for your registration on our website. To verify and login to your account, please click this <a href="${siteUrl}/verify-account/${accountVerificationToken}">link</a>.</p>
    <p>Or go to: ${siteUrl}/verify-account/${accountVerificationToken}</p>
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
            message: "There's a problem in sending email verification link."
          }]
        }
      }

      return res.json(error);
    }
  });

  const successful = {
    success: true,
    newUser,
    message: "Successfully registered account. Please check your email for the validation link."
  }

  // Return successful registration
  return res.json(successful);

})

/**
 * 
 *  Route for logging in
 *  serverUrl/account/login
 */

router.post('/login', async (req, res) => {
  const validation = loginValidation(req.body);

  if (validation.error) return res.json(validation);

  const users = await User.findUsername(con, req.body.username);
  const error = {
    error: {
      details: [{
        message: "Incorrect username / password."
      }]
    }
  }

  if (users.length === 0) return res.json(error);

  const validatedPass = bcrypt.compareSync(req.body.password, users[0].password);

  if (validatedPass) {
    if (users[0].accountStatus === 'notVerified') {
      const notVerified = {
        error: {
          details: [{
            message: "Account is not yet verified. Please check your email for the verification link to be able to login on your account."
          }]
        }
      }

      return res.json(notVerified)
    }

    const token = jwt.sign(
      {
        id: users[0].id,
        userLevel: users[0].userLevel,
      },
      process.env.APP_TOKEN
    );

    return res.json({
      success: true,
      message: "Successfully logged in.",
      userId: users[0].id,
      accountStatus: users[0].accountStatus,
      userAuth: token,
      userLevel: users[0].userLevel
    })
  } else {
    return res.json(error);
  }
})

/**
 * 
 *  Route for verify account
 */

router.put('/verify', async (req, res) => {
  const { token } = req.body;
  const account = await User.verify(con, token);

  const noAccount = {
    success: false,
    message: "Invalid verification link."
  }

  if (account.length === 0) return res.status(400).json(noAccount);

  const user = { ...account[0] };

  if (user.accountStatus === 'verified') {
    const alreadyVerified = {
      success: false,
      message: "Account has already been verified.",
    }
    return res.json(alreadyVerified);
  }

  await User.setAccountStatus(con, user.id, 'verified');

  const success = {
    success: true,
    message: "Account has been successfully verified. You may now log in on your account."
  }
  return res.json(success);
})

/**
 * 
 *  Route for step one account activation
 */

router.put('/activate/step-one', userMiddleware, async (req, res) => {
  const validation = stepOneValidation(req.body);
  if (validation.error) return res.json(validation);

  const loans = {
    id: `ln${new Date().valueOf()}`,
    loanDate: req.body.loanDate,
    userId: req.user.id,
    loanAmount: parseInt(req.body.loanAmount),
    loanTerms: parseInt(req.body.loanTerms),
    loanStatus: 'Pending',
  }

  const userUpdate = {
    fname: req.body.fname,
    mname: req.body.mname,
    lname: req.body.lname,
    birthday: req.body.birthday,
    address: req.body.address,
    townMunicipality: req.body.townMunicipality,
    cityProvince: req.body.cityProvince,
    gender: req.body.gender,
    maritalStatus: req.body.maritalStatus,
    mobileNum: req.body.mobileNum,
    accountStatus: 'verified-step-one',
  }

  const insertError = {
    success: false,
    message: "There's an error saving your data. Please try again."
  }

  const loan = await Loan.addNew(con, loans);
  if (loan.affectedRows > 0) {
    const user = await User.updatePersonalDetails(con, req.user.id, userUpdate);
    if (user.affectedRows > 0) {
      const success = {
        user,
        success: true,
        message: "Successfully updated user data."
      }
      return res.json(success)
    } else {
      return res.json(insertError);
    }
  } else {
    return res.json(insertError);
  }
})

/**
 * 
 *  Route for step two account activation
 */

router.post('/activate/step-two', userMiddleware, async (req, res) => {
  const validate = stepTwoValidation(req.body);
  if (validate.error) return res.json(validate);
  const otherInfo = {
    userId: req.user.id,
    officeName: validate.value.company,
    officeAddress: validate.value.companyAddress,
    officeTelephone: validate.value.companyTelNo,
    officePosition: validate.value.position,
    dateOfPayout: validate.value.dop,
    officePayrollAccount: validate.value.payrollAcc,
    bankCheckingAccount: validate.value.bankCheckAcc,
    existingLoan: validate.value.existingLoans,
  }

  const userInfo = await UserInformation.post(con, otherInfo);

  const insertError = {
    success: false,
    message: "There's an error saving your data. Please try again."
  }

  if (userInfo && userInfo.affectedRows > 0) {
    const user = await User.setAccountStatus(con, req.user.id, 'verified-step-two');

    if (user.affectedRows > 0) {
      const success = {
        otherInfo: userInfo,
        success: true,
        message: "Successfully updated user data."
      }
      return res.json(success)
    } else {
      return res.json(insertError);
    }

  } else {
    return res.json(insertError);
  }
})

/**
 * 
 *  Route for step four account activation
 */

router.post('/activate/step-four', userMiddleware, async (req, res) => {
  const validate = stepFourValidation(req.body);
  if (validate.error) return res.json(validate);

  const userReferences = validate.value;

  const uploadReferences = await UserReferences.post(con, req.user.id, userReferences);

  const insertError = {
    success: false,
    message: "There's an error saving your data. Please try again."
  }

  if (uploadReferences.affectedRows > 0) {
    const user = await User.setAccountStatus(con, req.user.id, 'active');

    if (user.affectedRows > 0) {
      const success = {
        userReferences: uploadReferences,
        success: true,
        message: "Successfully updated user data."
      }
      return res.json(success)
    } else {
      return res.json(insertError);
    }
  } else {
    return res.json(insertError);
  }
});

module.exports = router;