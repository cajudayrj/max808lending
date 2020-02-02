const siteUrl = process.env.REACT_APP_DEV_ENV === 'production' ? 'https://max808lending.com' : 'http://192.168.1.6.:3000';
module.exports = siteUrl;