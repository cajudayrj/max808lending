const serverUrl = process.env.REACT_APP_DEV_ENV === 'production' ? 'http://max808lending.com/api' : 'http://10.64.0.198:1227';
module.exports = serverUrl;