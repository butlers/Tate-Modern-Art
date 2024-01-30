const wrapAsyncFunction = (fn) => {
  return {
    [fn.name]: (req, res, next) =>
      Promise.resolve()
        .then(() => fn(req, res, next))
        .catch(next),
  }[fn.name];
};

module.exports = { wrapAsyncFunction };
