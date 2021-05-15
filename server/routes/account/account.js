const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const siteUrl = require('../../connection/siteUrl');
const moment = require('moment-timezone');

// middlewares
const userMiddleware = require('../middleware/middleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Validation function
const registerValidation = require('./registerValidation');
const loginValidation = require('./loginValidation');
const { stepOneValidation, stepTwoValidation, stepFourValidation, resendValidation, resetPassValidation } = require('./accountValidation');

// DB Connection
const con = require('../../connection/conn');

// Models
const User = require('../../models/User');
const Loan = require('../../models/Loan');
const UserInformation = require('../../models/UserInformation');
const UserReferences = require('../../models/UserReferences');

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
    accountStatus: 'verified',
    accountVerificationToken
  }

  // Register user to database
  const newUser = await User.register(con, userData);

  const successful = {
    success: true,
    newUser,
    message: "Successfully registered account. You may now login on your account."
  }

  // Return successful registration
  return res.json(successful);
});

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

    if (users[0].banned === 1) {
      const bannedAccount = {
        error: {
          details: [{
            message: "Account is banned from logging in. Please contact administrator."
          }]
        }
      }

      return res.json(bannedAccount)
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

  if (user.accountStatus !== 'notVerified') {
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
    dateOfPayoutTwo: validate.value.dopTwo,
    officePayrollAccount: validate.value.payrollAcc,
    bankCheckingAccount: validate.value.bankCheckAcc,
    existingLoan: validate.value.existingLoans,
    fbLink: validate.value.fbLink,
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
  const validError = {
    success: false,
    message: validate.error ? validate.error.details[0].message : ''
  }

  if (validate.error) return res.json(validError);

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
          const error = {
            success: true,
            userReferences: uploadReferences,
            message: "There's a problem in sending email to admin."
          }

          return res.json(error);
        } else {
          return res.json(success)
        }
      });

    } else {
      return res.json(insertError);
    }
  } else {
    return res.json(insertError);
  }
});

router.get('/validation-resend/:email', async (req, res) => {
  const validation = resendValidation({ email: req.params.email });

  if (validation.error) {
    const validateError = {
      success: false,
      message: validation.error.details[0].message,
    }
    return res.json(validateError)
  };

  const user = await User.findEmail(con, req.params.email);

  if (user.length > 0) {
    //transporter contact
    const transporter = nodemailer.createTransport({
      host: 'us2.smtp.mailhostbox.com',
      port: process.env.EMAIL_PORT,
      secure: false,
      ignoreTLS: true,
      auth: {
        user: process.env.EMAIL_USER_CONTACT,
        pass: process.env.EMAIL_PASS_CONTACT,
      }
    })

    // Construct Mail
    const mailOptions = {
      from: 'Max808 Lending Corporation <contactus@max808lending.com>',
      to: req.params.email,
      subject: 'Max808 Lending Corporation - Account Verification Link',
      html: `
        <h4>Verification Link:</h4>
        <p>Please click this <a href="${siteUrl}/verify-account/${user[0].accountVerificationToken}">link</a>.</p>
        <p>Or go to: ${siteUrl}/verify-account/${user[0].accountVerificationToken}</p>
      `
    };

    // Send Mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        const error = {
          success: false,
          message: "There's a problem in sending email verification link."
        }
        return res.json(error);
      } else {
        const data = {
          success: true,
          message: "Account verification link has been sent. Please check your email."
        }
        return res.json(data);
      }
    });
  } else {
    const err = {
      success: false,
      message: "No registered account found with the email provided."
    }

    return res.json(err);
  }
})

router.put('/ban/:id', adminMiddleware, async (req, res) => {

  const userBan = await User.ban(con, req.params.id, req.body.ban);

  if (userBan.affectedRows > 0) {
    const userInfo = await User.getInfo(con, req.params.id);

    if (userInfo.length > 0) {
      const user = {
        success: true,
        message: "Successfully update user status.",
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
  } else {
    const err = {
      success: false,
      message: 'There\'s an error on your request.'
    }
    return res.json(err);
  }
})


/**
 *  
 *  RESET PASSWORD VIA EMAIL
 */

router.get('/reset-password-link/:email', async (req, res) => {
  const validation = resendValidation({ email: req.params.email });

  if (validation.error) {
    const validateError = {
      success: false,
      message: validation.error.details[0].message,
    }
    return res.json(validateError)
  };

  const user = await User.findEmail(con, req.params.email);

  if (user.length > 0) {
    //transporter contact
    const transporter = nodemailer.createTransport({
      host: 'us2.smtp.mailhostbox.com',
      port: process.env.EMAIL_PORT,
      secure: false,
      ignoreTLS: true,
      auth: {
        user: process.env.EMAIL_USER_CONTACT,
        pass: process.env.EMAIL_PASS_CONTACT,
      }
    })

    const userInfo = {
      id: user[0].id,
      email: user[0].email,
      expiry: moment.tz('Asia/Manila').add(30, 'm').format()
    }


    const accountToken = jwt.sign(
      userInfo,
      process.env.APP_TOKEN
    );

    const accSlashed = accountToken.replace(/\//g, "slash");

    // Construct Mail
    const mailOptions = {
      from: 'Max808 Lending Corporation <contactus@max808lending.com>',
      to: req.params.email,
      subject: 'Max808 Lending Corporation - Password Reset Link',
      html: `
        <p>Hello, <b>${user[0].username}</b>!</p>
        <h4>Password Reset Link:</h4>
        <p>Please click this <a href="${siteUrl}/reset-password/${accSlashed}">link</a>.</p>
        <p>Or go to: ${siteUrl}/reset-password/${accSlashed}</p>
      `
    };

    // Send Mail
    transporter.sendMail(mailOptions, (err, info) => {

      if (err) {
        const error = {
          success: false,
          message: "There's a problem in sending password reset link."
        }

        console.log(err);

        return res.json(error);
      } else {
        const data = {
          success: true,
          message: "Password reset link has been sent. Please check your email."
        }
        return res.json(data);
      }
    });
  } else {
    const err = {
      success: false,
      message: "No registered account found with the email provided."
    }

    return res.json(err);
  }
})

router.post('/verify-reset', async (req, res) => {
  const { resetToken } = req.body;
  const token = resetToken.replace("slash", "/");
  let tokenData;
  try {
    const verified = jwt.verify(token, process.env.APP_TOKEN);
    tokenData = verified;
  } catch (err) {
    return res.json({ success: false, caseType: "invalid", error: { message: "Invalid password reset link." } });
  }

  if (moment(tokenData.expiry).tz('Asia/Manila').isBefore(moment.tz('Asia/Manila'))) {
    return res.json({ success: false, caseType: "expired", error: { message: "Password reset link expired." } });
  } else {
    return res.json({ success: true, message: "Token is valid." });
  }
})

router.post('/reset-password', async (req, res) => {
  const validation = resetPassValidation(req.body);

  if (validation.error) {
    const validateError = {
      success: false,
      message: validation.error.details[0].message,
    }
    return res.json(validateError)
  };

  let tokenData;

  try {
    const verified = jwt.verify(req.body.token, process.env.APP_TOKEN);
    tokenData = verified;
  } catch (err) {
    return res.json({ success: false, message: "Invalid password reset link." });
  }

  if (tokenData.email === req.body.email) {
    if (req.body.password === req.body.confirmPassword) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const updateUserPass = await User.resetPassword(con, tokenData.id, hashedPassword);

      if (updateUserPass.affectedRows > 0) {
        return res.json({ success: true, message: "Successfully changed password. You may now login with your new password." });
      } else {
        return res.json({ success: false, message: "There is an error changing password. Please try again." });
      }

    } else {
      return res.json({ success: false, message: "Password doesn't match." });
    }
  } else {
    return res.json({ success: false, message: "Token data doesn't match with the inputted data." });
  }

})

module.exports = router;