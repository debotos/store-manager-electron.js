export default advances => {
  return advances
    .map(advance => advance.amount)
    .reduce((sum, value) => sum + value, 0);
};
