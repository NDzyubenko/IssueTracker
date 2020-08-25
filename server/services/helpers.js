const isInTestEnv = () => {
  return process.env.NODE_ENV === 'test';
}

module.exports = {
  isInTestEnv,
};
