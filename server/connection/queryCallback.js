const queryCallback = (err, res) => {
  if (err) {
    throw new Error(err);
  } else {
    return res;
  }
};

module.exports = queryCallback;