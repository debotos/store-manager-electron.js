export default (dues, { text } = text) => {
  return dues.filter(singleDue => {
    const textMatch = singleDue.number
      .toString()
      .toLowerCase()
      .includes(text.toLowerCase());
    return textMatch;
  });
};
