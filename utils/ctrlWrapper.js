const ctrlWrapper = (fn) => {
  const func = async (req, res, next) => {
    try {
      await fn(req, res);
    } catch (err) {
      next(err);
    }
  };

  return func;
};

module.exports = {
  ctrlWrapper,
};
