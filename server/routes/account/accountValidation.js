const Joi = require('@hapi/joi');

const stepOneValidation = data => {
  const schema = Joi.object({
    loanAmount: Joi.number().required(),
    loanTerms: Joi.number().required(),
    loanDate: Joi.date().required(),
    fname: Joi.string().required().label("First Name"),
    mname: Joi.allow(null).label("Middle Name"),
    lname: Joi.string().required().label("Last Name"),
    birthday: Joi.date().required().label("Birthday"),
    gender: Joi.string().required().label("Gender"),
    maritalStatus: Joi.string().required().label("Marital Status"),
    mobileNum: Joi.string().required().min(11).regex(/^[0-9]+$/).label("Mobile Number").messages({ "string.pattern.base": "Please input a valid mobile number." }),
    address: Joi.string().required().label("Address"),
    townMunicipality: Joi.string().required().label("Town / Municipality"),
    cityProvince: Joi.string().required().label("City / Province"),
  })
  const validate = schema.validate(data);
  return validate;
}

const stepTwoValidation = data => {
  const schema = Joi.object({
    company: Joi.string().required().label("Company Name"),
    companyAddress: Joi.string().required().label("Company Address"),
    companyTelNo: Joi.string().min(7).regex(/^\+{0,1}[0-9\-]+$/).required().label("Company Tel No.").messages({ "string.pattern.base": "Please input a valid telephone number." }),
    position: Joi.string().required().label("Position"),
    dop: Joi.number().required().label("Date of Payout"),
    dopTwo: Joi.number().required().label("Date of Payout 2"),
    payrollAcc: Joi.string().required().label("Payroll Account"),
    bankCheckAcc: Joi.string().required().label("Bank Checking Account"),
    existingLoans: Joi.allow(null).label("Existing Loans"),
    fbLink: Joi.string().regex(/^(https?:\/\/)?(((w{3}\.)|m.)?)facebook.com\/.*/).required().label("Facebook Profile Link").messages({ "string.pattern.base": "Please input a valid facebook account link." }),
  });

  const validate = schema.validate(data);
  return validate;
}

const stepFourValidation = data => {
  const schema = Joi.object({
    officemateName: Joi.string().min(6).required().label("Officemate Name"),
    officemateDepartment: Joi.string().min(6).required().label("Officemate Department"),
    officematePosition: Joi.string().required().label("Officemate Position"),
    officemateMobileNum: Joi.string().min(11).regex(/^([+]\d{2})?\d{1,11}$/).required().label("Officemate Mobile Number").messages({ "string.pattern.base": "Please input a valid mobile number." }),
    officemateEmail: Joi.string().email().required().label("Officemate Email"),
    friendName: Joi.string().min(6).required().label("Friend Name"),
    friendMobileNum: Joi.string().min(11).regex(/^([+]\d{2})?\d{1,11}$/).required().label("Friend Mobile Number").messages({ "string.pattern.base": "Please input a valid mobile number." }),
    friendEmail: Joi.string().email().required().label("Friend Email"),
    familyName: Joi.string().min(6).required().label("Family Name"),
    familyMobileNum: Joi.string().min(11).regex(/^([+]\d{2})?\d{1,11}$/).required().label("Family Mobile Number").messages({ "string.pattern.base": "Please input a valid mobile number." }),
    familyEmail: Joi.string().email().required().label("Family Email"),
  });

  const validate = schema.validate(data);
  return validate;
}


const updateInfoValidation = data => {
  const schema = Joi.object({
    maritalStatus: Joi.string().required().label("Marital Status"),
    address: Joi.string().required().label("Address"),
    mobileNum: Joi.string().required().min(11).regex(/^[0-9]+$/).label("Mobile Number").messages({ "string.pattern.base": "Please input a valid mobile number." }),
    townMunicipality: Joi.string().required().label("Town / Municipality"),
    cityProvince: Joi.string().required().label("City / Province"),
    company: Joi.string().required().label("Company Name"),
    companyAddress: Joi.string().required().label("Company Address"),
    companyTelNo: Joi.string().min(7).regex(/^\+{0,1}[0-9\-]+$/).required().label("Company Tel No.").messages({ "string.pattern.base": "Please input a valid telephone number." }),
    position: Joi.string().required().label("Position"),
    dop: Joi.number().required().label("Date of Payout"),
    dopTwo: Joi.number().required().label("Date of Payout 2"),
    payrollAcc: Joi.string().required().label("Payroll Account"),
    bankCheckAcc: Joi.string().required().label("Bank Checking Account"),
    existingLoans: Joi.allow(null).label("Existing Loans"),
    fbLink: Joi.string().regex(/^(https?:\/\/)?(((w{3}\.)|m.)?)facebook.com\/.*/).required().label("Facebook Profile Link").messages({ "string.pattern.base": "Please input a valid facebook account link." }),
  })
  const validate = schema.validate(data);
  return validate;
}

const resendValidation = data => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
  })
  const validate = schema.validate(data);
  return validate;
}

const resetPassValidation = data => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(8).regex(/^\S*$/).max(20).label("Password").messages({ "string.pattern.base": "Password must not contain any spaces." }),
    confirmPassword: Joi.string().required().min(8).regex(/^\S*$/).max(20).label("Confirm Password").messages({ "string.pattern.base": "Confirm Password must not contain any spaces." }),
    token: Joi.allow(null).label("Token"),
  })

  const validate = schema.validate(data);
  return validate;
}

module.exports = {
  stepOneValidation,
  stepTwoValidation,
  stepFourValidation,
  updateInfoValidation,
  resendValidation,
  resetPassValidation
}