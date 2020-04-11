const serverUrl = process.env.REACT_APP_DEV_ENV === 'production' ? 'https://max808lending.com/api' : 'http://192.168.100.15:1227';
module.exports = serverUrl;