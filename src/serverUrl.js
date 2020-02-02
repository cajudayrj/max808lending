const serverUrl = process.env.REACT_APP_DEV_ENV === 'production' ? 'https://max808lending.com/api' : 'http://192.168.1.6.:1227';
module.exports = serverUrl;